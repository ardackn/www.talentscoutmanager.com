"use client"

import { useState } from 'react'
import { Check, X, Shield, Star, Zap, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'gold' | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const router = useRouter()

  const openPopup = (plan: 'premium' | 'gold') => {
    setSelectedPlan(plan)
    setIsPopupOpen(true)
  }

  const handleCheckout = (interval: 'month' | 'year') => {
    alert(`Ödeme altyapısına yönlendiriliyor...\nPaket: ${selectedPlan}\nPeriyot: ${interval === 'year' ? 'Yıllık' : 'Aylık'}`)
    router.push('/register?role=scout')
  }

  return (
    <div className="relative min-h-screen bg-[#050806]">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop" 
          alt="Football Tactical Board" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806] via-[#050806]/80 to-[#050806]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-[#00D26A] bg-clip-text text-transparent mb-6">
              Scout Planları
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Geleceğin yıldızlarını bulmak için ihtiyacınız olan yapay zeka araçları.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md relative opacity-70">
              <h2 className="text-2xl font-bold mb-2">Ücretsiz İzci</h2>
              <div className="text-3xl font-black mb-6">$0<span className="text-lg text-slate-400 font-normal">/ay</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex gap-3"><Check className="text-[#00D26A] w-5 h-5 flex-shrink-0" /> Rastgele oyuncu görüntüleme</li>
                <li className="flex gap-3"><X className="text-red-500 w-5 h-5 flex-shrink-0" /> Filtreleme yok</li>
                <li className="flex gap-3"><X className="text-red-500 w-5 h-5 flex-shrink-0" /> İletişim kurma yok</li>
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold cursor-not-allowed">
                Mevcut Planınız
              </button>
            </div>

            {/* Premium Plan */}
            <div className="card p-8 rounded-3xl border-2 border-[#00D26A] bg-[#00D26A]/10 backdrop-blur-md relative transform hover:-translate-y-2 transition-all">
              <div className="absolute top-0 right-0 bg-[#00D26A] text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                EN POPÜLER
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#00D26A]">Premium</h2>
              <div className="text-3xl font-black mb-6">$25<span className="text-lg text-slate-400 font-normal">/ay</span></div>
              <ul className="space-y-4 mb-8 text-slate-200">
                <li className="flex gap-3"><Check className="text-[#00D26A] w-5 h-5 flex-shrink-0" /> <b>Filtreleme Seçeneği</b></li>
                <li className="flex gap-3"><Check className="text-[#00D26A] w-5 h-5 flex-shrink-0" /> <b>İletişim Kurma Seçeneği</b></li>
                <li className="flex gap-3"><Check className="text-[#00D26A] w-5 h-5 flex-shrink-0" /> Oyuncu veri görüntüleme</li>
              </ul>
              <button onClick={() => openPopup('premium')} className="w-full py-4 rounded-xl bg-[#00D26A] text-black font-black hover:bg-[#00e676] transition-colors shadow-[0_0_15px_rgba(0,210,106,0.3)]">
                Premium Satın Al
              </button>
            </div>

            {/* Gold Plan */}
            <div className="card p-8 rounded-3xl border border-yellow-500/50 bg-black/40 backdrop-blur-md relative transform hover:-translate-y-2 transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm font-black px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-4 h-4" /> PROFESYONELLER İÇİN
              </div>
              <h2 className="text-2xl font-bold mb-2 text-yellow-500">Gold Plan</h2>
              <div className="text-3xl font-black mb-6">$50<span className="text-lg text-slate-400 font-normal">/ay</span></div>
              <ul className="space-y-4 mb-8 text-slate-200">
                <li className="flex gap-3"><Check className="text-yellow-500 w-5 h-5 flex-shrink-0" /> Premium'daki her şey</li>
                <li className="flex gap-3"><Check className="text-yellow-500 w-5 h-5 flex-shrink-0" /> <b>Sınırsız Video Yükleme</b></li>
                <li className="flex gap-3"><Check className="text-yellow-500 w-5 h-5 flex-shrink-0" /> <b>AI Maç Analizi (Eksikler, artı ve eksiler)</b></li>
              </ul>
              <button onClick={() => openPopup('gold')} className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black hover:from-yellow-300 hover:to-amber-500 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                Gold Satın Al
              </button>
            </div>
          </div>

          {/* Payment Popup */}
          {isPopupOpen && selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#111] border border-white/10 rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
                <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
                
                <h3 className="text-2xl font-black text-center mb-6 capitalize text-white">
                  {selectedPlan} Paket Seçimi
                </h3>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => handleCheckout('month')}
                    className="w-full flex items-center justify-between p-5 rounded-2xl border border-white/20 hover:border-[#00D26A] bg-white/5 hover:bg-[#00D26A]/5 transition-all group"
                  >
                    <div className="text-left">
                      <div className="font-bold text-lg group-hover:text-[#00D26A]">Aylık Ödeme</div>
                      <div className="text-sm text-slate-400">Her ay yenilenir</div>
                    </div>
                    <div className="text-2xl font-black">
                      ${selectedPlan === 'premium' ? '25' : '50'}
                    </div>
                  </button>

                  <button 
                    onClick={() => handleCheckout('year')}
                    className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                      2 AY ÜCRETSİZ
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg text-yellow-500 group-hover:text-yellow-400">Yıllık Ödeme</div>
                      <div className="text-sm text-slate-300">Yılda bir kez faturalandırılır</div>
                    </div>
                    <div className="text-2xl font-black text-yellow-500">
                      ${selectedPlan === 'premium' ? '200' : '500'}
                    </div>
                  </button>
                </div>
                
                <p className="text-center text-xs text-slate-500 mt-6">
                  Ödeme altyapısı LemonSqueezy üzerinden güvenle gerçekleşir.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
