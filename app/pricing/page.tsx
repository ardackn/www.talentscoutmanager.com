"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const features = [
  { label: 'Rastgele oyuncu görüntüleme', free: true, premium: true, gold: true },
  { label: 'Gelişmiş filtreleme', free: false, premium: true, gold: true },
  { label: 'Oyuncuyla iletişim kurma', free: false, premium: true, gold: true },
  { label: 'Sınırsız arama', free: false, premium: false, gold: true },
  { label: 'Video analiz raporları', free: false, premium: false, gold: true },
  { label: 'AI Maç Raporu', free: false, premium: false, gold: true },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'gold' | null>(null)
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const router = useRouter()

  const openPopup = (plan: 'premium' | 'gold') => {
    setSelectedPlan(plan)
    setIsPopupOpen(true)
  }

  const handleCheckout = async (interval: 'month' | 'year') => {
    if (!selectedPlan) return
    try {
      const response = await fetch('/api/lemonsqueezy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedPlan === 'premium' ? 'pro' : 'elite',
          variantId: selectedPlan === 'premium'
            ? (interval === 'month' ? process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRO_MONTHLY_VARIANT : process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRO_YEARLY_VARIANT)
            : (interval === 'month' ? process.env.NEXT_PUBLIC_LEMONSQUEEZY_ELITE_MONTHLY_VARIANT : process.env.NEXT_PUBLIC_LEMONSQUEEZY_ELITE_YEARLY_VARIANT),
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Ödeme bağlantısı oluşturulamadı.')
      }
    } catch {
      toast.error('Ödeme sistemine bağlanılamadı.')
    }
  }

  return (
    <div className="min-h-screen text-white" style={{ background: '#0d1b2a' }}>
      {/* Player Banner */}
      <div className="w-full py-3 px-6 text-center text-sm font-medium" style={{ background: 'rgba(0,229,204,0.1)', borderBottom: '1px solid rgba(0,229,204,0.2)' }}>
        <span className="text-gray-300">Oyuncu mısınız?</span>{' '}
        <span style={{ color: '#00e5cc' }}>Oyuncular için her zaman ücretsizdir.</span>{' '}
        <Link href="/player-register" className="font-bold underline ml-1 hover:opacity-80" style={{ color: '#00e5cc' }}>
          Ücretsiz Kayıt Ol →
        </Link>
      </div>

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
              🔍 Scout Planları
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-white">Geleceğin Yıldızlarını</span><br />
              <span style={{ background: 'linear-gradient(90deg, #00e5cc, #f5a623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Keşfetmeye Başla</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Yapay zeka destekli filtreleme araçlarıyla dünyanın her köşesindeki yeteneklere ulaş.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => setBillingCycle('month')}
                className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
                style={{ background: billingCycle === 'month' ? '#00e5cc' : 'transparent', color: billingCycle === 'month' ? '#0d1b2a' : '#9ca3af' }}
              >
                Aylık
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                style={{ background: billingCycle === 'year' ? '#00e5cc' : 'transparent', color: billingCycle === 'year' ? '#0d1b2a' : '#9ca3af' }}
              >
                Yıllık
                <span className="text-xs px-2 py-0.5 rounded-full font-black" style={{ background: billingCycle === 'year' ? 'rgba(0,0,0,0.2)' : 'rgba(0,229,204,0.2)', color: billingCycle === 'year' ? '#0d1b2a' : '#00e5cc' }}>
                  %20 İndirim
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">

            {/* Free Plan */}
            <div className="rounded-3xl p-8 flex flex-col relative" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-300 mb-1">Ücretsiz İzci</h2>
                <p className="text-gray-500 text-sm mb-4">Platformu keşfetmek için</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">$0</span>
                  <span className="text-gray-400 mb-2">/ay</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-sm">
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(0,229,204,0.2)', color: '#00e5cc' }}>✓</span>
                  Rastgele oyuncu görüntüleme
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/20 text-red-400">✗</span>
                  Filtreleme yok
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/20 text-red-400">✗</span>
                  İletişim kurma yok
                </li>
              </ul>
              <Link
                href="/scout-register"
                className="w-full py-4 text-center font-bold text-sm rounded-xl transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px' }}
              >
                Başla — Ücretsiz
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="rounded-3xl p-8 flex flex-col relative" style={{ background: 'linear-gradient(145deg, rgba(0,80,70,0.5) 0%, rgba(0,229,204,0.08) 100%)', border: '2px solid #00e5cc', boxShadow: '0 0 40px rgba(0,229,204,0.2)' }}>
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#00e5cc', color: '#0d1b2a' }}>
                ⭐ EN POPÜLER
              </div>
              <div className="mb-6 mt-2">
                <h2 className="text-xl font-bold text-white mb-1">Premium</h2>
                <p className="text-gray-400 text-sm mb-4">Ciddi yetenek avcıları için</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">
                    ${billingCycle === 'year' ? '20' : '25'}
                  </span>
                  <span className="text-gray-400 mb-2">/ay</span>
                </div>
                {billingCycle === 'year' && <p className="text-xs mt-1" style={{ color: '#00e5cc' }}>Yıllık $240 ($300 yerine)</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-sm">
                {['Rastgele oyuncu görüntüleme', 'Gelişmiş filtreleme', 'Oyuncuyla iletişim kurma'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(0,229,204,0.2)', color: '#00e5cc' }}>✓</span>
                    {f}
                  </li>
                ))}
                {['Sınırsız arama', 'Video analiz raporları', 'AI Maç Raporu'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-gray-500">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/20 text-red-400">✗</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openPopup('premium')}
                className="w-full py-4 font-black text-sm rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,229,204,0.4)' }}
              >
                Premium'a Geç
              </button>
            </div>

            {/* Gold Plan */}
            <div className="rounded-3xl p-8 flex flex-col relative" style={{ background: 'linear-gradient(145deg, rgba(60,30,0,0.6) 0%, rgba(245,166,35,0.1) 100%)', border: '2px solid #f5a623', boxShadow: '0 0 40px rgba(245,166,35,0.2)' }}>
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: 'linear-gradient(90deg, #f5a623, #ffd166)', color: '#0d1b2a' }}>
                👑 PRO
              </div>
              <div className="mb-6 mt-2">
                <h2 className="text-xl font-bold text-white mb-1">Gold</h2>
                <p className="text-gray-400 text-sm mb-4">Profesyonel kuruluşlar için</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">
                    ${billingCycle === 'year' ? '40' : '50'}
                  </span>
                  <span className="text-gray-400 mb-2">/ay</span>
                </div>
                {billingCycle === 'year' && <p className="text-xs mt-1" style={{ color: '#f5a623' }}>Yıllık $480 ($600 yerine)</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-sm">
                {['Rastgele oyuncu görüntüleme', 'Gelişmiş filtreleme', 'Oyuncuyla iletişim kurma', 'Sınırsız arama', 'Video analiz raporları', 'AI Maç Raporu'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(245,166,35,0.2)', color: '#f5a623' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openPopup('gold')}
                className="w-full py-4 font-black text-sm rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(90deg, #f5a623, #ffd166)', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
              >
                Gold'a Geç 👑
              </button>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-4 px-6 py-4 text-xs font-black uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-gray-400 col-span-1">Özellik</div>
              <div className="text-center text-gray-400">Ücretsiz</div>
              <div className="text-center" style={{ color: '#00e5cc' }}>Premium</div>
              <div className="text-center" style={{ color: '#f5a623' }}>Gold</div>
            </div>
            {features.map((f, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-6 py-4 text-sm"
                style={{ borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
              >
                <div className="text-gray-300 col-span-1">{f.label}</div>
                <div className="text-center">{f.free ? <span style={{ color: '#00e5cc' }}>✅</span> : <span className="text-gray-600">❌</span>}</div>
                <div className="text-center">{f.premium ? <span style={{ color: '#00e5cc' }}>✅</span> : <span className="text-gray-600">❌</span>}</div>
                <div className="text-center">{f.gold ? <span style={{ color: '#f5a623' }}>✅</span> : <span className="text-gray-600">❌</span>}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm mb-4">Sorularınız mı var?</p>
            <a href="mailto:hello@talentscoutmanager.com" className="font-bold hover:underline" style={{ color: '#00e5cc' }}>
              hello@talentscoutmanager.com
            </a>
          </div>
        </div>
      </main>

      {/* Billing Period Popup */}
      {isPopupOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-3xl p-8 text-center" style={{ background: '#0d1b2a', border: `2px solid ${selectedPlan === 'premium' ? '#00e5cc' : '#f5a623'}` }}>
            <div className="text-5xl mb-4">{selectedPlan === 'premium' ? '⭐' : '👑'}</div>
            <h3 className="text-2xl font-black text-white mb-2">
              {selectedPlan === 'premium' ? 'Premium' : 'Gold'} Planı Seç
            </h3>
            <p className="text-gray-400 mb-8">Fatura periyodunu seçin</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { setIsPopupOpen(false); handleCheckout('month') }}
                className="w-full py-4 font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ border: `1px solid ${selectedPlan === 'premium' ? '#00e5cc' : '#f5a623'}`, color: selectedPlan === 'premium' ? '#00e5cc' : '#f5a623', borderRadius: '8px', background: 'transparent' }}
              >
                Aylık — ${selectedPlan === 'premium' ? '25' : '50'}/ay
              </button>
              <button
                onClick={() => { setIsPopupOpen(false); handleCheckout('year') }}
                className="w-full py-4 font-black rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: selectedPlan === 'premium' ? '#00e5cc' : 'linear-gradient(90deg, #f5a623, #ffd166)', color: '#0d1b2a', borderRadius: '8px' }}
              >
                Yıllık — ${selectedPlan === 'premium' ? '20' : '40'}/ay
                <span className="ml-2 text-xs opacity-70">(%20 İndirim)</span>
              </button>
            </div>
            <button onClick={() => setIsPopupOpen(false)} className="mt-6 text-sm text-gray-500 hover:text-white transition-colors">
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
