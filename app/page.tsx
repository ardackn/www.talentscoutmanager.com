"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Shield, Dna, Activity, CheckCircle2, Video } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LIVE_ACTIVITY = [
  { id: 1, name: 'D. Okafor', pos: 'ST', team: 'Bundesliga', score: 9.2, image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=150&h=150&fit=crop&q=80' },
  { id: 2, name: 'L. Vargas', pos: 'AMF', team: 'Premier LG', score: 8.4, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80' },
  { id: 3, name: 'T. Adeyemi', pos: 'LWF', team: 'Serie A', score: 8.9, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80' },
  { id: 4, name: 'M. Kaya', pos: 'LB', team: 'Süper Lig', score: 7.8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80' },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // High Depth Parallax Effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const aboutY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#05050A] text-white font-sans selection:bg-[#10B981] selection:text-[#05050A] overflow-x-hidden">
      
      {/* 1. CLEAN NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#05050A]/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">TSM<span className="text-[#10B981]">.</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            <Link href="#who-we-are" className="text-[10px] tracking-[0.2em] uppercase font-black text-gray-400 hover:text-white transition-colors">Who We Are</Link>
            <Link href="#vision-mission" className="text-[10px] tracking-[0.2em] uppercase font-black text-gray-400 hover:text-white transition-colors">Vision / Mission</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-black text-gray-300 hover:text-white transition-all px-4 py-2">
              Login
            </Link>
            <Link href="/register" className="text-[10px] uppercase tracking-[0.2em] font-black bg-white text-[#05050A] px-6 py-3 rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HIGH DEPTH HERO SECTION */}
      <section className="relative min-h-[120vh] flex items-center pt-20 overflow-hidden perspective-[2000px]">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 scale-110 origin-bottom">
          <img src="https://images.unsplash.com/photo-1518005020250-6859493598c9?auto=format&fit=crop&q=80&w=2000" alt="DNA Football" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-transparent to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-20 items-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, z: -100, y: 50 }}
            animate={{ opacity: 1, z: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="pt-20"
          >
            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[10px] font-black tracking-[0.3em] text-[#10B981] uppercase mb-12 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Activity className="w-4 h-4 animate-pulse" />
              Bio-Genetics Meets AI
            </span>
            <h1 className="text-6xl md:text-[90px] font-black leading-[0.85] mb-12 tracking-tighter uppercase relative">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Human</span> <br />
              <span className="text-[#10B981] drop-shadow-[0_0_40px_rgba(16,185,129,0.4)] italic inline-block mt-2">Perception.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-16 max-w-xl leading-relaxed font-light">
              Experience the world's first bio-genetic AI scouting engine. We analyze movements, predict potential, and map the genetic blueprint of future champions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/register" className="group relative px-10 py-5 bg-[#10B981] text-[#05050A] font-black text-sm uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)]">
                <Video className="w-5 h-5" />
                <span className="relative z-10">Upload your video, get discovered instantly!</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Hologram Scout Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: -5 }}
            transition={{ duration: 1.5, delay: 0.3, type: "spring" }}
            className="relative hidden lg:block z-30"
          >
            <div className="bg-[#0A0A14]/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:rotate-y-0 transition-transform duration-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[100px] group-hover:bg-[#10B981]/20 transition-colors duration-1000 pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#10B981] font-black mb-2 flex items-center gap-2">
                    <Dna className="w-3 h-3" /> Holographic Analysis Active
                  </h4>
                  <h3 className="text-3xl font-black tracking-tight text-white">Live Metrics</h3>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {LIVE_ACTIVITY.map((player, idx) => (
                  <motion.div 
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.1) }}
                    className="flex items-center gap-6 p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/item hover:border-[#10B981]/30"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 relative">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-[#10B981]/20 mix-blend-overlay group-hover/item:opacity-0 transition-opacity"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white tracking-wide mb-2 text-lg">{player.name}</div>
                      <div className="flex gap-2">
                        <span className="text-[9px] text-[#05050A] bg-[#10B981] font-black uppercase tracking-widest px-2 py-1 rounded">{player.pos}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/10">{player.team}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black italic text-white group-hover/item:text-[#10B981] transition-colors">{player.score}</div>
                      <div className="text-[8px] uppercase tracking-[0.2em] text-gray-500">Match Score</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section id="who-we-are" className="py-40 relative z-20 bg-[#05050A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div style={{ y: aboutY }} className="relative rounded-[40px] overflow-hidden aspect-[4/5] border border-white/5 shadow-[0_0_100px_rgba(16,185,129,0.05)]">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" alt="Discovery Hologram" className="w-full h-full object-cover mix-blend-screen opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05050A] via-[#05050A]/50 to-transparent"></div>
            </motion.div>
            <div className="relative">
              <h3 className="text-[#10B981] font-black tracking-[0.4em] uppercase text-[10px] mb-8 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#10B981]"></span>
                Who We Are
              </h3>
              <h2 className="text-5xl md:text-[80px] font-black italic tracking-tighter uppercase mb-12 leading-[0.9]">
                The Architects <br/> of <span className="text-white/20">Tomorrow</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light max-w-lg">
                We are a collective of data scientists, bio-geneticists, and elite football scouts. We don't just watch the game; we decode the very fabric of athletic potential.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-5xl font-black text-white mb-3 tracking-tighter">99.8%</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-white mb-3 tracking-tighter">10k+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">DNA Profiles Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section id="vision-mission" className="py-40 bg-[#0A0A14] border-y border-white/5 relative z-30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* Vision */}
            <motion.div style={{ y: imageY }} className="group relative p-16 rounded-[50px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-[#10B981]/30 min-h-[600px] flex flex-col justify-end">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-105">
                <img src="/images/vision_future_football.png" alt="Vision" className="w-full h-full object-cover mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#10B981] font-black tracking-[0.3em] uppercase text-[10px] mb-6">Our Vision</h3>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">A World Without <br/> Hidden Talent</h2>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  To create a global ecosystem where geographical boundaries are erased by artificial intelligence, ensuring every talented individual gets discovered based on their pure genetic and mechanical metrics.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <div className="group relative p-16 rounded-[50px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-white/30 min-h-[600px] flex flex-col justify-end mt-10 lg:mt-20">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-105">
                <img src="/images/mission_global_network.png" alt="Mission" className="w-full h-full object-cover mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-black tracking-[0.3em] uppercase text-[10px] mb-6">Our Mission</h3>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">Democratizing <br/> Sports Data</h2>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  To provide scouts and clubs with the most advanced bio-genetic AI analysis tools, turning raw video data into actionable, deeply analytical intelligence that powers the future of sports transfers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICING CARDS (Readdy Style) */}
      <section className="py-40 relative z-40 bg-[#05050A] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <h3 className="text-[#10B981] font-black tracking-[0.4em] uppercase text-[10px] mb-6">Access Tiers</h3>
            <h2 className="text-5xl md:text-[80px] font-black italic tracking-tighter uppercase leading-none mb-8">Choose Your <br/> <span className="text-white/20">Protocol</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Scout Free */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#0A0A14] border border-white/5 hover:border-white/20 transition-all group hover:-translate-y-2">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Scout Free</h2>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Basic neural connection</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-6xl font-black text-white italic">$0</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Basic Genetic Talent Access
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-red-500/10 text-red-500">✗</span> No Advanced Filtering
                </li>
              </ul>
              <Link href="/register" className="w-full py-4 text-center font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all border border-white/20 group-hover:bg-white group-hover:text-black">
                Initiate
              </Link>
            </div>

            {/* Premium Scout */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#05050A] border-2 border-[#10B981] shadow-[0_0_50px_rgba(16,185,129,0.15)] transform scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#10B981] text-[#05050A] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Most Optimal
              </div>
              <div className="mb-8 mt-4">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Premium Scout</h2>
                <p className="text-[#10B981] text-xs uppercase tracking-widest font-bold">For serious discovery</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-6xl font-black text-white italic">$25</span>
                  <span className="text-gray-500 mb-2 font-bold uppercase text-[10px] tracking-widest">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Advanced Bio-metric Filter</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Direct Subject Comms</li>
              </ul>
              <Link href="/pricing" className="w-full py-4 text-center font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 bg-[#10B981] text-[#05050A] shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                Upgrade Now
              </Link>
            </div>

            {/* Gold Scout */}
            <div className="rounded-[40px] p-10 flex flex-col relative bg-[#0A0A14] border border-blue-500/50 hover:border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all group hover:-translate-y-2">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Gold Scout</h2>
                <p className="text-blue-500 text-xs uppercase tracking-widest font-bold">Full systematic override</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-6xl font-black text-white italic">$50</span>
                  <span className="text-gray-500 mb-2 font-bold uppercase text-[10px] tracking-widest">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Unlimited Global Search</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-blue-500" /> AI Match Predictor</li>
              </ul>
              <Link href="/pricing" className="w-full py-4 text-center font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:scale-105">
                Unlock Apex
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-[#05050A] relative z-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <span className="text-4xl font-black tracking-tighter text-white mb-8 block">TSM<span className="text-[#10B981]">.</span></span>
              <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-light">
                The global intersection of athletic potential and artificial intelligence. We redefine scouting.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/pricing" className="text-gray-500 hover:text-[#10B981] transition-colors text-xs font-black uppercase tracking-widest">Pricing</Link></li>
                <li><Link href="/register" className="text-gray-500 hover:text-[#10B981] transition-colors text-xs font-black uppercase tracking-widest">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-gray-500 hover:text-[#10B981] transition-colors text-xs font-black uppercase tracking-widest">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-[#10B981] transition-colors text-xs font-black uppercase tracking-widest">Terms of Use</Link></li>
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