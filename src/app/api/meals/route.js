import pool from "@/utils/db/db";

export async function GET() {
    try {
    const result = await pool.query("SELECT * FROM meals");

    return Response.json(result.rows);
} catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch meals" }, { status: 500 });
}
}