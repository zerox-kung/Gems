const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const net = require("node:net");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const keyPath = path.join(root, "certificates", "gemora-key.pem");
const certPath = path.join(root, "certificates", "gemora.pem");

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("HTTPS certificates are missing. Run the certificate setup first.");
  process.exit(1);
}

const nextProcess = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"],
  { cwd: root, stdio: "inherit", shell: true },
);

function proxy(request, response) {
  const proxyRequest = http.request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: request.url,
      method: request.method,
      headers: request.headers,
    },
    (proxyResponse) => {
      response.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers);
      proxyResponse.pipe(response);
    },
  );

  proxyRequest.on("error", (error) => {
    response.writeHead(502, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Next.js server unavailable", detail: error.message }));
  });
  request.pipe(proxyRequest);
}

const server = https.createServer(
  {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  },
  proxy,
);

server.on("upgrade", (request, socket, head) => {
  const upstream = net.connect(3000, "127.0.0.1", () => {
    const headers = Object.entries(request.headers)
      .map(([name, value]) => `${name}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\r\n");
    upstream.write(`${request.method} ${request.url} HTTP/1.1\r\n${headers}\r\n\r\n`);
    if (head.length) upstream.write(head);
  });
  upstream.on("error", () => socket.destroy());
  upstream.pipe(socket);
  socket.pipe(upstream);
});

server.listen(443, "127.0.0.1", () => {
  console.log("Gemora HTTPS: https://gemora.local");
});

process.on("SIGINT", () => {
  nextProcess.kill();
  server.close(() => process.exit(0));
});
