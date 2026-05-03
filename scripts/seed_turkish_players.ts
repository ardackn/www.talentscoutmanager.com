import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const artifactDir = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\b25abbfd-c5aa-465f-9d6b-c50dfc32045d'

const players = [
  {
    name: "Emirhan Yılmaz",
    age: 14,
    birthDate: "2012-05-14",
    position: "Forvet / Santrafor",
    city: "İstanbul",
    height_cm: 168,
    weight_kg: 58,
    dominant_foot: "Sağ",
    club: "Fenerbahçe U14",
    bio: "Hızlı, çevik ve bitiriciliği yüksek santrafor. Ceza sahası içindeki soğukkanlılığı ile öne çıkıyor.",
    image: "turkish_youth_player_1_1777765149347.png"
  },
  {
    name: "Arda Kaan Öztürk",
    age: 16,
    birthDate: "2008-08-21",
    position: "Merkez Orta Saha",
    city: "İzmir",
    height_cm: 176,
    weight_kg: 66,
    dominant_foot: "Sol",
    club: "Altınordu U16",
    bio: "Oyun zekası ve pas yeteneği üst düzeyde. Takımın oyun kurucusu ve duran top ustası.",
    image: "turkish_youth_player_2_1777765167206.png"
  },
  {
    name: "Kerem Aktürkoğlu", // We use fake but realistic names
    age: 17,
    birthDate: "2007-03-10",
    position: "Sol Kanat",
    city: "Ankara",
    height_cm: 178,
    weight_kg: 68,
    dominant_foot: "Sağ",
    club: "Gençlerbirliği U17",
    bio: "Süratli ve adam eksiltebilen kanat oyuncusu. İçe kat ederek attığı şutlarla tanınır.",
    image: "turkish_youth_player_3_1777765423855.png"
  },
  {
    name: "Mert Demir",
    age: 13,
    birthDate: "2011-11-05",
    position: "Sağ Bek",
    city: "Bursa",
    height_cm: 155,
    weight_kg: 48,
    dominant_foot: "Sağ",
    club: "Bursaspor U13",
    bio: "Bitmek bilmeyen enerjisi ile kanadı tek başına kullanabilen ofansif bek oyuncusu.",
    image: "turkish_youth_player_4_1777765493907.png"
  },
  {
    name: "Efe Can Aydın",
    age: 18,
    birthDate: "2006-01-25",
    position: "Stoper",
    city: "Trabzon",
    height_cm: 188,
    weight_kg: 82,
    dominant_foot: "Her İkisi",
    club: "Trabzonspor U19",
    bio: "Hava toplarında geçit vermeyen, topu oyuna iyi sokabilen modern stoper.",
    image: "turkish_youth_player_5_1777765980187.png"
  },
  {
    name: "Cemil Arslan",
    age: 15,
    birthDate: "2009-07-12",
    position: "Kaleci",
    city: "Antalya",
    height_cm: 184,
    weight_kg: 74,
    dominant_foot: "Sağ",
    club: "Antalyaspor U15",
    bio: "Refleksleri çok güçlü ve birebirlerde başarılı yetenekli kaleci.",
    image: "turkish_youth_player_6_1777766027398.png"
  }
]

async function seed() {
  console.log("Starting seed process for 6 Turkish youth players...")

  for (const player of players) {
    const email = `player_${Math.random().toString(36).substring(7)}@test.com`
    const password = "Password123!"

    console.log(`Creating user ${player.name}...`)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'athlete',
        full_name: player.name
      }
    })

    if (authError) {
      console.error("Auth error:", authError)
      continue
    }

    const userId = authData.user.id
    console.log(`Created auth user ${userId}`)

    // Upload avatar
    let avatarUrl = ''
    try {
      const imgPath = path.join(artifactDir, player.image)
      if (fs.existsSync(imgPath)) {
        const fileData = fs.readFileSync(imgPath)
        const storagePath = `${userId}/avatar.png`
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(storagePath, fileData, { contentType: 'image/png', upsert: true })
          
        if (uploadError) {
          console.error("Avatar upload error:", uploadError)
        } else {
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(storagePath)
          avatarUrl = publicUrl
          console.log(`Avatar uploaded: ${avatarUrl}`)
        }
      } else {
        console.warn(`Image not found at ${imgPath}`)
      }
    } catch (e) {
      console.error("File error:", e)
    }

    // Generate slug
    const slug = player.name.toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        + '-' + Math.random().toString(36).substring(2, 6)

    console.log(`Inserting athlete profile for ${player.name}...`)
    const { error: profileError } = await supabase.from('athlete_profiles').insert({
      user_id: userId,
      full_name: player.name,
      slug: slug,
      birth_date: player.birthDate,
      nationality: "Türkiye",
      city: player.city,
      height_cm: player.height_cm,
      weight_kg: player.weight_kg,
      dominant_foot: player.dominant_foot,
      sport: "Football",
      position: player.position,
      current_club: player.club,
      bio: player.bio,
      avatar_url: avatarUrl || null,
      is_published: true
    })

    if (profileError) {
      console.error("Profile insert error:", profileError)
    } else {
      console.log(`Successfully seeded ${player.name}!\n`)
    }
  }

  console.log("Seed process completed.")
}

seed()
