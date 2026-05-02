"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { useSession } from '@/hooks/use-session'
import { Dna, Activity, Target, Shield, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { label: 'Temel Oyuncu Veritabanı Erişimi', free: true, premium: true, gold: true },
  { label: 'Gelişmiş AI Filtreleme', free: false, premium: true, gold: true },
  { label: 'Oyuncularla Doğrudan İletişim', free: false, premium: true, gold: true },
  { label: 'Sınırsız Global Veritabanı Araması', free: false, premium: false, gold: true },
  { label: 'Detaylı AI Video Analiz Raporları', free: false, premium: false, gold: true },
  { label: 'AI Gelişim Tahmin ve Mevki Uyumu', free: false, premium: false, gold: true },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'gold' | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const router = useRouter()
  const { session } = useSession()

  const handleCheckout = async (plan: 'premium' | 'gold') => {
    if (!session?.user) {
      toast.error('Lütfen önce giriş yapın veya kayıt olun.');
      router.push('/scout-register');
      return;
    }

    try {
      const variantId = plan === 'premium' ? '1532598' : '1532704';
      const response = await fetch('/api/lemonsqueezy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: plan === 'premium' ? 'pro' : 'elite',
          variantId: variantId,
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Checkout sayfası oluşturulamadı. ' + (data.error || ''))
      }
    } catch {
      toast.error('Bağlantı hatası oluştu.')
    }
  }

  return (
    <div className="min-h-screen text-white bg-[#05050A] selection:bg-[#10B981]">
      {/* Player Banner */}
      <div className="w-full py-4 px-6 text-center text-xs font-black uppercase tracking-widest bg-[#10B981]/5 border-b border-[#10B981]/20">
        <span className="text-gray-400">Yetenekli bir sporcu musun?</span>{' '}
        <span className="text-[#10B981]">Veritabanımıza kayıt olmak oyuncular için tamamen ücretsizdir.</span>{' '}
        <Link href="/player-register" className="underline ml-2 hover:text-white transition-colors text-[#10B981]">
          Hemen Kaydol →
        </Link>
      </div>

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 bg-white/5 border border-white/10 text-[#10B981]">
              <Target className="w-4 h-4 animate-pulse" /> Global Erişim Planları
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
              <span className="text-white">Yetenek Ağını</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-blue-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">Keşfet</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Dünyanın en gelişmiş AI destekli yetenek veritabanına erişin. Geleceğin yıldızlarını keşfetmek için yapay zekanın gücünü kullanın.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">

            {/* Scout Free */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#0A0A14] border border-white/5 hover:border-white/20 transition-all">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Scout Ücretsiz</h2>
                <p className="text-gray-500 text-sm font-medium">Temel scout erişimi</p>
                <div className="flex items-end gap-1 mt-6">
                  <span className="text-6xl font-black text-white italic">$0</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Temel Oyuncu Veritabanı Erişimi
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/10 text-red-500">✗</span> Gelişmiş AI Filtreleme Yok
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/10 text-red-500">✗</span> Doğrudan İletişim Yok
                </li>
              </ul>
              <Link
                href="/scout-register"
                className="w-full py-4 text-center font-black text-sm uppercase tracking-widest rounded-full transition-all border border-white/20 hover:bg-white/10"
              >
                Hemen Başla
              </Link>
            </div>

            {/* Premium Scout */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#05050A] border-2 border-[#10B981] shadow-[0_0_50px_rgba(16,185,129,0.15)] transform scale-105 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#10B981] text-[#05050A] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Popüler Plan
              </div>
              <div className="mb-8 mt-4">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Premium Scout</h2>
                <p className="text-gray-400 text-sm font-medium">Profesyonel yetenek keşfi için</p>
                <div className="flex items-end gap-1 mt-6">
                  <span className="text-6xl font-black text-white italic">$25</span>
                  <span className="text-gray-500 mb-2 font-bold">/ay</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                {['Temel Oyuncu Veritabanı Erişimi', 'Gelişmiş AI Filtreleme', 'Oyuncularla Doğrudan İletişim'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> {f}
                  </li>
                ))}
                {['Sınırsız Global Veritabanı Araması', 'Detaylı AI Video Analiz Raporları', 'AI Gelişim Tahmin ve Mevki Uyumu'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-gray-600">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/10 text-red-500">✗</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('premium')}
                className="w-full py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all hover:scale-105 bg-[#10B981] text-[#05050A] shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                Premium'a Yükselt
              </button>
            </div>

            {/* Gold Scout */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#0A0A14] border border-blue-500/50 hover:border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-blue-500 text-white">
                Elit Paket
              </div>
              <div className="mb-8 mt-2">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Gold Scout</h2>
                <p className="text-gray-400 text-sm font-medium">Sınırsız premium analiz ve erişim</p>
                <div className="flex items-end gap-1 mt-6">
                  <span className="text-6xl font-black text-white italic">$50</span>
                  <span className="text-gray-500 mb-2 font-bold">/ay</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                {['Temel Oyuncu Veritabanı Erişimi', 'Gelişmiş AI Filtreleme', 'Oyuncularla Doğrudan İletişim', 'Sınırsız Global Veritabanı Araması', 'Detaylı AI Video Analiz Raporları', 'AI Gelişim Tahmin ve Mevki Uyumu'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('gold')}
                className="w-full py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all hover:scale-[1.02] bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
              >
                Tüm Özellikleri Aç
              </button>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#0A0A14]">
            <div className="grid grid-cols-4 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border-b border-white/10">
              <div className="text-gray-400 col-span-1">Özellik</div>
              <div className="text-center text-gray-400">Scout Ücretsiz</div>
              <div className="text-center text-[#10B981]">Premium Scout</div>
              <div className="text-center text-blue-500">Gold Scout</div>
            </div>
            {features.map((f, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-8 py-6 text-sm font-medium"
                style={{ borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
              >
                <div className="text-gray-300 col-span-1">{f.label}</div>
                <div className="text-center">{f.free ? <span className="text-[#10B981]">●</span> : <span className="text-gray-800">●</span>}</div>
                <div className="text-center">{f.premium ? <span className="text-[#10B981]">●</span> : <span className="text-gray-800">●</span>}</div>
                <div className="text-center">{f.gold ? <span className="text-blue-500">●</span> : <span className="text-gray-800">●</span>}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
