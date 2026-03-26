import pool from "@/utils/db/db";
import Link from "next/link";
import Image from "next/image";
import SaveButton from "@/app/components/SaveButton";

export default async function MealDetail({ params }) {
    const { id } = await params;
    const mealId = parseInt(id);

    let meal = null;

    try {
    const result = await pool.query(
    `
    SELECT 
    m.id,
    m.name,
    m.description,
    m.difficulty,
    m.image_url,
    COALESCE(
    ARRAY_REMOVE(ARRAY_AGG(i.name), NULL),
    '{}'
    ) AS ingredients
    FROM meals m
    LEFT JOIN meal_ingredients mi ON m.id = mi.meal_id
    LEFT JOIN ingredients i ON i.id = mi.ingredient_id
    WHERE m.id = $1
    GROUP BY m.id, m.name, m.description, m.difficulty, m.image_url
    `,
    [mealId]
    );

    meal = result.rows[0];
    } catch (err) {
    console.error(err);
}

    if (!meal) {
    return <p style={{ color: "white", padding: "30px" }}>Meal not found</p>;
}

    return (
    <div style={{ display: "flex" }}>
    <div
    style={{
    flex: 1,
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    color: "white"
    }}
>

    <Link href="/meals">
    <p style={{ marginBottom: "20px", color: "#aaa", cursor: "pointer" }}>
    ← Back to meals
    </p>
    </Link>

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

<div
    style={{
    position: "relative",
    background: "#111",
    padding: "25px 25px 50px 25px",
    borderRadius: "16px",
    border: "1px solid #222",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
}}
>

    <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>
    {meal.name}
    </h1>

    <p style={{ color: "#aaa", marginBottom: "15px" }}>
    {meal.description}
    </p>

    <p style={{ marginBottom: "20px", color: "#888" }}>
    Difficulty: {meal.difficulty}
    </p>

    <h2 style={{ marginBottom: "10px" }}>Ingredients</h2>

    {meal.ingredients && meal.ingredients.length > 0 ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
    {meal.ingredients.map((ingredient, index) => (
    <li
    key={index}
    style={{
    padding: "10px",
    marginBottom: "8px",
    background: "#1a1a1a",
    borderRadius: "8px",
    border: "1px solid #333"
}}
>
    {ingredient}
    </li>
    ))}
    </ul>
    ) : (
    <p style={{ color: "#888" }}>No ingredients listed</p>
)}

 <div
    style={{
        position: "absolute",
        bottom: "15px",
        right: "15px",
        background: "#1a1a1a",
        padding: "8px",
        borderRadius: "50%",
        border: "1px solid #333"
    }}
>
            <SaveButton mealId={meal.id} />
          </div>

</div>
</div>
</div>
);
}