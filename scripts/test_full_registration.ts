import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Use anon key to simulate client behavior
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFullRegistration() {
  const email = `test_${Date.now()}@gmail.com`
  const password = 'Password123!'
  
  console.log('1. Signing up...')
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'athlete',
        full_name: 'Test Athlete'
      }
    }
  })

  if (authError) {
    console.error('Auth error:', authError)
    return
  }

  const userId = authData.user!.id
  const slug = 'test-athlete-' + Date.now()

  console.log('2. Inserting athlete profile for user:', userId)
  const { data: athleteData, error: athleteError } = await supabase
    .from('athlete_profiles')
    .insert({
      user_id: userId,
      full_name: 'Test Athlete',
      birth_date: '2000-01-01',
      nationality: 'Türkiye',
      position: 'Forvet',
      dominant_foot: 'Sağ',
      sport: 'Football',
      is_published: true,
      slug,
    })
    .select('id')
    .single()

  if (athleteError) {
    console.error('Athlete profile error:', athleteError)
  } else {
    console.log('Athlete profile created:', athleteData)
  }
}

testFullRegistration()
