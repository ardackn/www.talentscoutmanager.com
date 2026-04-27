"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, CheckCircle2, Globe, Users, TrendingUp, Shield, ChevronRight, Star, Target, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const LIVE_ACTIVITY = [
  { id: 1, name: 'D. Okafor', pos: 'ST', team: 'Bundesliga', score: 9.2, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'L. Vargas', pos: 'AMF', team: 'Premier LG', score: 8.4, image: 'https://i.pravatar.cc/150?img=12' },
  { id: 3, name: 'T. Adeyemi', pos: 'LWF', team: 'Serie A', score: 8.9, image: 'https://i.pravatar.cc/150?img=13' },
  { id: 4, name: 'M. Kaya', pos: 'LB', team: 'Süper Lig', score: 7.8, image: 'https://i.pravatar.cc/150?img=14' },
  { id: 5, name: 'R. Silva', pos: 'CDM', team: 'MLS', score: 8.7, image: 'https://i.pravatar.cc/150?img=15' },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white font-sans selection:bg-[#E94560] selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D0D1A]/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">TSM<span className="text-[#E94560]">.</span></span>
            <div className="hidden md:block h-6 w-[1px] bg-white/20 mx-2"></div>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Talent Scout Manager</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Özellikler</Link>
            <Link href="#users" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Kullanıcılar</Link>
            <Link href="#demo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Demo</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Fiyatlandırma</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/player-login" className="hidden sm:block text-sm font-bold text-gray-300 hover:text-white px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all">Yenek Kaydı / Giriş</Link>
            <Link href="/scout-register" className="text-sm font-bold bg-[#10B981] hover:bg-[#0ea873] text-white px-6 py-2.5 rounded-lg shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all">İzci Kayıt / Giriş</Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Pitch Lines Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="w-full h-full">
            <rect x="50" y="50" width="900" height="900" fill="none" stroke="white" strokeWidth="2" />
            <line x1="500" y1="50" x2="500" y2="950" stroke="white" strokeWidth="2" />
            <circle cx="500" cy="500" r="150" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E94560]/10 border border-[#E94560]/30 text-[10px] font-black tracking-widest text-[#E94560] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E94560] animate-pulse"></span>
              Yapay Zeka Destekli Yetenek Keşfi
            </span>
            <h1 className="text-6xl md:text-[90px] font-black leading-[0.9] mb-8 tracking-tighter uppercase italic">
              Coğrafyaya <br />
              <span className="text-white">Meydan Okumak:</span> <br />
              <span className="text-[#10B981] drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">Yeteneğiniz</span> <br />
              Sınır Tanımaz.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Dünyanın en gelişmiş yapay zeka scouting sistemi ile tanışın. Sadece bir video yükleyin, verileriniz dünyaya açılsın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/player-register" className="group relative px-8 py-4 bg-[#F5A623] hover:bg-[#e09512] text-[#0D0D1A] font-black text-lg rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 overflow-hidden shadow-[0_10px_30px_rgba(245,166,35,0.4)]">
                <span className="relative z-10">OYUNCU OLARAK KATIL</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/scout-login" className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-xl transition-all hover:bg-white/5 text-center flex items-center justify-center gap-2">
                İzci Girişi
              </Link>
            </div>
          </motion.div>

          {/* Scout Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="bg-[#1A1A2E]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#10B981]/10 transition-colors"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">İzci Kontrol Paneli</h4>
                  <h3 className="text-xl font-bold">Bu Haftanın Oyuncuları</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-[10px] font-black flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  CANLI
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {LIVE_ACTIVITY.map((player, idx) => (
                  <motion.div 
                    key={player.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group/item"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 relative">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#10B981]/20 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white group-hover/item:text-[#10B981] transition-colors">{player.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{player.pos} → {player.team}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#10B981] font-black text-lg">{player.score}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-[#1A1A2E]" alt="" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#10B981] border-2 border-[#1A1A2E] flex items-center justify-center text-[10px] font-black">+12</div>
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Kayıtlı İzci Sayısı: 2.3k</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E94560]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#10B981]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="features" className="py-32 bg-[#0A0A15] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24">
            <h3 className="text-[#10B981] font-black tracking-widest uppercase text-sm mb-4">Süreç</h3>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Nasıl <span className="text-white/40">Çalışır?</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Play className="w-8 h-8" />, 
                title: "Videonuzu Yükleyin", 
                desc: "Maç veya antrenman görüntülerinizi telefonunuzdan kolayca yükleyin.",
                color: "#10B981"
              },
              { 
                icon: <Activity className="w-8 h-8" />, 
                title: "AI Analiz Yapsın", 
                desc: "GPT-4o Vision teknolojisi ile teknik, hız ve taktik becerileriniz puanlansın.",
                color: "#E94560"
              },
              { 
                icon: <Target className="w-8 h-8" />, 
                title: "İzciler Sizi Bulsun", 
                desc: "Küresel ağımızdaki profesyonel kulüp ve temsilcilerle doğrudan bağlantı kurun.",
                color: "#F5A623"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[32px] bg-[#1A1A2E] border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg" style={{ backgroundColor: `${step.color}20`, color: step.color }}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION */}
      <section className="py-32 bg-[#0D0D1A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="text-[#F5A623] font-black tracking-widest uppercase text-sm mb-4">Keşfet</h3>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Elite <span className="text-white/40">Yetenek Havuzu</span></h2>
            </div>
            <Link href="/pricing" className="text-[#10B981] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Tüm Oyuncuları Gör <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: 'Eren Demir', age: 20, pos: 'Football', rating: 94, img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400' },
              { name: 'Alper Yalçın', age: 21, pos: 'Football', rating: 91, img: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=400' },
              { name: 'Barış Köse', age: 19, pos: 'Football', rating: 89, img: 'https://images.unsplash.com/photo-1518005020250-6859493598c9?auto=format&fit=crop&q=80&w=400' },
              { name: 'Mustafa Duman', age: 22, pos: 'Football', rating: 88, img: 'https://images.unsplash.com/photo-1526232761682-d26e4f9c6024?auto=format&fit=crop&q=80&w=400' },
            ].map((player, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-white/5 border border-white/10"
              >
                <img src={player.img} alt={player.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[#F5A623] font-black text-2xl mb-1">{player.rating}</div>
                  <h4 className="text-xl font-bold text-white mb-1">{player.name}</h4>
                  <p className="text-sm text-gray-400 font-medium">{player.age} Yaş • {player.pos}</p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                  Elite
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Oyuncu", value: "10.8k+" },
              { label: "Profesyonel İzci", value: "2.3k+" },
              { label: "Aktif Ülke", value: "50+" },
              { label: "Yıllık Transfer", value: "380+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-6xl font-black text-white mb-2 italic tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#10B981] font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-20 border-t border-white/5 bg-[#0D0D1A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <span className="text-4xl font-black tracking-tighter text-white mb-6 block">TSM<span className="text-[#E94560]">.</span></span>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Yetenek ve fırsat arasındaki küresel köprü. Spor dünyasında liyakati ve erişilebilirliği yeniden tanımlıyoruz.
              </p>
              <div className="flex gap-4">
                {['twitter', 'instagram', 'linkedin', 'youtube'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E94560] transition-colors cursor-pointer border border-white/10">
                    <span className="sr-only">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/athletes" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Yetenekler</Link></li>
                <li><Link href="/how-it-works" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Nasıl Çalışır</Link></li>
                <li><Link href="/pricing" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Fiyatlandırma</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Yasal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Kullanım Şartları</Link></li>
                <li><Link href="/kvkk" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">KVKK</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">© 2024 Talent Scout Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}