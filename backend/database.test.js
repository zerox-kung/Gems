import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";
import { openGemsDatabase } from "./database.js";

test("adds sample detail columns to an existing catalogue without losing records", (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "gemora-db-"));
  const databasePath = path.join(directory, "gems.sqlite");
  const oldDatabase = new DatabaseSync(databasePath);
  oldDatabase.exec(`
    CREATE TABLE gems (
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
    INSERT INTO gems (id, name, type, origin, carat, image, description, colour)
    VALUES (1, 'Midnight Sapphire', 'Sapphire', 'Sri Lanka', '3.42 ct', '/image.jpg', 'Sample', 'Blue');
  `);
  oldDatabase.close();

  const database = openGemsDatabase(databasePath);
  t.after(() => {
    database.close();
    fs.rmSync(directory, { recursive: true, force: true });
  });

  const columns = new Set(
    database.prepare("PRAGMA table_info(gems)").all().map(({ name }) => name),
  );
  for (const column of ["cut", "clarity", "dimensions", "treatment", "sampleId", "reportNote"]) {
    assert.ok(columns.has(column), `expected migrated column ${column}`);
  }
  assert.equal(database.prepare("SELECT name FROM gems WHERE id = 1").get().name, "Midnight Sapphire");
});
