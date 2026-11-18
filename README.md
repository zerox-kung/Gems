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

## Development requirements

- Node.js 25+
- npm 11+
- VS Code
- Git and GitHub CLI
