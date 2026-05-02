export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

// Admin email - configure via .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@talentscoutmanager.com'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const athleteId = formData.get('athleteId') as string
    const content = formData.get('content') as string
    const scoutName = (formData.get('scoutName') || 'Anonymous Scout') as string

    if (!athleteId || !content?.trim()) {
      return NextResponse.json({ error: 'Missing athleteId or content' }, { status: 400 })
    }

    const supabase = createServerComponentClient({ cookies: () => (request as any).cookies }) as any

    // Get current user (scout)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Must be logged in' }, { status: 401 })
    }

    // 1. Save message to DB - goes to admin dashboard
    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert({
        scout_id: user.id,
        athlete_id: athleteId,
        message: content,
        scout_name: scoutName,
        contact_email: user.email || ADMIN_EMAIL,
        status: 'pending'
      })

    if (insertError) {
      console.error('DB insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save message: ' + insertError.message }, { status: 500 })
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
