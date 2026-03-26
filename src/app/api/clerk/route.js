import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  console.log('Webhook hit!', new Date().toISOString())

  const payload = await req.text()


const svix_id = req.headers.get('svix-id')
const svix_timestamp = req.headers.get('svix-timestamp')
const svix_signature = req.headers.get('svix-signature')

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

  let evt
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  const { type, data } = evt
  console.log('Webhook received:', type, data.id)

  if (type === 'user.created' || type === 'user.updated') {
    const { error } = await supabase
      .from('users')
      .upsert({
        clerk_id: data.id,
        username: data.username || data.first_name || 'user_' + data.id.slice(-4)
      }, { onConflict: 'clerk_id' })

    if (error) console.error('Supabase upsert failed:', error)
    else console.log('Supabase upsert success')
  }

  return new Response('OK', { status: 200 })
}