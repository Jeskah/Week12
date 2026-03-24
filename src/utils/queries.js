import pool from "./db/db";

export async function getMeals() {
  const result = await pool.query("SELECT * FROM meals");
  return result.rows;
}