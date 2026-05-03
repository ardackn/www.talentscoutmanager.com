import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_table_info', { table_name: 'athlete_profiles' })
  if (error) {
    // If RPC doesn't exist, try a simple select
    const { data: cols } = await supabase.from('athlete_profiles').select('*').limit(1)
    console.log('Columns:', Object.keys(cols?.[0] || {}))
  } else {
    console.log('Schema:', data)
  }
}

checkSchema()
