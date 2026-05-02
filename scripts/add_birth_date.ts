import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // need service role

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function addBirthDate() {
  // Use a hack to execute SQL via RPC if we have one, or maybe just REST API won't let us ALTER TABLE
  // Usually, we can't alter tables from JS client unless we have an RPC like 'exec_sql'.
  // Does the project have it?
  console.log("We need to add birth_date column to athlete_profiles");
}

addBirthDate()
