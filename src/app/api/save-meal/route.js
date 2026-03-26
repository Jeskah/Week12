import pool from "@/utils/db/db";
import { revalidatePath } from "next/cache";

export async function POST(request) {
    try {
    const { userId, mealId } = await request.json();

     if (!userId || !mealId) {
      return Response.json();
    }
        await pool.query(`
            INSERT INTO user_saves (user_id, meal_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, meal_id) DO NOTHING
        `,
        [userId, mealId]
    );  

    revalidatePath("/saved");
       
    return Response.json({ success: true});
    }   catch (error) {

        return Response.json({ success: false});
    } 
}