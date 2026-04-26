import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, phone, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'E-posta ve mesaj zorunludur.' }, { status: 400 });
    }

    // Send email to the manager
    await resend.emails.send({
      from: 'TSM Platform <onboarding@resend.dev>',
      to: 'dcctsm@gmail.com',
      subject: 'Yeni İletişim Formu Mesajı',
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Yeni İletişim Mesajı Alındı ve Gönderildi:', { email, phone, message });

    return NextResponse.json({ success: true, message: 'Mesajınız başarıyla gönderildi.' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}