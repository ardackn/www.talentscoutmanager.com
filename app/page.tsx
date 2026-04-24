'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#050806] text-white font-sans selection:bg-[#00D26A] selection:text-black overflow-x-hidden">
      {/* BACKGROUND VIDEO (As requested previously, placed behind hero) */}
      <div className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none mix-blend-screen">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      </div>

      <main className="relative z-10 pt-32">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 max-w-7xl pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-xs font-semibold mb-8">
                <div className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse" />
                AI Powered Talent Discovery - Early Access
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
                DEFYING GEOGRAPHY: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D26A] to-[#008f48]">
                  YOUR TALENT HAS NO LIMITS.
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
                Prove your talent to the world using only your smartphone. Whether football or basketball — upload your video, let our advanced AI extract your performance metrics. Scouts from your dream clubs are now just one click away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register" className="bg-[#00D26A] text-black font-bold px-8 py-4 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 text-center shadow-[0_0_20px_rgba(0,210,106,0.2)]">
                  Create Your Profile — Free
                </Link>
                <Link href="/login" className="px-8 py-4 rounded-full font-bold text-white border border-white/10 hover:bg-white/5 transition-colors text-center flex items-center justify-center gap-2">
                  Scout Login
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2"><strong className="text-white text-base">1,148</strong> active players</div>
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className="flex items-center gap-2"><strong className="text-white text-base">47</strong> countries</div>
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className="flex items-center gap-2"><strong className="text-white text-base">500+</strong> clubs</div>
              </div>
            </div>

            <div className="relative">
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00D26A]/20 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative bg-[#0A100C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop" 
                  alt="Player Celebrating" 
                  className="w-full h-[600px] object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                
                {/* AI Score Badge overlay */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00D26A]/20 flex items-center justify-center border border-[#00D26A]/30">
                    <svg className="w-5 h-5 text-[#00D26A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AI Score</div>
                    <div className="text-xl font-black text-white">84.6</div>
                  </div>
                </div>

                {/* Scout overlay */}
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-[#00D26A]/30 rounded-full px-5 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse" />
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">Scout Interest</div>
                    <div className="text-sm font-bold text-white">1 scout watching</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITY TICKER SECTION */}
        <section className="border-y border-white/5 bg-black/20 py-8 overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl flex gap-8">
            <div className="min-w-max flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#00D26A] text-xs font-bold uppercase tracking-widest mb-1">
                <div className="w-2 h-2 rounded-full bg-[#00D26A]" /> LIVE PLATFORM ACTIVITY
              </div>
              <div className="text-gray-500 text-xs">Updates in real time</div>
            </div>
            
            <div className="flex space-x-4 animate-[marquee_20s_linear_infinite]">
               {/* Ticker items */}
               {[
                 { name: 'Alperen Aktaş', pos: 'Striker', time: '2 min ago', score: 84 },
                 { name: 'Can Demir', pos: 'Midfielder', time: '14 min ago', score: 76 },
                 { name: 'Ismail Kara', pos: 'Defender', time: '1 hr ago', score: 88 },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 bg-[#0A100C] border border-white/5 rounded-xl p-3 min-w-[240px]">
                   <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                     {item.name.charAt(0)}
                   </div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-white">{item.name}</div>
                     <div className="text-[10px] text-gray-500">{item.pos} • {item.time}</div>
                   </div>
                   <div className="text-[#00D26A] font-black">{item.score}</div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* GLOBAL BRIDGE SECTION */}
        <section className="py-32 container mx-auto px-6 max-w-7xl text-center">
          <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">What is TSM?</div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            THE GLOBAL BRIDGE BETWEEN<br />
            <span className="text-[#00D26A]">TALENT AND OPPORTUNITY</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-16">
            Talent Scout Manager (TSM) is the world's first AI-powered global football talent discovery platform. We eliminate the geographical barriers that have prevented talented young players from emerging markets from being seen by top professional clubs.
          </p>
          
          {/* Map placeholder */}
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-20 mb-16" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            <div><div className="text-4xl font-black text-white mb-2">47</div><div className="text-sm text-gray-500 uppercase tracking-wider">Countries</div></div>
            <div><div className="text-4xl font-black text-white mb-2">500+</div><div className="text-sm text-gray-500 uppercase tracking-wider">Clubs</div></div>
            <div><div className="text-4xl font-black text-white mb-2">6</div><div className="text-sm text-gray-500 uppercase tracking-wider">Continents</div></div>
            <div><div className="text-4xl font-black text-[#00D26A] mb-2">1</div><div className="text-sm text-gray-500 uppercase tracking-wider">Platform</div></div>
          </div>
        </section>

        {/* WHY REGISTER */}
        <section className="py-24 bg-[#0A100C] border-y border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">Why Register?</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                6 REASONS WHY TSM<br />
                <span className="text-[#00D26A]">CHANGES EVERYTHING</span>
              </h2>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-16 h-[400px]">
              <img src="https://images.unsplash.com/photo-1518605368461-1ee7e53f063e?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Kids playing football" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="text-[#00D26A] text-xs font-bold tracking-widest uppercase mb-2">The New Reality</div>
                <h3 className="text-4xl md:text-5xl font-black text-white max-w-xl leading-tight">
                  Show your talent on your phone.<br/>
                  <span className="text-[#00D26A]">Get spotted by the world.</span>
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'All You Need is a Phone', desc: 'No expensive equipment, no travel, no gatekeepers. Record your performance with your smartphone and upload it in minutes.', stat: '2 minutes', statLabel: 'to go live' },
                { title: 'Reach Clubs in 47 Countries', desc: 'Your profile is instantly visible to scouts from Premier League, La Liga, Bundesliga, MLS, and hundreds of clubs.', stat: '500+', statLabel: 'partner clubs worldwide' },
                { title: 'AI Scores You Objectively', desc: 'Our AI analyzes your video and produces a standardized performance score covering speed, positioning, and activity.', stat: '94.2%', statLabel: 'scoring accuracy' },
                { title: 'Free to Start', desc: 'Creating your player profile costs nothing. Upload your video, get your AI score, and be discovered by scouts — completely free.', stat: '€0', statLabel: 'to create a player profile' },
                { title: 'Safe & Private', desc: 'Your personal data is encrypted and protected. You control who sees what. Your video is never shared with competitors.', stat: '100%', statLabel: 'data privacy' },
                { title: 'Trusted by Top Clubs', desc: 'Galatasaray, Fenerbahçe, Beşiktaş and hundreds of clubs across the world already use TSM to discover and track talent.', stat: '1,200+', statLabel: 'players discovered so far' },
              ].map((feature, i) => (
                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:bg-[#0A100C] transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#00D26A] group-hover:bg-[#00D26A]/10 transition-colors">
                      <i className="ri-check-line text-xl"></i>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#00D26A]">{feature.stat}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{feature.statLabel}</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-32 container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-16">
              <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">How it works</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                3 STEPS TO GET DISCOVERED<br />BY SCOUTS WORLDWIDE
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload Your Video', desc: 'Add your YouTube performance video to the platform. This is the core content scouts will use to evaluate you.', link: 'Upload now' },
                { step: '02', title: 'Get Your AI Score', desc: 'Our AI system analyzes your video and gives you a performance score covering activity, speed, and positioning.', link: 'See example score', active: true },
                { step: '03', title: 'Go Global', desc: 'Scouts and clubs worldwide see your profile, video, and score. Your opportunity comes to you — no matter where you are.', link: 'Create profile' },
              ].map((step, i) => (
                <div key={i} className={`p-8 rounded-3xl border ${step.active ? 'bg-[#00D26A]/5 border-[#00D26A]/30' : 'bg-transparent border-white/10'} relative overflow-hidden`}>
                  <div className="text-5xl font-black text-white/5 absolute -right-4 -top-4 select-none">{step.step}</div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold mb-6">
                    {step.step}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-gray-400 mb-8 leading-relaxed">{step.desc}</p>
                  <a href="#" className={`text-sm font-bold ${step.active ? 'text-[#00D26A]' : 'text-white/70 hover:text-white'} flex items-center gap-2`}>
                    {step.link} <i className="ri-arrow-right-line"></i>
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/register" className="inline-block bg-[#00D26A] text-black font-bold px-10 py-5 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,210,106,0.2)]">
                Create Your Profile Now →
              </Link>
              <div className="text-xs text-gray-500 mt-4">Free forever · No credit card · Ready in 2 minutes</div>
            </div>
        </section>

        {/* SCOUTS SECTION */}
        <section className="py-24 bg-[#050806] border-t border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">For Scouts & Clubs</div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  WHY SCOUTS USE<br />THIS PLATFORM
                </h2>
                <p className="text-gray-400 text-lg mb-10">
                  Stop wasting time on spreadsheets and scattered notes. TSM gives professional scouts one powerful hub to find, analyze, shortlist, and compare the world's best young talent.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                  {[
                    { icon: 'ri-database-2-line', title: 'Centralized Player Database', desc: 'All player data in one searchable place.' },
                    { icon: 'ri-filter-3-line', title: 'Smart Filters', desc: 'Filter by position, age, country, and score.' },
                    { icon: 'ri-scales-3-line', title: 'Side-by-Side Comparison', desc: 'Compare any two players in speed, positioning.' },
                    { icon: 'ri-folder-user-line', title: 'Personal Shortlist', desc: 'Save top players into your private shortlist.' },
                    { icon: 'ri-earth-line', title: 'Global Reach', desc: 'Scout players from 47 countries.' },
                    { icon: 'ri-brain-line', title: 'AI Performance Scores', desc: 'Objective baseline metric for every player.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-[#00D26A] text-xl mt-1"><i className={item.icon}></i></div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold px-6 py-3 rounded-full transition-colors">
                  <i className="ri-search-eye-line text-[#00D26A]"></i> Start Scouting Free
                </Link>
              </div>

              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00D26A]/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative bg-[#0A100C] border border-white/10 rounded-2xl p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Mockup Dashboard UI */}
                  <div className="w-full h-[400px] bg-[#050806] rounded-xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                      <div className="col-span-1 space-y-4">
                        <div className="h-24 bg-white/5 rounded-lg" />
                        <div className="h-32 bg-white/5 rounded-lg" />
                        <div className="h-16 bg-white/5 rounded-lg" />
                      </div>
                      <div className="col-span-2 space-y-4">
                        <div className="h-48 bg-[#00D26A]/10 border border-[#00D26A]/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <i className="ri-radar-line text-4xl text-[#00D26A] mb-2 opacity-50"></i>
                            <div className="text-sm font-bold text-white">Tracking Player Movement</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="h-24 bg-white/5 rounded-lg" />
                           <div className="h-24 bg-white/5 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO CAN USE IT */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20">
              <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">Who can use it?</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                ONE PLATFORM FOR<br />THE ENTIRE FOOTBALL ECOSYSTEM
              </h2>
            </div>

            <div className="space-y-8">
              {/* Role 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center bg-[#0A100C] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Scout" />
                </div>
                <div className="p-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                    <i className="ri-search-line"></i> Find the next big talent
                  </div>
                  <h3 className="text-3xl font-black mb-4">Scout</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Watch match footage, write detailed player reports, and discover the most talented prospects from 47 countries. Keep all your scouting notes digitally stored and shareable.
                  </p>
                  <div className="flex gap-4 text-sm font-bold text-[#00D26A]">
                    <span className="flex items-center gap-1"><i className="ri-check-line"></i> Report Writing</span>
                    <span className="flex items-center gap-1"><i className="ri-check-line"></i> Player Tracking</span>
                  </div>
                </div>
              </div>

              {/* Role 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center bg-[#0A100C] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
                <div className="p-4 order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                    <i className="ri-bar-chart-box-line"></i> Make data-driven decisions
                  </div>
                  <h3 className="text-3xl font-black mb-4">Club Manager / Director</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Review player evaluation reports, compare candidates side-by-side, and make confident transfer decisions backed by AI-generated performance data and video evidence.
                  </p>
                  <div className="flex gap-4 text-sm font-bold text-[#00D26A]">
                    <span className="flex items-center gap-1"><i className="ri-check-line"></i> Report Review</span>
                    <span className="flex items-center gap-1"><i className="ri-check-line"></i> Transfer Decisions</span>
                  </div>
                </div>
                <div className="h-64 rounded-2xl overflow-hidden order-1 md:order-2">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Manager" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
               <div className="text-[#00D26A] text-sm font-bold tracking-widest uppercase mb-4">Pricing</div>
               <h2 className="text-4xl md:text-5xl font-black mb-6">PLANS FOR EVERY BUDGET</h2>
               <p className="text-gray-400">Try free for 14 days — no credit card required.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="bg-[#0A100C] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-sm text-gray-500 mb-6">For small clubs and independent scouts</p>
                <div className="text-4xl font-black mb-8">49 €<span className="text-lg text-gray-500 font-medium">/month</span></div>
                <ul className="space-y-4 mb-8 text-sm text-gray-300">
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> 5 Scout accounts</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> 500 player profiles</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Basic reporting</li>
                </ul>
                <Link href="/register" className="block w-full py-3 rounded-xl border border-white/10 text-center font-bold hover:bg-white/5 transition-colors">
                  Try for free
                </Link>
              </div>

              {/* Professional */}
              <div className="bg-[#0A100C] border border-[#00D26A]/50 shadow-[0_0_30px_rgba(0,210,106,0.1)] rounded-3xl p-8 relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00D26A] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="text-xl font-bold mb-2 text-white">Professional</h3>
                <p className="text-sm text-gray-400 mb-6">For professional clubs and academies</p>
                <div className="text-4xl font-black mb-8 text-[#00D26A]">149 €<span className="text-lg text-gray-500 font-medium">/month</span></div>
                <ul className="space-y-4 mb-8 text-sm text-white">
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> 25 Scout accounts</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Unlimited player profiles</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Advanced analytics</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Transfer module</li>
                </ul>
                <Link href="/register" className="block w-full py-3 rounded-xl bg-[#00D26A] text-black text-center font-bold hover:bg-[#00e676] transition-colors">
                  Start with Pro
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-[#0A100C] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-sm text-gray-500 mb-6">For large clubs and federations</p>
                <div className="text-4xl font-black mb-8">349 €<span className="text-lg text-gray-500 font-medium">/month</span></div>
                <ul className="space-y-4 mb-8 text-sm text-gray-300">
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Unlimited scout accounts</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Full API access</li>
                  <li className="flex items-center gap-3"><i className="ri-check-line text-[#00D26A]"></i> Custom integrations</li>
                </ul>
                <Link href="/register" className="block w-full py-3 rounded-xl border border-white/10 text-center font-bold hover:bg-white/5 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-32 text-center bg-gradient-to-b from-transparent to-[#0A100C]">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-[#00D26A] text-sm font-bold mb-4 flex items-center justify-center gap-2">
              <i className="ri-lock-unlock-line"></i> Free. Ready in 2 minutes. Get discovered by scouts.
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Create Your Profile Now,<br/>
              <span className="text-[#00D26A]">Be Seen By The World</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Show your talent on your phone, get your AI score, and get on the radar of hundreds of scouts across 6 continents.
            </p>
            <Link href="/register" className="inline-block bg-[#00D26A] text-black font-bold px-12 py-5 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(0,210,106,0.3)] text-lg">
              Create Free Profile →
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}