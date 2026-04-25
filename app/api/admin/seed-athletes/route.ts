export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-clean'
import type { AthletePublic } from '@/types/athlete'

async function createAdminClient(cookieStore: any) {
  const supabase = createServerComponentClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

const SAMPLE_ATHLETES: Omit<AthletePublic, 'id' | 'created_at'>[] = [
  { name: 'Eren Demir', age: 20, position: 'Striker', nationality: 'Turkey', current_team: 'Amateur', speed: 86, skill: 85, jumping: 84, agility: 86, stamina: 85, image: '/data/avatars/turkish_player_1_1777145034014.png' },
  { name: 'Alper Yalçın', age: 20, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 84, skill: 86, jumping: 82, agility: 83, stamina: 85, image: '/data/avatars/turkish_player_2_1777145141550.png' },
  { name: 'Barış Köse', age: 17, position: 'Right Winger', nationality: 'Turkey', current_team: 'Amateur', speed: 88, skill: 83, jumping: 80, agility: 87, stamina: 81, image: '/data/avatars/turkish_player_3_1777145211171.png' },
  { name: 'Ahmet Yıldız', age: 17, position: 'Defender', nationality: 'Turkey', current_team: 'Amateur', speed: 78, skill: 79, jumping: 85, agility: 77, stamina: 83, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop&crop=face' },
  { name: 'Mustafa Duman', age: 24, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 80, skill: 82, jumping: 79, agility: 81, stamina: 84, image: 'https://images.unsplash.com/photo-1541532714166-2ef38bd7f42f?w=400&h=600&fit=crop&crop=face' },
  { name: 'Serkan Arslan', age: 22, position: 'Goalkeeper', nationality: 'Turkey', current_team: 'Amateur', speed: 65, skill: 70, jumping: 86, agility: 82, stamina: 75, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face' },
  { name: 'Emre Çelik', age: 19, position: 'Left Back', nationality: 'Turkey', current_team: 'Amateur', speed: 82, skill: 77, jumping: 78, agility: 80, stamina: 83, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face' },
  { name: 'Burak Şahin', age: 23, position: 'Striker', nationality: 'Turkey', current_team: 'Amateur', speed: 81, skill: 80, jumping: 79, agility: 82, stamina: 78, image: 'https://images.unsplash.com/photo-1600349179583-0ff78e9bd73f?w=400&h=600&fit=crop&crop=face' },
  { name: 'Oğuzhan Karataş', age: 21, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 77, skill: 81, jumping: 76, agility: 78, stamina: 80, image: 'https://images.unsplash.com/photo-1594066830516-440e1d867c86?w=400&h=600&fit=crop&crop=face' },
  { name: 'Hakan Doğan', age: 18, position: 'Right Back', nationality: 'Turkey', current_team: 'Amateur', speed: 80, skill: 75, jumping: 77, agility: 79, stamina: 82, image: 'https://images.unsplash.com/photo-1623488067504-63d920229e47?w=400&h=600&fit=crop&crop=face' },
  { name: 'Mert Aydın', age: 25, position: 'Defender', nationality: 'Turkey', current_team: 'Amateur', speed: 68, skill: 65, jumping: 72, agility: 66, stamina: 70, image: 'https://images.unsplash.com/photo-1518098742835-b14e75d91884?w=400&h=600&fit=crop&crop=face' },
  { name: 'Cem Kaya', age: 16, position: 'Left Winger', nationality: 'Turkey', current_team: 'Amateur', speed: 72, skill: 68, jumping: 65, agility: 70, stamina: 64, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face' },
  { name: 'Tolga Yılmaz', age: 28, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 65, skill: 70, jumping: 68, agility: 67, stamina: 72, image: 'https://images.unsplash.com/photo-1612872087721-f56c0e867478?w=400&h=600&fit=crop&crop=face' },
  { name: 'İbrahim Kılıç', age: 19, position: 'Striker', nationality: 'Turkey', current_team: 'Amateur', speed: 70, skill: 66, jumping: 69, agility: 68, stamina: 65, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=600&fit=crop&crop=face' },
  { name: 'Kadir Öztürk', age: 22, position: 'Goalkeeper', nationality: 'Turkey', current_team: 'Amateur', speed: 55, skill: 58, jumping: 70, agility: 68, stamina: 60, image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop&crop=face' },
  { name: 'Fatih Güneş', age: 30, position: 'Defender', nationality: 'Turkey', current_team: 'Amateur', speed: 60, skill: 64, jumping: 71, agility: 62, stamina: 68, image: 'https://images.unsplash.com/photo-1603484793635-7f2c99e3d2ea?w=400&h=600&fit=crop&crop=face' },
  { name: 'Ozan Akın', age: 17, position: 'Right Winger', nationality: 'Turkey', current_team: 'Amateur', speed: 73, skill: 69, jumping: 66, agility: 72, stamina: 67, image: 'https://images.unsplash.com/photo-1578662996441-0d5a6434e6d2?w=400&h=600&fit=crop&crop=face' },
  { name: 'Yasin Polat', age: 21, position: 'Left Back', nationality: 'Turkey', current_team: 'Amateur', speed: 69, skill: 65, jumping: 68, agility: 70, stamina: 71, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face' },
  { name: 'Uğur Çetin', age: 24, position: 'Defensive Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 66, skill: 68, jumping: 67, agility: 65, stamina: 70, image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=600&fit=crop&crop=face' },
  { name: 'Selçuk Demirci', age: 26, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 64, skill: 69, jumping: 65, agility: 66, stamina: 68, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face' },
  { name: 'Onur Baş', age: 20, position: 'Striker', nationality: 'Turkey', current_team: 'Amateur', speed: 71, skill: 67, jumping: 68, agility: 69, stamina: 66, image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=600&fit=crop&crop=face' },
  { name: 'Kaan Taşkın', age: 18, position: 'Left Winger', nationality: 'Turkey', current_team: 'Amateur', speed: 74, skill: 70, jumping: 67, agility: 73, stamina: 68, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face' },
  { name: 'Sefa Güler', age: 22, position: 'Right Back', nationality: 'Turkey', current_team: 'Amateur', speed: 70, skill: 66, jumping: 69, agility: 71, stamina: 73, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop&crop=face' },
  { name: 'Bora Demir', age: 19, position: 'Central Midfielder', nationality: 'Turkey', current_team: 'Amateur', speed: 68, skill: 71, jumping: 66, agility: 69, stamina: 67, image: 'https://images.unsplash.com/photo-1541532714166-2ef38bd7f42f?w=400&h=600&fit=crop&crop=face' },
  { name: 'Arda Yıldız', age: 16, position: 'Striker', nationality: 'Turkey', current_team: 'Amateur', speed: 75, skill: 68, jumping: 70, agility: 72, stamina: 65, image: 'https://images.unsplash.com/photo-1623488067504-63d920229e47?w=400&h=600&fit=crop&crop=face' }
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
    const { data, error } = await (supabase as any)
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