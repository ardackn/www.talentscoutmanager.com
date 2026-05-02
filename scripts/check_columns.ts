import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Or just use postgres

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkColumns() {
  const { data, error } = await supabase.rpc('query_sql', { query: "SELECT column_name FROM information_schema.columns WHERE table_name = 'athlete_profiles'" })
  console.log('Columns:', data, error)
}

checkColumns()
