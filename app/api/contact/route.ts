export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerComponentClient } from '@/lib/supabase-server'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies: () => req.cookies } as any)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      scoutName,
      scoutEmail,
      scoutClub,
      message,
      athleteId,
      athleteName,
    } = await req.json()

    if (!message || message.trim().length < 50 || !athleteId || !scoutEmail || !scoutName) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role')
      .or(`user_id.eq.${user.id},id.eq.${user.id}`)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const { error } = await (supabase as any)
      .from('contact_messages')
      .insert({
        scout_id: profile.id,
        athlete_id: athleteId,
        scout_name: scoutName,
        scout_club: scoutClub || null,
        message,
        contact_email: scoutEmail,
        status: 'unread',
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (resend && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'TSM <noreply@talentscout.com>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Scout Message for ${athleteName}`,
        html: `
          <h2>New Contact Request</h2>
          <p><b>Scout:</b> ${scoutName} (${scoutClub || '-'})</p>
          <p><b>Scout Email:</b> ${scoutEmail}</p>
          <p><b>Athlete:</b> ${athleteName}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      })

      await resend.emails.send({
        from: 'TSM <noreply@talentscout.com>',
        to: scoutEmail,
        subject: 'Your message has been received — TSM',
        html: `<p>We received your message about ${athleteName}. The manager will contact you within 48 hours.</p>`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Unexpected error' }, { status: 500 })
  }
}
