import fs from "node:fs";
import path from "node:path";
import { openGemsDatabase } from "./database.js";

const databasePath = process.env.GEMORA_DB_PATH || path.resolve("data/gemora.sqlite");
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const database = openGemsDatabase(databasePath);
database.exec("DELETE FROM gems");

const dataPath = process.env.GEMORA_DATA_PATH
  || (fs.existsSync(path.resolve("data/gems.json"))
    ? path.resolve("data/gems.json")
    : path.resolve("../data/gems.json"));
const gems = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const insert = database.prepare(`
  INSERT INTO gems (
    id, name, type, origin, carat, price, image, description, colour,
    cut, clarity, dimensions, treatment, sampleId, reportNote
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const gem of gems) {
  insert.run(
    gem.id, gem.name, gem.type, gem.origin, gem.carat, gem.price, gem.image,
    gem.description, gem.colour, gem.cut, gem.clarity, gem.dimensions,
    gem.treatment, gem.sampleId, gem.reportNote,
  );
}

database.close();
console.log(`Seeded ${gems.length} gems into ${databasePath}`);
