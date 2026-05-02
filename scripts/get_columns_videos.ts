import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 

async function getColumns() {
  const response = await fetch(`${supabaseUrl}/rest/v1/?apikey=${serviceRoleKey}`)
  const spec = await response.json()
  
  if (spec.definitions && spec.definitions.athlete_videos) {
    console.log("Columns of athlete_videos:", Object.keys(spec.definitions.athlete_videos.properties))
  } else {
    console.log("Could not find athlete_videos in schema")
  }
}

getColumns()
