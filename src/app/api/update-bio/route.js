import db from "@/utils/db/db";

export async function POST(req) {
  const { userId, bio } = await req.json();

  try {
    await db.query("UPDATE users SET bio = $1 WHERE id = $2", [bio, userId]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to update bio" }),
      { status: 500 }
    );
  }
}