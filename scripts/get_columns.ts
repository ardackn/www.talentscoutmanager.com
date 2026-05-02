import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function getColumns() {
  const { data, error } = await supabase.from('athlete_profiles').select('*').limit(1)
  
  if (error) {
    console.error('Error:', error)
  }
  
  // Actually, to get columns without data, we can use the postgrest 'head' or just fetch data
  // But wait, if table is empty, data[0] is undefined
  
  // Supabase Rest API doesn't easily expose schema without an empty row unless we use OpenAPI
  // Let's fetch openapi spec!
  
  const response = await fetch(`${supabaseUrl}/rest/v1/?apikey=${serviceRoleKey}`)
  const spec = await response.json()
  
  if (spec.definitions && spec.definitions.athlete_profiles) {
    console.log("Columns of athlete_profiles:", Object.keys(spec.definitions.athlete_profiles.properties))
  } else {
    console.log("Could not fetch schema", spec)
  }
}

getColumns()
