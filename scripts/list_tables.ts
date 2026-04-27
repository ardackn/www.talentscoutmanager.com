import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function listTables() {
  const { data, error } = await supabase.rpc('get_table_names') // Trying RPC if it exists
  if (error) {
    // If RPC fails, try manual select from a known table
    console.log('RPC failed, trying manual table checks...')
    const tables = ['profiles', 'athletes', 'athlete_profiles', 'scout_profiles', 'analysis_reports']
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(0)
      if (tableError) {
        console.log(`Table ${table}: NOT FOUND or Error (${tableError.message})`)
      } else {
        console.log(`Table ${table}: EXISTS`)
        // Get columns
        const { data: cols, error: colError } = await supabase.from(table).select('*').limit(1)
        if (!colError && cols.length > 0) {
          console.log(`  Columns: ${Object.keys(cols[0]).join(', ')}`)
        }
      }
    }
  } else {
    console.log('Tables:', data)
  }
}

listTables()
