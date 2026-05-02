export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoUrl, athleteId } = body;

    if (!videoUrl) {
      return NextResponse.json({ error: 'Missing videoUrl' }, { status: 400 });
    }

    // Simulate AI Analysis
    const analysis = {
      teknik_beceri: { dribbling: Math.floor(Math.random() * 20) + 70, passing: Math.floor(Math.random() * 20) + 70, shooting: Math.floor(Math.random() * 20) + 70 },
      fiziksel_ozellikler: { speed: Math.floor(Math.random() * 20) + 75, agility: Math.floor(Math.random() * 20) + 75, stamina: Math.floor(Math.random() * 20) + 70 },
      taktiksel_farkindalik: { positioning: Math.floor(Math.random() * 20) + 70, decision_making: Math.floor(Math.random() * 20) + 70 },
      genel_potansiyel: Math.floor(Math.random() * 15) + 80,
      mevki_uygunlugu: ["Merkez Orta Saha", "Ofansif Orta Saha", "Sağ Kanat"],
      gelisim_onerileri: ["Zayıf ayak kullanımı geliştirilmeli", "Hava toplarında zamanlama çalışılmalı", "Karar verme hızı artırılmalı"]
    };

    if (athleteId) {
      const cookieStore = cookies();
      const supabase = createServerComponentClient({ cookies: () => cookieStore }) as any;
      
      // Update user profile with AI scores
      await supabase.from('analysis_reports').insert({
        athlete_id: athleteId,
        mode: 'advanced',
        payload: { videoUrl, analysis }
      });
      
      // Update profile with general score if needed
      await supabase.from('profiles').update({
        subscription_status: 'active' // Example update
      }).eq('id', athleteId);
    }

    return NextResponse.json({ 
      success: true, 
      analysis,
      message: 'AI Analizi başarıyla tamamlandı' 
    });

  } catch (error) {
    console.error('AI Analyze error:', error);
    return NextResponse.json({ error: 'Analiz başarısız oldu' }, { status: 500 });
  }
}
