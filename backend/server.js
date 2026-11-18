import { createServer } from "node:http";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const port = Number(process.env.PORT || 3001);
const databasePath = process.env.GEMORA_DB_PATH || path.resolve("data/gemora.sqlite");
const database = new DatabaseSync(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS gems (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    origin TEXT NOT NULL,
    carat TEXT NOT NULL,
    price TEXT NOT NULL DEFAULT 'POA',
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    colour TEXT NOT NULL
  )
`);

function json(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  response.end(JSON.stringify(value));
}

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/health") {
    json(response, 200, { status: "ok" });
    return;
  }

  if (url.pathname === "/api/gems") {
    const search = url.searchParams.get("search")?.trim().toLower();
    const type = url.searchParams.get("type");
    const statement = search
      ? database.prepare(`
          SELECT * FROM gems
          WHERE lower(name || ' ' || type || ' ' || origin || ' ' || colour) LIKE ?
            AND (? = '' OR type = ?)
          ORDER BY id
        `)
      : database.prepare(`
          SELECT * FROM gems
          WHERE (? = '' OR type = ?)
          ORDER BY id
        `);
    const gems = search
      ? statement.all(`%${search}%`, type || "", type || "")
      : statement.all(type || "", type || "");
    json(response, 200, gems);
    return;
  }

  const match = url.pathname.match(/^\/api\/gems\/(\d+)$/);
  if (match) {
    const gem = database.prepare("SELECT * FROM gems WHERE id = ?").get(Number(match[1]));
    json(response, gem ? 200 : 404, gem || { error: "ไม่พบอัญมณี" });
    return;
  }

  json(response, 404, { error: "ไม่พบเส้นทาง" });
});

server.listen(port, () => {
  console.log(`Gemora API listening on http://localhost:${port}`);
});
