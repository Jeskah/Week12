import pool from "@/utils/db/db";

export async function getMeals() {
  const result = await pool.query(`
    SELECT * FROM meals
    `);
  return result.rows;
}

export async function getIngredients() {
  const result = await pool.query(
    "SELECT * FROM ingredients ORDER BY type, name",
  );
  return result.rows;
}

export async function getMatchingMeals(ingredientIds) {
  const result = await pool.query(
    `SELECT 
      m.id,
      m.name,
      m.description,
      m.difficulty,
      COUNT(mi.ingredient_id) AS total_ingredients,
      COUNT(mi.ingredient_id) FILTER (
        WHERE mi.ingredient_id = ANY($1::int[])
      ) AS matched_ingredients
    FROM meals m
    JOIN meal_ingredients mi ON m.id = mi.meal_id
    WHERE m.is_public = true
    GROUP BY m.id
    HAVING COUNT(mi.ingredient_id) FILTER (
      WHERE mi.ingredient_id = ANY($1::int[])
    ) > 0
    ORDER BY matched_ingredients DESC`,
    [ingredientIds],
  );
  return result.rows;
}

export async function search(query) {
  const result = await pool.query(
    `SELECT id, name, 'meal' AS type FROM meals WHERE name ILIKE $1
     UNION ALL
     SELECT id, name, 'ingredient' AS type FROM ingredients WHERE name ILIKE $1
     ORDER BY name
     LIMIT 10`,
    [`%${query}%`],
  );
  return result.rows;
}
