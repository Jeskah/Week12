// src/utils/queries.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// get DB user by Clerk ID
export async function getUserByClerkId(clerkId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .maybeSingle()

  if (error) console.error('Error fetching user:', error)
  return data
}

// get meals for a specific DB user
export async function getMealsForUser(dbUserId) {
  const { data: meals, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', dbUserId)

  if (error) console.error('Error fetching meals:', error)
  return meals || []
}

// optional: existing general getMeals export
export async function getMeals() {
  const { data: meals, error } = await supabase.from('meals').select('*')
  if (error) console.error(error)
  return meals || []
}