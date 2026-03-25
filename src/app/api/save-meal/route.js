import pool from "@/utils/db/db";

export async function POST(request) {
    const { userId, mealId } = await request.json();

    try {
        await pool.query(`
            INSERT INTO user_saves (user_id, meal_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, meal_id) DO NOTHING
        `,
        [userId, mealId]
    );  
       
    return Response.json({ success: true});
    }   catch (error) {

        return Response.json({ success: false});
    } 
}