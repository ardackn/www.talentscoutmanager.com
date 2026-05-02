import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testInsert() {
  const { data, error } = await supabase.from('profiles').insert({
    id: '00000000-0000-0000-0000-000000000000',
    role: 'admin',
    full_name: 'Test Admin',
    email: 'test@example.com'
  }).select()

  if (error) {
    console.error("Insert failed:", error.message)
  } else {
    console.log("Insert success! Table 'profiles' is ready with correct columns.")
    // Cleanup
    await supabase.from('profiles').delete().eq('id', '00000000-0000-0000-0000-000000000000')
  }
}

testInsert()
