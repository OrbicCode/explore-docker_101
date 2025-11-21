import pool from './db/dbConfig.js';
import { parse } from 'csv-parse';

async function seedDB() {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS pokemon_data (
  id SERIAL PRIMARY KEY,
  pokemon_id INTEGER,
  name VARCHAR(255) NOT NULL,
  type_1 VARCHAR(50) NOT NULL,
  type_2 VARCHAR(50),
  total INTEGER NOT NULL,
  hp INTEGER NOT NULL,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL,
  sp_atk INTEGER NOT NULL,
  sp_def INTEGER NOT NULL,
  speed INTEGER NOT NULL,
  generation INTEGER NOT NULL,
  legendary BOOLEAN NOT NULL
  );
`);

    const count = await pool.query(`
  SELECT COUNT(*) FROM pokemon_data
  `);
    if (parseInt(count.rows[0].count) > 0) {
      console.log('Database is alreadry seeded.');
      return;
    }

    console.log('fetching CSV and seeding db.');
    const CSV_URL =
      'https://gist.githubusercontent.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/raw/92200bc0a673d5ce2110aaad4544ed6c4010f687/pokemon.csv';
    const response = await fetch(CSV_URL);

    if (!response.ok) {
      throw new Error('Error fetching CSV');
    }

    const csvText = await response.text();
    let records = [];
    const parser = parse(csvText, {
      delimiter: ',',
      columns: true,
      skip_empty_lines: true,
    });

    for await (const record of parser) {
      await pool.query(
        `
        INSERT INTO pokemon_data (pokemon_id, name, type_1, type_2, total, hp, attack, defense, sp_atk, sp_def, speed, generation, legendary)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `,
        [
          parseInt(record['#']),
          record.Name,
          record['Type 1'],
          record['Type 2'],
          parseInt(record.Total),
          parseInt(record.HP),
          parseInt(record.Attack),
          parseInt(record.Defense),
          parseInt(record['Sp. Atk']),
          parseInt(record['Sp. Def']),
          parseInt(record.Speed),
          parseInt(record.Generation),
          record.Legendary === 'True',
        ]
      );
    }
    console.log("Seeded pokemon successfully. Go Catch 'em all");
  } catch (error) {
    console.error(error);
  }
}

seedDB();
