import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/utils/queries'
import Image from 'next/image'
import EditBio from '@/app/components/EditBio'

export default async function ProfilePage() {
const clerkUser = await currentUser()
if (!clerkUser) return <div>Not signed in</div>

const dbUser = await getUserByClerkId(clerkUser.id)
if (!dbUser) return <div>User not set up yet</div>

return (
<div className='flex flex-col w-100 text-sm gap-2 tracking-wide relative left'>
    <Image src={clerkUser.imageUrl || 'https://static.vecteezy.com/system/resources/previews/000/364/591/non_2x/chef-vector-illustration.jpg'} width={100} height={100} alt="profile" />
    <h1 className='text-2xl p-5'>{dbUser.username}</h1>
    <div className='border-amber-400 p-5'>
    <EditBio initialBio={dbUser.bio} userId={dbUser.id} />
</div>
</div>
)
}