import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function syncUser() {
const user = await currentUser()
if (!user) return

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const clerkId = user.id

const username =
    user.username ||
    user.firstName ||
    'user_' + clerkId.slice(-4)

const { data } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', clerkId)
    .maybeSingle()

        console.log(process.env.SUPABASE_URL)
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)

if (!data) {
    await supabase.from('users').insert({
    clerk_id: clerkId,
    username
    })
}
}