import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const athletes = [
  { full_name: 'Eren Demir', email: 'eren.demir@gmail.com', age: 20, category: 'Football', role: 'scout' },
  { full_name: 'Alper Yalcin', email: 'alper.yalcin@gmail.com', age: 20, category: 'Football', role: 'coach' },
  { full_name: 'Baris Kose', email: 'baris637@gmail.com', age: 17, category: 'Football', role: 'scout' },
  { full_name: 'Ahmet Yildiz', email: 'yildiz97@hotmail.com', age: 17, category: 'Football', role: 'coach' },
  { full_name: 'Mustafa Duman', email: 'mustafa.duman@gmail.com', age: 24, category: 'Football', role: 'athlete' },
  { full_name: 'Yasin Gokce', email: 'gokce59@hotmail.com', age: 15, category: 'Football', role: 'athlete' },
  { full_name: 'Kuzey Guler', email: 'kuzey.guler@gmail.com', age: 33, category: 'Football', role: 'athlete' },
  { full_name: 'Tolga Akar', email: 'tolga.akar@gmail.com', age: 18, category: 'Football', role: 'athlete' },
  { full_name: 'Mustafa Aktas', email: 'mustafa.aktas@gmail.com', age: 24, category: 'Football', role: 'athlete' },
  { full_name: 'Furkan Uysal', email: 'furkan.uysal@gmail.com', age: 20, category: 'Football', role: 'athlete' },
  { full_name: 'Ozan Erdogan', email: 'ozan715@gmail.com', age: 31, category: 'Football', role: 'athlete' },
  { full_name: 'Cem Kurt', email: 'kurt75@hotmail.com', age: 58, category: 'Football', role: 'athlete' },
  { full_name: 'Cem Bulut', email: 'bulut67@hotmail.com', age: 16, category: 'Football', role: 'athlete' },
  { full_name: 'Cagan Kara', email: 'cagan.kara@gmail.com', age: 18, category: 'Football', role: 'athlete' },
  { full_name: 'Gokhan Cakir', email: 'gokhan.cakir@gmail.com', age: 19, category: 'Football', role: 'scout' },
  { full_name: 'Cem Erdogan', email: 'cem44@gmail.com', age: 15, category: 'Football', role: 'athlete' },
  { full_name: 'Bora Aydin', email: 'aydin89@hotmail.com', age: 15, category: 'Football', role: 'athlete' },
  { full_name: 'Kuzey Kurt', email: 'kuzey.kurt@gmail.com', age: 24, category: 'Football', role: 'athlete' },
  { full_name: 'Kerem Ozdemir', email: 'kerem.ozdemir@gmail.com', age: 13, category: 'Football', role: 'athlete' },
  { full_name: 'Kaan Yavuz', email: 'kaan.yavuz@gmail.com', age: 23, category: 'Football', role: 'athlete' },
  { full_name: 'Mert Simsek', email: 'mert.simsek@gmail.com', age: 54, category: 'Football', role: 'athlete' },
  { full_name: 'Eren Kara', email: 'eren.kara@gmail.com', age: 21, category: 'Football', role: 'athlete' },
  { full_name: 'Can Kara', email: 'can678@gmail.com', age: 12, category: 'Football', role: 'scout' },
  { full_name: 'Onur Korkmaz', email: 'onur.korkmaz@gmail.com', age: 29, category: 'Football', role: 'athlete' },
  { full_name: 'Sarp Simsek', email: 'simsek64@hotmail.com', age: 21, category: 'Football', role: 'scout' },
  { full_name: 'Berk Bulut', email: 'berk576@gmail.com', age: 23, category: 'Football', role: 'athlete' },
  { full_name: 'Mustafa Karakaya', email: 'mustafa396@gmail.com', age: 18, category: 'Football', role: 'athlete' },
  { full_name: 'Efe Aslan', email: 'efe421@gmail.com', age: 22, category: 'Football', role: 'athlete' },
  { full_name: 'Eren Arslan', email: 'eren824@gmail.com', age: 21, category: 'Football', role: 'athlete' },
  { full_name: 'Sarp Tekin', email: 'tekin90@hotmail.com', age: 16, category: 'Football', role: 'athlete' },
  { full_name: 'Emre Aktas', email: 'emre.aktas@gmail.com', age: 20, category: 'Football', role: 'athlete' },
  { full_name: 'Ege Kara', email: 'ege.kara@gmail.com', age: 21, category: 'Football', role: 'scout' },
  { full_name: 'Cem Demir', email: 'demir67@hotmail.com', age: 29, category: 'Football', role: 'athlete' }
]

async function importData() {
  console.log('Starting data import...')
  
  for (const person of athletes) {
    const role = person.role === 'scout' ? 'scout' : 'athlete'
    const userId = crypto.randomUUID()
    
    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      role: role,
      subscription_tier: 'free',
      subscription_status: 'inactive'
    })
    
    if (profileError) {
      console.error(`Error creating profile for ${person.full_name}:`, profileError)
      continue
    }
    
    if (role === 'athlete') {
      const { error: athleteError } = await supabase.from('athlete_profiles').insert({
        user_id: userId,
        full_name: person.full_name,
        slug: person.full_name.toLowerCase().replace(/ /g, '-').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c'),
        sport: person.category.toLowerCase(),
        birth_date: new Date(new Date().getFullYear() - person.age, 0, 1).toISOString().split('T')[0],
        nationality: 'TR',
        country_code: 'TR',
        city: 'İstanbul',
        position: 'General',
        current_club: 'Free Agent',
        is_licensed: true,
        has_international_experience: false,
        is_published: true
      })
      if (athleteError) console.error(`Error creating athlete profile for ${person.full_name}:`, athleteError)
    } else {
      const { error: scoutError } = await supabase.from('scout_profiles').insert({
        user_id: userId,
        full_name: person.full_name,
        club_or_agency: 'Independent',
        country: 'TR',
        interested_sports: [person.category.toLowerCase()]
      })
      if (scoutError) console.error(`Error creating scout profile for ${person.full_name}:`, scoutError)
    }
    
    console.log(`Imported ${person.full_name} (${role})`)
  }
  
  console.log('Data import finished.')
}

importData()
