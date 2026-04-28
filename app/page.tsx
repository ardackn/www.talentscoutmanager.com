"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, CheckCircle2, Globe, Users, TrendingUp, Shield, ChevronRight, Star, Target, Activity, Dna } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LIVE_ACTIVITY = [
  { id: 1, name: 'D. Okafor', pos: 'ST', team: 'Bundesliga', score: 9.2, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'L. Vargas', pos: 'AMF', team: 'Premier LG', score: 8.4, image: 'https://i.pravatar.cc/150?img=12' },
  { id: 3, name: 'T. Adeyemi', pos: 'LWF', team: 'Serie A', score: 8.9, image: 'https://i.pravatar.cc/150?img=13' },
  { id: 4, name: 'M. Kaya', pos: 'LB', team: 'Süper Lig', score: 7.8, image: 'https://i.pravatar.cc/150?img=14' },
  { id: 5, name: 'R. Silva', pos: 'CDM', team: 'MLS', score: 8.7, image: 'https://i.pravatar.cc/150?img=15' },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const aboutY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#05050A] text-white font-sans selection:bg-[#10B981] selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#05050A]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">TSM<span className="text-[#10B981]">.</span></span>
            <div className="hidden md:block h-6 w-[1px] bg-white/20 mx-2"></div>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#10B981] font-bold">Talent Scout Manager</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            <Link href="#who-we-are" className="text-xs tracking-widest uppercase font-bold text-gray-400 hover:text-white transition-colors">Who We Are</Link>
            <Link href="#vision" className="text-xs tracking-widest uppercase font-bold text-gray-400 hover:text-white transition-colors">Vision</Link>
            <Link href="#mission" className="text-xs tracking-widest uppercase font-bold text-gray-400 hover:text-white transition-colors">Mission</Link>
            <Link href="/pricing" className="text-xs tracking-widest uppercase font-bold text-gray-400 hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/player-login" className="hidden sm:block text-xs uppercase tracking-widest font-bold text-gray-300 hover:text-white transition-all">Player Login</Link>
            <Link href="/scout-register" className="text-xs uppercase tracking-widest font-bold bg-[#10B981] hover:bg-[#0ea873] text-[#05050A] px-8 py-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all">
              Scout Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[120vh] flex items-center pt-20 overflow-hidden perspective-[1000px]">
        {/* Deep Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img src="/images/hero_dna_boy.png" alt="Bio-Genetics AI Theme" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/80 via-transparent to-[#05050A] backdrop-blur-[2px]"></div>
        </motion.div>

        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-20 items-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pt-20"
          >
            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-black tracking-[0.2em] text-[#10B981] uppercase mb-12">
              <Dna className="w-4 h-4 animate-spin-slow" />
              The Intersection of Bio-Genetics & AI
            </span>
            <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] mb-12 tracking-tighter uppercase">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Human</span> <br />
              <span className="text-[#10B981] drop-shadow-[0_0_40px_rgba(16,185,129,0.4)] italic">Perception.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-16 max-w-xl leading-relaxed font-light">
              Experience the world's first bio-genetic AI scouting engine. We analyze movements, predict potential, and map the genetic blueprint of future champions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/player-register" className="group relative px-10 py-5 bg-white text-[#05050A] font-black text-sm uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 flex items-center justify-center gap-3 overflow-hidden shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
                <span className="relative z-10">Upload Your DNA</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Scout Dashboard Mockup Layered */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative hidden lg:block z-30"
          >
            <div className="bg-[#0A0A14]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:bg-[#10B981]/20 transition-colors duration-1000"></div>
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#10B981] font-black mb-2">Neural Link Active</h4>
                  <h3 className="text-2xl font-bold tracking-tight">Live Bio-Metrics</h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] font-black tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                  ANALYZING
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {LIVE_ACTIVITY.map((player, idx) => (
                  <motion.div 
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.1) }}
                    className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/item"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 shrink-0 relative">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white tracking-wide mb-1">{player.name}</div>
                      <div className="flex gap-2">
                        <span className="text-[9px] text-[#10B981] font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#10B981]/10">{player.pos}</span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5">{player.team}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black italic">{player.score}</div>
                      <div className="text-[8px] uppercase tracking-widest text-gray-500">Genetic Score</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section id="who-we-are" className="py-40 relative z-20 bg-[#05050A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div style={{ y: aboutY }} className="relative rounded-[40px] overflow-hidden aspect-square border border-white/5">
              <img src="/images/about_who_we_are.png" alt="Who We Are" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05050A] via-transparent to-transparent"></div>
            </motion.div>
            <div>
              <h3 className="text-[#10B981] font-black tracking-[0.3em] uppercase text-xs mb-6">Who We Are</h3>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-12 leading-none">
                The Architects <br/> of <span className="text-white/20">Tomorrow</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light">
                We are a collective of data scientists, bio-geneticists, and elite football scouts. We don't just watch the game; we decode the very fabric of athletic potential.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black text-white mb-2">99.8%</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-2">10k+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">DNA Profiles Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-40 bg-[#0A0A14] border-y border-white/5 relative z-30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Vision */}
            <div id="vision" className="group relative p-12 rounded-[40px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-[#10B981]/30">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                <img src="/images/vision_future_football.png" alt="Vision" className="w-full h-full object-cover mix-blend-screen" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end min-h-[400px]">
                <h3 className="text-[#10B981] font-black tracking-[0.3em] uppercase text-xs mb-4">Our Vision</h3>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-6">A World Without <br/> Hidden Talent</h2>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  To create a global ecosystem where geographical boundaries are erased by artificial intelligence, ensuring every talented individual gets discovered based on their pure genetic and mechanical metrics.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div id="mission" className="group relative p-12 rounded-[40px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-white/30">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                <img src="/images/mission_global_network.png" alt="Mission" className="w-full h-full object-cover mix-blend-screen" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end min-h-[400px]">
                <h3 className="text-white font-black tracking-[0.3em] uppercase text-xs mb-4">Our Mission</h3>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-6">Democratizing <br/> Sports Data</h2>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  To provide scouts and clubs with the most advanced bio-genetic AI analysis tools, turning raw video data into actionable, deeply analytical intelligence that powers the future of sports transfers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION (DASHBOARD PREVIEW) */}
      <section className="py-40 bg-[#05050A] relative z-40">
        <div className="absolute inset-0 z-0">
          <img src="/images/dashboard_ai_background.png" alt="Dashboard Background" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
            <div>
              <h3 className="text-[#10B981] font-black tracking-[0.3em] uppercase text-xs mb-6">Explore the Engine</h3>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Global <br/> <span className="text-white/20">Talent Grid</span></h2>
            </div>
            <Link href="/pricing" className="px-8 py-4 rounded-full border border-white/10 hover:border-[#10B981] text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3">
              View All Subjects <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Eren Demir', age: 20, pos: 'ST', rating: 94, code: 'SUB-001' },
              { name: 'Alper Yalçın', age: 21, pos: 'CM', rating: 91, code: 'SUB-002' },
              { name: 'Barış Köse', age: 19, pos: 'LW', rating: 89, code: 'SUB-003' },
              { name: 'Mustafa Duman', age: 22, pos: 'CB', rating: 88, code: 'SUB-004' },
            ].map((player, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative rounded-[32px] overflow-hidden bg-[#0A0A14] border border-white/5 hover:border-[#10B981]/50 transition-all p-8"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="text-[10px] text-[#10B981] font-black uppercase tracking-widest">{player.code}</div>
                  <Dna className="w-5 h-5 text-gray-600 group-hover:text-[#10B981] transition-colors" />
                </div>
                <div className="text-5xl font-black italic mb-6 text-white/20 group-hover:text-white transition-colors">{player.rating}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{player.name}</h4>
                <div className="flex gap-3">
                   <span className="text-[10px] bg-white/5 px-3 py-1 rounded font-bold text-gray-400 uppercase">{player.age} YRS</span>
                   <span className="text-[10px] bg-white/5 px-3 py-1 rounded font-bold text-gray-400 uppercase">{player.pos}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-[#0A0A14] relative z-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <span className="text-4xl font-black tracking-tighter text-white mb-8 block">TSM<span className="text-[#10B981]">.</span></span>
              <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-light">
                The global intersection of athletic potential and artificial intelligence. We redefine scouting.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/pricing" className="text-gray-500 hover:text-[#10B981] transition-colors text-sm font-medium">Pricing</Link></li>
                <li><Link href="/about" className="text-gray-500 hover:text-[#10B981] transition-colors text-sm font-medium">Who We Are</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-gray-500 hover:text-[#10B981] transition-colors text-sm font-medium">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-[#10B981] transition-colors text-sm font-medium">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">© 2026 Talent Scout Manager. Genetic Data Secured.</p>
            <div className="flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
              <Shield className="w-3 h-3" /> Encrypted by AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}