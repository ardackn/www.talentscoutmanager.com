import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function listTables() {
  const { data, error } = await supabase
    .from('pg_tables' as any)
    .select('tablename')
    .eq('schemaname', 'public')

  if (error) {
    // If pg_tables isn't accessible via PostgREST (usually it's not), try a RPC or just guess
    console.log("Could not access pg_tables directly. Trying common names...")
    const tables = ['profiles', 'profiller', 'athlete_profiles', 'oyuncu_profilleri', 'scout_profiles', 'scout_profilleri', 'athlete_videos', 'oyuncu_videolari', 'transfer_listings']
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(1)
      if (!tableError || (tableError.code !== '42P01')) {
         console.log(`Table found: ${table}`)
      }
    }
  } else {
    console.log("Tables in public schema:", data)
  }
}

listTables()
