import pool from "./db/db";
import { auth } from "@clerk/nextjs/server"

export default async function userConnect() {
    const { userId } = await auth();
    console.log("CLERK USER ID:", userId);

    const userData = await pool.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);

    return userData.rows[0]; 
}