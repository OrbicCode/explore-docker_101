import pool from './db/dbConfig';
import { parse } from 'csv-parse';

const CSV_URL = 'https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6.js';
const parser = parse({
  delimiter: ',',
  columns: true,
  skip_empty_lines: true,
});

async function seedDB() {
  try {
    const response = await fetch(CSV_URL);
    const csvData = await response.text();
  } catch (error) {}
}
