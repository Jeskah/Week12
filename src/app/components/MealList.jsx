import Image from 'next/image';
import Link from 'next/link';

export default function MealsList({ meals }) {
return (
    <div>
        <h1 className='pt-15 text-center'>LOOKING FOR INSPIRATION?</h1>
<div className="flex flex-wrap justify-center gap-8 p-10">
    {meals.map((meal) => (
    <Link key={meal.id} href={`/meals/${meal.id}`}>
        
        <div className="w-62.5 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">

        <div className="w-full h-45 relative">
            <Image
            src={meal.image_url}
            alt={meal.description}
            fill
            className="object-cover"
            />
        </div>

<div className="p-4 flex flex-col gap-2">

    <h2 className="font-semibold text-lg h-12 overflow-hidden">
        {meal.name}
    </h2>
    <p className="text-sm text-gray-600 h-12 overflow-hidden">
        {meal.description}
    </p>
</div>

        </div>

    </Link>
    ))}
    </div>
</div>
);
}