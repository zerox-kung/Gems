import { DatabaseSync } from "node:sqlite";

const gemColumns = [
  ["cut", "TEXT NOT NULL DEFAULT ''"],
  ["clarity", "TEXT NOT NULL DEFAULT ''"],
  ["dimensions", "TEXT NOT NULL DEFAULT ''"],
  ["treatment", "TEXT NOT NULL DEFAULT ''"],
  ["sampleId", "TEXT NOT NULL DEFAULT ''"],
  ["reportNote", "TEXT NOT NULL DEFAULT ''"],
];

export function openGemsDatabase(databasePath) {
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
      colour TEXT NOT NULL,
      cut TEXT NOT NULL DEFAULT '',
      clarity TEXT NOT NULL DEFAULT '',
      dimensions TEXT NOT NULL DEFAULT '',
      treatment TEXT NOT NULL DEFAULT '',
      sampleId TEXT NOT NULL DEFAULT '',
      reportNote TEXT NOT NULL DEFAULT ''
    )
  `);

  const existingColumns = new Set(
    database.prepare("PRAGMA table_info(gems)").all().map(({ name }) => name),
  );
  for (const [name, definition] of gemColumns) {
    if (!existingColumns.has(name)) {
      database.exec(`ALTER TABLE gems ADD COLUMN ${name} ${definition}`);
    }
  }

  return database;
}
