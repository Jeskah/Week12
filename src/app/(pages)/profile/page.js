import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/utils/queries'
import Image from 'next/image'
import EditBio from '@/app/components/EditBio'

export default async function ProfilePage() {
const user = await currentUser()

if (!user) return <div>Not signed in</div>

const dbUser = await getUserByClerkId(user.id)

if (!dbUser) return <div>No DB user found</div>

return (
<div className='flex flex-col w-100 text-sm gap-2 tracking-wide relative left pb-70'>
    
    <Image src={user.imageUrl} width={100} height={100} alt="profile" />
    <h1 className='text-2xl p-5'>{dbUser.username}</h1>
    <div className=' border-amber-400 p-5'>
    <EditBio initialBio={dbUser.bio} userId={dbUser.id} />
    </div>
</div>
)
}

