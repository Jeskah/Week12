// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(
// process.env.NEXT_PUBLIC_SUPABASE_URL,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

// export async function GET() {
// const { data, error } = await supabase.from('users').select('*')
// console.log('Supabase fetch result:', data, error)

// return new Response(JSON.stringify({ data, error }), {
//     headers: { 'Content-Type': 'application/json' },
// })
// }