import pool from "@/utils/db/db"
import userConnect from "@/utils/userConnect"

export default async function SavedPage () {
    // const user = await userConnect()
    //re-add img_url 

    const saves = (await pool.query(`
        SELECT meals.id, meals.name, meals.description, meals.difficulty
        -- meals.img_url
        FROM user_saves
        JOIN meals 
        ON user_saves.meal_id = meals.id
        WHERE user_saves.user_id = $1`, [1])).rows
        
    return (
        <div className="bg-black text-white px-10 pt-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Saved</h2>
        
            {saves.length === 0 ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950">
        <p className="text-zinc-300">No saved recipes. Add your ingredients to browse the recipes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {saves.map((meal) => (
          <div key={meal.id}
          className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:border-zinc-700 transition">

            <div className="p-4">
            <h2 className="text-base font-medium mb-2">{meal.name}</h2>
            <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{meal.description}</p>
            <p className="text-xs text-zinc-500">{meal.difficulty}</p>
            {meal.img_url && (
              <img src={meal.image_url} alt={meal.name} width="200" />
            )}
            </div>
        </div>
        ))}
      </div>
      )}
          </div>
        </div>
    );
}