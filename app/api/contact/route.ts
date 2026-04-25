import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, phone, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'E-posta ve mesaj zorunludur.' }, { status: 400 });
    }

    // In a real application, you would integrate a mailer like Resend or NodeMailer here
    // Example: await resend.emails.send({ from: '...', to: 'dcctsm@gmail.com', subject: 'Yeni İletişim Formu', html: `...` })

    console.log('Yeni İletişim Mesajı Alındı:', { email, phone, message });

    return NextResponse.json({ success: true, message: 'Mesajınız başarıyla gönderildi.' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}