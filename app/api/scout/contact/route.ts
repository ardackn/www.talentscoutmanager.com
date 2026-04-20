import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'
import { eq } from 'drizzle-orm' // optional, using raw for now

// Admin email - configure via .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@talentscoutmanager.com'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const athleteId = formData.get('athleteId') as string
    const content = formData.get('content') as string
    const scoutName = formData.get('scoutName') || 'Anonymous Scout'

    if (!athleteId || !content?.trim()) {
      return NextResponse.json({ error: 'Missing athleteId or content' }, { status: 400 })
    }

    const supabase = createServerComponentClient()

    // Get current user (scout)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Must be logged in' }, { status: 401 })
    }

    // Get scout profile ID
    const { data: scoutProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .eq('role', 'scout')
      .single()

    const scoutId = scoutProfile?.id || 'anonymous_scout_' + Date.now()

    // 1. Save message to DB - goes to admin dashboard
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        scout_id: scoutId,
        athlete_id: athleteId,
        content,
        status: 'sent' as const
      })

    if (insertError) {
      console.error('DB insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save message to admin' }, { status: 500 })
    }

    // 2. Log email notification (SMTP setup optional)
    console.log(`[CONTACT] New message from ${scoutName} about athlete ${athleteId}: ${content.substring(0, 100)}... | To: ${ADMIN_EMAIL}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Message delivered to admin dashboard!'
    })

  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}

