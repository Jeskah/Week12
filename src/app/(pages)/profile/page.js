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
    <div className='flex flex-col w-100 text-sm gap-2 tracking-wide relative left'>
    <Image 
        src={clerkUser.imageUrl || 'https://static.vecteezy.com/system/resources/previews/000/364/591/non_2x/chef-vector-illustration.jpg'} 
        width={100} 
        height={100} 
        alt="profile" 
    />
    <h1 className='text-2xl p-5'>{dbUser.username}</h1>
    <div className='border-amber-400 p-5'>
        <EditBio initialBio={dbUser.bio} userId={dbUser.id} />

        <h2 className='text-lg mt-4'>My Meals</h2>
        <ul className='flex flex-wrap gap-4'>
        {meals && meals.length > 0 ? (
            meals.map(meal => (
            <li key={meal.id} className='border p-2 w-40'>
                <p className='font-bold'>{meal.name}</p>
                <p className='text-sm'>{meal.description}</p>
                {meal.image_url && (
                <Image 
                    src={meal.image_url} 
                    alt={meal.name} 
                    width={150} 
                    height={150} 
                    className='mt-2 object-cover' 
                />
                )}
            </li>
            ))
        ) : (
            <p>No meals yet.</p>
        )}
        </ul>
    </div>
    </div>
)
}