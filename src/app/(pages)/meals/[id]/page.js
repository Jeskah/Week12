import db from '@/utils/db/db';
import Image from 'next/image';

export async function getMealById(id) {
    const result = await db.query(
        `SELECT 
        meals.*,
        ARRAY_AGG(tags.tag_name) AS tags
        FROM meals
        LEFT JOIN meal_tags ON meals.id = meal_tags.meal_id
        LEFT JOIN tags ON meal_tags.tag_id = tags.id
        WHERE meals.id = $1
        GROUP BY meals.id`,
        [id]);

    return result.rows[0];
    }

export default async function MealPage({ params }) {
const { id } = await params;

const meal = await getMealById(id);

if (!meal) {
return <div>Meal not found</div>;
}

//at this part we can limit user access

return (
<div>
    <h1>{meal.name}</h1>
    <p>{meal.description}</p>
<ul>
  {meal.tags?.map((tag, i) => (
    <li key={i}>{tag}</li>
  ))}
</ul>

    {meal.img_url && (
    <Image
        src={meal.img_url}
        alt={meal.description}
        width={300}
        height={300}
        unoptimized
    />
    )}
</div>
);
}