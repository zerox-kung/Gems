import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = process.env.GEMORA_DB_PATH || path.resolve("data/gemora.sqlite");
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

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
  );
  DELETE FROM gems;
`);

const dataPath = process.env.GEMORA_DATA_PATH
  || (fs.existsSync(path.resolve("data/gems.json"))
    ? path.resolve("data/gems.json")
    : path.resolve("../data/gems.json"));
const gems = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const insert = database.prepare(`
  INSERT INTO gems (id, name, type, origin, carat, price, image, description, colour)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const gem of gems) {
  insert.run(gem.id, gem.name, gem.type, gem.origin, gem.carat, gem.price, gem.image, gem.description, gem.colour);
}

database.close();
console.log(`Seeded ${gems.length} gems into ${databasePath}`);
