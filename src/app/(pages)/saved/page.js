import pool from "@/utils/db/db"
import userConnect from "@/utils/userConnect"

export default async function SavedPage () {
    // const user = await userConnect()

    const saves = (await pool.query(`
        SELECT meals.id, meals.name, meals.description, meals.difficulty
        -- meals.img_url
        FROM user_saves
        JOIN meals 
        ON user_saves.meal_id = meals.id
        WHERE user_saves.user_id = $1`, [1])).rows
        
    return (
        <div>
            <h2>Saved</h2>
        
            {saves.length === 0 ? (
        <p>No saved recipes. Add your ingredients to browse the recipes</p>
      ) : (
        saves.map((meal) => (
          <div key={meal.id}>
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
            <p>{meal.difficulty}</p>
            {meal.img_url && (
              <img src={meal.image_url} alt={meal.name} width="200" />
            )}
          </div>
        ))
      )}
        </div>
    );
}