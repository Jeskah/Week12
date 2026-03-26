import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import EditBio from '@/app/components/EditBio'
// fetch meals for this DB user
import { getUserByClerkId, getMealsForUser } from '@/utils/queries.js'

export default async function ProfilePage() {
const clerkUser = await currentUser()
if (!clerkUser) return <div>Not signed in</div>

const dbUser = await getUserByClerkId(clerkUser.id)
if (!dbUser) return <div>User not set up yet</div>

const meals = await getMealsForUser(dbUser.id)


return (
    <div className='flex flex-col'>
        <div className='flex flex-row w-100 text-sm tracking-wide relative left'>
        <Image 
            src={clerkUser.imageUrl || 'https://static.vecteezy.com/system/resources/previews/000/364/591/non_2x/chef-vector-illustration.jpg'} 
            width={100} 
            height={100} 
            alt="profile" 
            className='p-5'
        />
        </div>
    <h1 className='text-2xl pl-5'>{dbUser.username}</h1>

    <div className='border-amber-400 p-5'>
        <EditBio initialBio={dbUser.bio} userId={dbUser.id} />
<div className='flex flex-col flex-wrap justify-around min-screen pb-30'>
        <h1 className='uppercase text-3xl mt-4 text-center pt-12 pb-12'>My Meals</h1>


<ul className="flex flex-wrap gap-6 justify-center">
    {meals.length > 0 ? meals.map(meal => (
        <li key={meal.id} className="w-48 h-64 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden relative">
        <div className="flex-1 flex justify-center items-center bg-gray-100 bottom-20 absolute">
            {meal.image_url ? (
            <Image
                src={meal.image_url}
                alt={meal.name}
                width={150}
                height={150}
                className="object-cover w-full h-full"
            />
            ) : (
            <div className="text-gray-400">No image</div>
            )}
        </div>
        <div className="p-2 flex flex-col gap-1 text-center">
            <h2 className="text-sm font-bold truncate">{meal.name}</h2>
            <p className="text-xs line-clamp-2">{meal.description}</p>
        </div>
        </li>
    )) : (
        <p>No meals yet.</p>
    )}
    </ul>
    </div>
    </div>
    </div>
)
}