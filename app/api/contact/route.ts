import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { playerName, senderPhone, senderEmail, message } = await req.json()

    if (!senderPhone || !senderEmail || !message || !playerName) {
      return NextResponse.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'TSM Platform <onboarding@resend.dev>',
      to: ['dcctsm@gmail.com'],
      subject: `TSM - ${playerName} için İletişim Talebi`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05050A; color: white; padding: 32px; border-radius: 16px;">
          <h2 style="color: #10B981; margin-top: 0;">Yeni İletişim Talebi</h2>
          <p style="color: #9ca3af;">Aşağıdaki sporcu için iletişim talebi alındı:</p>
          <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: white; margin: 0 0 16px 0;">⚽ Sporcu: ${playerName}</h3>
            <p style="margin: 8px 0; color: #d1d5db;"><strong style="color: #10B981;">Gönderen E-posta:</strong> ${senderEmail}</p>
            <p style="margin: 8px 0; color: #d1d5db;"><strong style="color: #10B981;">Telefon:</strong> ${senderPhone}</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">MESAJ</p>
            <p style="color: white; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="color: #6b7280; font-size: 11px; margin-top: 24px; text-align: center;">TSM - Talent Scout Manager Platform</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'E-posta gönderilemedi.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 })
  }
}