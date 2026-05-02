import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function testInsertFields() {
  const email = `test_${Date.now()}@gmail.com`
  const password = 'Password123!'
  
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    console.error('Auth error:', authError)
    return
  }

  const userId = authData.user!.id
  const slug = 'test-athlete-' + Date.now()

  // Try insert with only valid columns
  const { data: athleteData, error: athleteError } = await supabase
    .from('athlete_profiles')
    .insert({
      user_id: userId,
      full_name: 'Test Athlete',
      sport: 'Football',
      is_published: true,
      slug,
    })
    .select('id')
    .single()

  if (athleteError) {
    console.error('Athlete profile error:', athleteError)
  } else {
    console.log('Athlete profile created with only valid columns:', athleteData)
  }
}

testInsertFields()
