"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Shield, Dna, Activity, CheckCircle2, Video, User, Search } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // High Depth Parallax Effects
  const aboutY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white font-sans selection:bg-[#10B981] selection:text-[#05050A] overflow-x-hidden">
      
      {/* 1. NAVBAR (Logo Left, Links Center, Buttons Right) */}
      {/* Removed the background stripe so it's always transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-700">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          {/* Logo Left - Removed TSM text */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src="/data/logo.png" 
              alt="TSM Logo" 
              className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            />
          </div>
          
          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollTo('who-we-are')} className="text-[11px] tracking-[0.15em] uppercase font-bold text-gray-300 hover:text-white transition-colors">Who We Are</button>
            <button onClick={() => scrollTo('vision-mission')} className="text-[11px] tracking-[0.15em] uppercase font-bold text-gray-300 hover:text-white transition-colors">Vision / Mission</button>
            <button onClick={() => scrollTo('pricing')} className="text-[11px] tracking-[0.15em] uppercase font-bold text-gray-300 hover:text-white transition-colors">Pricing</button>
            <Link href="/discovery" className="text-[11px] tracking-[0.15em] uppercase font-black text-[#10B981] hover:text-white transition-colors flex items-center gap-1">
               <Dna className="w-3 h-3"/> Discovery Grid
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] font-black bg-[#10B981] text-[#05050A] px-5 py-2.5 rounded-lg hover:bg-[#0e9f6e] transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <User className="w-4 h-4" /> Player Login
            </Link>
            <Link href="/scout-register" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] font-black bg-[#F59E0B] text-[#05050A] px-5 py-2.5 rounded-lg hover:bg-[#d97706] transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Search className="w-4 h-4" /> Scout Login
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HIGH DEPTH HERO SECTION */}
      <section className="relative min-h-[110vh] flex items-center pt-20 overflow-hidden perspective-[2000px]">
        {/* Parallax Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105 pointer-events-none"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center text-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, z: -100, y: 50 }}
            animate={{ opacity: 1, z: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[10px] font-black tracking-[0.3em] text-[#10B981] uppercase mb-12 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Activity className="w-4 h-4 animate-pulse" />
              Bio-Genetics Meets AI
            </span>
            <h1 className="text-5xl md:text-[80px] lg:text-[100px] font-black leading-[0.85] mb-12 tracking-tighter uppercase relative drop-shadow-2xl">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Human</span> <br />
              <span className="text-[#10B981] drop-shadow-[0_0_40px_rgba(16,185,129,0.4)] italic inline-block mt-2">Perception.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl leading-relaxed font-light px-4">
              Experience the world's first bio-genetic AI scouting engine. We analyze movements, predict potential, and map the genetic blueprint of future champions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/register" className="group relative px-8 py-5 bg-[#10B981] text-[#05050A] font-black text-xs md:text-sm uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)]">
                <Video className="w-5 h-5" />
                <span className="relative z-10">Upload your video, get discovered instantly!</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-16 animate-bounce">
               <button onClick={() => scrollTo('who-we-are')} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                  ↓
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section id="who-we-are" className="py-20 md:py-40 relative z-20 bg-[#05050A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div style={{ y: aboutY }} className="relative rounded-[40px] overflow-hidden aspect-[4/5] md:aspect-square border border-white/5 shadow-[0_0_100px_rgba(16,185,129,0.05)] order-2 lg:order-1">
              {/* Using the new architects image uploaded by user */}
              <img src="/images/architects.png" alt="Bio-genetic DNA Map" className="w-full h-full object-cover mix-blend-screen opacity-90 hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05050A] via-[#05050A]/30 to-transparent"></div>
            </motion.div>
            <div className="relative order-1 lg:order-2">
              <h3 className="text-[#10B981] font-black tracking-[0.4em] uppercase text-[10px] mb-8 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#10B981]"></span>
                Who We Are
              </h3>
              <h2 className="text-4xl md:text-[60px] lg:text-[80px] font-black italic tracking-tighter uppercase mb-8 md:mb-12 leading-[0.9]">
                The Architects <br/> of <span className="text-white/20">Tomorrow</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-lg">
                We are a collective of data scientists, bio-geneticists, and elite football scouts. We don't just watch the game; we decode the very fabric of athletic potential.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">99.8%</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">10k+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">DNA Profiles Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section id="vision-mission" className="py-20 md:py-40 bg-[#0A0A14] border-y border-white/5 relative z-30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* Vision */}
            <motion.div style={{ y: imageY }} className="group relative p-10 md:p-16 rounded-[40px] md:rounded-[50px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-[#10B981]/30 min-h-[400px] md:min-h-[600px] flex flex-col justify-end">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-105">
                <img src="/images/vision_future_football.png" alt="Vision" className="w-full h-full object-cover mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#10B981] font-black tracking-[0.3em] uppercase text-[10px] mb-6">Our Vision</h3>
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">A World Without <br/> Hidden Talent</h2>
                <p className="text-gray-400 leading-relaxed font-light text-sm md:text-lg">
                  To create a global ecosystem where geographical boundaries are erased by artificial intelligence, ensuring every talented individual gets discovered based on their pure genetic and mechanical metrics.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <div className="group relative p-10 md:p-16 rounded-[40px] md:rounded-[50px] bg-[#05050A] border border-white/5 overflow-hidden transition-all hover:border-white/30 min-h-[400px] md:min-h-[600px] flex flex-col justify-end mt-10 lg:mt-20">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-105">
                <img src="/images/mission_global_network.png" alt="Mission" className="w-full h-full object-cover mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-black tracking-[0.3em] uppercase text-[10px] mb-6">Our Mission</h3>
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">Democratizing <br/> Sports Data</h2>
                <p className="text-gray-400 leading-relaxed font-light text-sm md:text-lg">
                  To provide scouts and clubs with the most advanced bio-genetic AI analysis tools, turning raw video data into actionable, deeply analytical intelligence that powers the future of sports transfers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICING CARDS (Readdy Style) */}
      <section id="pricing" className="py-20 md:py-40 relative z-40 bg-[#05050A] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h3 className="text-[#10B981] font-black tracking-[0.4em] uppercase text-[10px] mb-6">Access Tiers</h3>
            <h2 className="text-4xl md:text-[80px] font-black italic tracking-tighter uppercase leading-none mb-8">Choose Your <br/> <span className="text-white/20">Protocol</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Scout Free */}
            <div className="rounded-[40px] p-8 md:p-10 flex flex-col relative bg-[#0A0A14] border border-white/5 hover:border-white/20 transition-all group hover:-translate-y-2">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Scout Free</h2>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">Basic neural connection</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-5xl md:text-6xl font-black text-white italic">$0</span>
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
              <Link href="/register" className="w-full py-4 text-center font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full transition-all border border-white/20 group-hover:bg-white group-hover:text-black">
                Initiate
              </Link>
            </div>

            {/* Premium Scout */}
            <div className="rounded-[40px] p-8 md:p-10 flex flex-col relative bg-[#05050A] border-2 border-[#10B981] shadow-[0_0_50px_rgba(16,185,129,0.15)] transform md:scale-105 z-10 mt-8 md:mt-0">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#10B981] text-[#05050A] shadow-[0_0_20px_rgba(16,185,129,0.5)] whitespace-nowrap">
                Most Optimal
              </div>
              <div className="mb-8 mt-4">
                <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Premium Scout</h2>
                <p className="text-[#10B981] text-[10px] md:text-xs uppercase tracking-widest font-bold">For serious discovery</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-5xl md:text-6xl font-black text-white italic">$25</span>
                  <span className="text-gray-500 mb-2 font-bold uppercase text-[10px] tracking-widest">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Advanced Bio-metric Filter</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Direct Subject Comms</li>
              </ul>
              <Link href="/pricing" className="w-full py-4 text-center font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 bg-[#10B981] text-[#05050A] shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                Upgrade Now
              </Link>
            </div>

            {/* Gold Scout */}
            <div className="rounded-[40px] p-8 md:p-10 flex flex-col relative bg-[#0A0A14] border border-blue-500/50 hover:border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all group hover:-translate-y-2 mt-8 md:mt-0">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">Gold Scout</h2>
                <p className="text-blue-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">Full systematic override</p>
                <div className="flex items-end gap-1 mt-8">
                  <span className="text-5xl md:text-6xl font-black text-white italic">$50</span>
                  <span className="text-gray-500 mb-2 font-bold uppercase text-[10px] tracking-widest">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm font-medium">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Unlimited Global Search</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-blue-500" /> AI Match Predictor</li>
              </ul>
              <Link href="/pricing" className="w-full py-4 text-center font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full transition-all bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:scale-105">
                Unlock Apex
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-20 md:py-24 border-t border-white/5 bg-[#05050A] relative z-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="col-span-2">
              <img src="/data/logo.png" alt="TSM Logo" className="h-10 w-auto mb-6 opacity-80" />
              <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-light text-sm md:text-base">
                The global intersection of athletic potential and artificial intelligence. We redefine scouting.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/pricing" className="text-gray-500 hover:text-[#10B981] transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">Pricing</Link></li>
                <li><Link href="/register" className="text-gray-500 hover:text-[#10B981] transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">Register</Link></li>
                <li><Link href="/discovery" className="text-gray-500 hover:text-[#10B981] transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">Discovery Grid</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-gray-500 hover:text-[#10B981] transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-[#10B981] transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold text-center md:text-left">© 2026 Talent Scout Manager. Genetic Data Secured.</p>
            <div className="flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
              <Shield className="w-3 h-3" /> Encrypted by AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}