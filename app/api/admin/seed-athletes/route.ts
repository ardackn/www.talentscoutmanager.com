import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-clean'
import type { AthletePublic } from '@/types/athlete'

async function createAdminClient(cookieStore: any) {
  const supabase = createServerComponentClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

const SAMPLE_ATHLETES: Omit<AthletePublic, 'id' | 'created_at'>[] = [
  {
    name: 'Carlos Silva',
    position: 'Striker',
    nationality: 'Brazil',
    current_team: 'Amateur',
    speed: 92,
    skill: 88,
    jumping: 85,
    agility: 90,
    stamina: 87,
    image: 'https://images.unsplash.com/photo-1603484793635-7f2c99e3d2ea?w=400&h=600&fit=crop&crop=face&sat=-20'
  },
  {
    name: 'Luca Ferrari',
    position: 'Defender',
    nationality: 'Italy',
    current_team: 'Amateur',
    speed: 78,
    skill: 85,
    jumping: 92,
    agility: 82,
    stamina: 89,
    image: 'https://images.unsplash.com/photo-1578662996441-0d5a6434e6d2?w=400&h=600&fit=crop&sat=-35&crop=face'
  },
  {
    name: 'Kenji Tanaka',
    position: 'Right Winger',
    nationality: 'Japan',
    current_team: 'Amateur',
    speed: 94,
    skill: 87,
    jumping: 76,
    agility: 93,
    stamina: 88,
    image: 'https://images.unsplash.com/photo-1518098742835-b14e75d91884?w=400&h=600&fit=crop&crop=face&sat=-25'
  },
  {
    name: 'Amara Diallo',
    position: 'Central Midfielder',
    nationality: 'Senegal',
    current_team: 'Amateur',
    speed: 86,
    skill: 91,
    jumping: 80,
    agility: 88,
    stamina: 95,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face&sat=-30'
  },
  {
    name: 'Omar Hassan',
    position: 'Goalkeeper',
    nationality: 'Egypt',
    current_team: 'Amateur',
    speed: 70,
    skill: 89,
    jumping: 90,
    agility: 85,
    stamina: 92,
    image: 'https://images.unsplash.com/photo-1623488067504-63d920229e47?w=400&h=600&fit=crop&sat=-30&crop=face'
  },
  {
    name: 'Efe Aslan',
    position: 'Striker',
    nationality: 'Turkey',
    current_team: 'Amateur',
    speed: 90,
    skill: 86,
    jumping: 84,
    agility: 89,
    stamina: 91,
    image: 'https://images.unsplash.com/photo-1541532714166-2ef38bd7f42f?w=400&h=600&fit=crop&crop=face&sat=-25'
  },
  {
    name: 'Yusuf Adem',
    position: 'Left Winger',
    nationality: 'Turkey',
    current_team: 'Amateur',
    speed: 88,
    skill: 84,
    jumping: 79,
    agility: 92,
    stamina: 86,
    image: 'https://images.unsplash.com/photo-1600349179583-0ff78e9bd73f?w=400&h=600&fit=crop&sat=-20'
  },
  {
    name: 'Jamal Khalil',
    position: 'Defensive Midfielder',
    nationality: 'Morocco',
    current_team: 'Amateur',
    speed: 82,
    skill: 90,
    jumping: 81,
    agility: 87,
    stamina: 96,
    image: 'https://images.unsplash.com/photo-1612872087721-f56c0e867478?w=400&h=600&fit=crop&crop=face'
  },
  {
    name: 'Diego Morales',
    position: 'Attacking Midfielder',
    nationality: 'Argentina',
    current_team: 'Amateur',
    speed: 85,
    skill: 93,
    jumping: 78,
    agility: 91,
    stamina: 88,
    image: 'https://images.unsplash.com/photo-1594066830516-440e1d867c86?w=400&h=600&fit=crop&crop=face'
  },
  {
    name: 'Lars Jensen',
    position: 'Right Back',
    nationality: 'Denmark',
    current_team: 'Amateur',
    speed: 89,
    skill: 83,
    jumping: 87,
    agility: 90,
    stamina: 92,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
  }
]

export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await createAdminClient({ cookies: () => req.cookies })
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    // Clear existing athletes
    await supabase.from('athletes').delete().neq('id', '')

    // Insert new sample data
    const { data, error } = await supabase
      .from('athletes')
      .insert(
        SAMPLE_ATHLETES.map(athlete => ({
          ...athlete,
          email: `athlete_${athlete.name.replace(/\s/g, '').toLowerCase()}@demo.talent.com`,
          phone: null
        }))
      )

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      message: `${data?.length || 0} athletes seeded!`
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed athletes' }, { status: 500 })
  }
}
