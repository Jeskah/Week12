import pool from "@/utils/db/db";
import Link from "next/link";
import Image from "next/image";

export default async function MealsPage() {
    let meals = [];

    try {
    const result = await pool.query("SELECT * FROM meals");
    meals = result.rows;
    } catch (err) {
    console.error(err);
}

    return (
    <div style={{ display: "flex" }}>
    <div
    style={{
    flex: 1,
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "white"
}}
>
    <h1 style={{ marginBottom: "30px", fontSize: "28px" }}>
    What can you make?
    </h1>

<div
    style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
}}
>
    {meals.map((meal) => (
    <Link key={meal.id} href={`/meals/${meal.id}`}>
    <div
    style={{
    borderRadius: "16px",
    overflow: "hidden",
    background: "#111",
    border: "1px solid #222",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
}}
>
<Image
    src={meal.image_url}
    alt={meal.name}
    width={300}
    height={150}
    style={{
    width: "100%",
    height: "150px",
    objectFit: "cover",
}}
/>
    <div style={{ padding: "15px" }}>
    <h2 style={{ marginBottom: "6px" }}>{meal.name}</h2>

    <p style={{ fontSize: "13px", color: "#aaa" }}>
    {meal.description}
    </p>

    <p style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
    Difficulty: {meal.difficulty}
</p>
</div>
</div>
</Link>
))}   
</div>
</div>
</div>
);
}