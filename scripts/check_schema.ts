import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkSchema() {
  const tables = ['profiles', 'athlete_profiles', 'scout_profiles']
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)
    
    console.log(`Table: ${table}`)
    if (error) {
      console.error(`Error fetching ${table}:`, error.message)
    } else {
      console.log(`Columns:`, data.length > 0 ? Object.keys(data[0]) : 'No rows found')
    }
    console.log('---')
  }
}

checkSchema()
