import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 

async function checkRPCs() {
  const response = await fetch(`${supabaseUrl}/rest/v1/?apikey=${serviceRoleKey}`)
  const spec = await response.json()
  
  if (spec.paths) {
    const rpcs = Object.keys(spec.paths).filter(p => p.startsWith('/rpc/'))
    console.log("Available RPCs:", rpcs)
  }
}

checkRPCs()
