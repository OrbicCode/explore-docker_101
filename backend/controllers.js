import pool from './db/dbConfig.js';

export async function getTenPokemon(req, res) {
  try {
    const tenPokemon = await pool.query(`
      SELECT * FROM pokemon_data
      LIMIT 10;
      `);
    res.json(tenPokemon.rows);
  } catch (error) {
    console.error(error);
  }
}
