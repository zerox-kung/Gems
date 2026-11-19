# Gemora

A learning project for a jewelry catalog built with Next.js and SQLite.

## Structure

- `src/app/` - Next.js pages and API routes
- `data/gems.json` - Primary mock gemstone data
- `data/gems.sql` - SQL seed script
- `backend/` - Standalone Node.js API prototype
- `scripts/dev-https.js` - Local HTTPS reverse proxy
- `certificates/` - Local development certificates
- `docker-compose.yml` - Container setup

## Start the website

```powershell
npm run dev:secure
```

- Website: https://gemora.local
- Gem API: https://gemora.local/api/gems
- Gem detail: https://gemora.local/api/gems/1

## Run the project with Docker

1. Start Docker Desktop and wait until the engine is running.
2. From the repository root, build and start the services:

   ```powershell
   docker compose up --build
   ```

3. Open the Next.js website at https://gemora.local.
4. Open the standalone Node.js API at http://localhost:3001/api/gems.
5. Press `Ctrl+C` to stop the services. Run `docker compose down` to remove the containers.

The SQLite database is stored in the `gemora-db` Docker volume. The API seeds the mock gemstone records when it starts.
The HTTPS certificate in `certificates/` is for local development only and is mounted into the web container. Make sure `gemora.local` resolves to `127.0.0.1` in the Windows hosts file and the certificate is trusted by the browser.

## Development requirements

- Node.js 25+
- npm 11+
- VS Code
- Git and GitHub CLI
