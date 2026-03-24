import Image from 'next/image';
import Link from 'next/link';

export default function MealsList({ meals }) {
return (

<div className='flex flex-row flex-wrap justify-center gap-10 pt-10'>
    {meals.map((meal) => (
    <Link key={meal.id} href={`/meals/${meal.id}`}>
        <div className='flex flex-col gap-5 flex-wrap'>
        <h2>{meal.name}</h2>
        {meal.image_url ? (
            <Image
            src={meal.image_url}
            alt={meal.description}
            width={500}
            height={100}
            unoptimized
            className='object-cover w-50 h-50'
            />
            
            
        ) : (
            <div style={{ width: 200, height: 200, background: '#eee' }}>
            No image
            </div>
        )}
        <p>{meal.description}</p>
        <ul>{meal.ingredients}</ul>
        <p>{meal.prep}</p>
        </div>
    </Link>
    ))}
</div>
);
}