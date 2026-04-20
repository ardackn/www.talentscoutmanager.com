"use client"

import Image from 'next/image'
import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { talents as topTalents } from '@/lib/talent-data';
import PricingSection from '@/components/sections/Pricing';


export default function HomePage() {
  const statsRef = useRef(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [athleteCount, setAthleteCount] = useState(0);
  const [scoutCount, setScoutCount] = useState(0);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setIsLoadingStats(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isStatsInView && !isLoadingStats) {
      const duration = 2000;
      const startAthlete = Date.now();
      const intervalAthlete = setInterval(() => {
        const elapsed = Date.now() - startAthlete;
        const progress = Math.min(elapsed / duration, 1);
        setAthleteCount(Math.floor(progress * 10000));
        if (progress >= 1) clearInterval(intervalAthlete);
      }, 16);

      const startScout = Date.now();
      const intervalScout = setInterval(() => {
        const elapsed = Date.now() - startScout;
        const progress = Math.min(elapsed / duration, 1);
        setScoutCount(Math.floor(progress * 2000));
        if (progress >= 1) clearInterval(intervalScout);
      }, 16);
    }
  }, [isStatsInView, isLoadingStats]);

  const howItWorksCards = [
    {
      icon: '📱',
      title: '01 Upload Video', 
      description: 'Record 60s highlight from your phone. Upload instantly worldwide.'
    },
    {
      icon: '🤖',
      title: '02 AI Analysis',
      description: 'GPT-4o scores speed, technique, intelligence & potential.'
    },
    {
      icon: '🔍',
      title: '03 Get Discovered',
      description: 'Pro scouts worldwide find you through advanced filters.'
    },
    {
      icon: '⭐',
      title: '04 Pro Scout Access', 
      description: 'Connect directly with elite scouts & agencies globally.'
    }
  ];


  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-black bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent font-clash">
              TSM.
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/scout/overview" className="font-semibold text-slate-300 hover:text-white transition-colors font-dm">
                Scouts
              </a>
              <a href="/athlete/dashboard" className="font-semibold text-slate-300 hover:text-white transition-colors font-dm">
                Athletes
              </a>
              <a href="#pricing" className="font-semibold text-slate-300 hover:text-white transition-colors font-dm">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-[var(--red-primary)] to-red-500 rounded-2xl hover:from-red-500 transition-all backdrop-blur-sm border border-white/20 font-dm"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen text-white overflow-hidden">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          >
            <source src="/v1.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />


          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto text-center"
            style={{ position: 'relative', zIndex: 2 }}
          >
            <motion.h1 
              className="font-clash text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight mb-8 bg-gradient-to-r from-[var(--red-primary)] via-red-400 to-[var(--gold-primary)] bg-clip-text text-transparent drop-shadow-2xl tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              GEOGRAPHY IS NO LONGER DESTINY
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed backdrop-blur-sm font-dm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover elite talent anywhere in the world. 
              <br className="hidden lg:inline" />
              <span className="font-semibold text-[var(--gold-primary)]">AI-powered scouting platform.</span>
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/athlete/dashboard"
                className="px-12 py-7 text-xl font-bold bg-gradient-to-r from-[var(--red-primary)] to-red-500 text-white rounded-3xl font-clash hover:from-red-500 hover:shadow-2xl hover:shadow-[var(--red-primary)]/25 transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl border border-white/20 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                🎯 Join as Athlete
              </motion.a>
              <motion.a
                href="/scout/overview"
                className="px-12 py-7 text-xl font-bold bg-white/10 backdrop-blur-xl text-white rounded-3xl font-clash hover:bg-white/20 border border-white/20 hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                🔍 Start Scouting
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* PRICING */}
        <PricingSection />
        
        {/* STATS */}
        <section ref={statsRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[var(--red-primary)]/3 to-[var(--gold-primary)]/3 backdrop-blur-xl border-b border-white/10">

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {isLoadingStats ? (
              <div className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="skeleton-shimmer h-20 w-32 mx-auto mb-6 rounded-2xl" />
                <div className="skeleton-shimmer h-6 w-40 mx-auto mb-2" />
                <div className="skeleton-shimmer h-4 w-24 mx-auto" />
              </div>
            ) : (
              <motion.div 
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--red-primary)]/50 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-[var(--red-primary)] to-red-400 bg-clip-text text-transparent mb-4 font-clash">
                  {athleteCount.toLocaleString()}
                </motion.div>
                <div className="text-slate-300 text-lg font-semibold font-dm">Athletes Worldwide</div>
                <div className="text-sm text-slate-400 mt-2">Verified Profiles</div>
              </motion.div>
            )}

            <motion.div 
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--gold-primary)]/50 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <motion.div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-[var(--gold-primary)] to-yellow-400 bg-clip-text text-transparent mb-4 font-clash">
                {scoutCount.toLocaleString()}
              </motion.div>
              <div className="text-slate-300 text-lg font-semibold font-dm">Active Scouts</div>
              <div className="text-sm text-slate-400 mt-2">Pro Agencies & Clubs</div>
            </motion.div>

            <motion.div 
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="text-5xl lg:text-6xl font-black text-purple-400 mb-4 font-clash">500+</div>
              <div className="text-slate-300 text-lg font-semibold font-dm">Countries Covered</div>
              <div className="text-sm text-slate-400 mt-2">Global Network</div>
            </motion.div>

            <motion.div 
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="text-5xl lg:text-6xl font-black text-blue-400 mb-4 font-clash">10K+</div>
              <div className="text-slate-300 text-lg font-semibold font-dm">AI Analysis Runs</div>
              <div className="text-sm text-slate-400 mt-2">Videos Processed</div>
            </motion.div>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl mx-auto text-center mb-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.h2 className="font-clash text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text" whileInView={{ scale: 1.05 }} viewport={{ once: true }}>
              How It Works
            </motion.h2>
            <motion.p className="text-2xl text-slate-400 font-dm" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }}>
              3 simple steps from video to discovery
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {howItWorksCards.map((card, index) => (
              <motion.div 
                key={card.title}
                className="group text-center p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--red-primary)]/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-[var(--red-primary)]/20 hover:-translate-y-4 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateX: 5 }}
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl group-hover:bg-[var(--red-primary)]/30 group-hover:scale-110 transition-all duration-300 mx-auto"
                  whileHover={{ scale: 1.1 }}
                >
                  {card.icon}
                </motion.div>
                <motion.h3 className="font-clash text-3xl font-black mb-6 group-hover:text-[var(--red-primary)] transition-colors">{card.title}</motion.h3>
                <motion.p className="text-slate-300 text-lg font-dm leading-relaxed group-hover:text-slate-200 transition-colors">{card.description}</motion.p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURED ATHLETES */}
        <section id="talents" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/3 backdrop-blur-sm">
          <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="text-center mb-20">
              <motion.h2 className="font-clash text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text" whileInView={{ scale: 1.05 }} viewport={{ once: true }}>
                ⭐ Featured Athletes
              </motion.h2>
              <motion.p className="text-2xl text-slate-400 font-dm" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }}>
                Rising stars waiting to be discovered
              </motion.p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 animate-pulse"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <div className="skeleton-shimmer h-48 w-full rounded-2xl" />
                    <div className="absolute top-4 right-4">
                      <div className="skeleton-shimmer h-8 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="skeleton-shimmer h-8 w-48 rounded-xl" />
                    <div className="skeleton-shimmer h-5 w-32 rounded-lg mt-2" />
                    <div className="skeleton-shimmer h-4 w-24 rounded mt-1" />
                  </div>
                  <div className="skeleton-shimmer h-12 w-full rounded-2xl" />
                </div>
              ))}
              {topTalents.slice(0, 6).map((talent, index) => (
                <motion.div 
                  key={`real-${talent.id}`} 
                  className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-[var(--red-primary)]/20 hover:-translate-y-4 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <Image 
                      src={`https://i.pravatar.cc/300?u=${talent.id}`} 
                      alt={talent.name}
                      width={300}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[var(--red-primary)]/90 text-white text-sm font-bold rounded-full font-clash">{talent.aiScore}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xl font-black group-hover:text-[var(--red-primary)] transition-colors font-clash">{talent.name}</h4>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-dm">
                      <span>{talent.country}</span>
                      <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                      <span>{talent.position}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-dm">{talent.age}yo | {talent.height}</div>
                  </div>
                  <motion.a 
                    href="/scout/overview"
                    className="w-full block rounded-2xl bg-gradient-to-r from-[var(--red-primary)] to-red-500 py-4 px-6 font-bold text-white text-center font-clash hover:from-red-500 hover:shadow-lg hover:shadow-[var(--red-primary)]/25 transition-all backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Profile →
                  </motion.a>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <motion.a
                href="/scout/overview"
                className="inline-block px-16 py-8 text-2xl font-bold bg-gradient-to-r from-[var(--red-primary)] to-red-500 rounded-3xl font-clash hover:from-red-500 hover:shadow-2xl hover:shadow-[var(--red-primary)]/25 transform hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover All Athletes
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--red-primary)]/5 to-[var(--gold-primary)]/5 backdrop-blur-sm"></div>
          <motion.div className="relative max-w-4xl mx-auto" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <motion.h2 className="font-clash text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl" whileInView={{ scale: 1.05 }} viewport={{ once: true }}>
              🚀 Your Next Star Awaits
            </motion.h2>
            <motion.p className="text-2xl text-slate-300 mb-12 font-dm" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }}>
              Join thousands already making global discovery possible.
            </motion.p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
              <motion.a
                href="/athlete/dashboard"
                className="flex-1 py-10 px-16 text-2xl font-black bg-gradient-to-r from-[var(--red-primary)] to-red-500 text-white rounded-3xl font-clash hover:from-red-500 hover:shadow-2xl hover:shadow-[var(--red-primary)]/30 transform hover:-translate-y-3 transition-all duration-300 text-center shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                🎯 I'm an Athlete
              </motion.a>
              <motion.a
                href="/scout/overview"
                className="flex-1 py-10 px-16 text-2xl font-bold bg-white/10 backdrop-blur-xl text-white rounded-3xl border border-white/20 font-clash hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-3 transition-all duration-300 text-center shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                🔍 I'm a Scout
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)]/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              <div>
                <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-[var(--red-primary)] to-[var(--gold-primary)] bg-clip-text font-clash">TSM.</h3>
                <p className="text-slate-500 mb-8 max-w-md font-dm">Global talent discovery. AI-powered. Built for the beautiful game.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 text-slate-300 font-dm">Product</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a href="/scout/overview" className="hover:text-white transition-colors font-dm">Scout Platform</a></li>
                  <li><a href="/athlete/dashboard" className="hover:text-white transition-colors font-dm">Athlete Portal</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors font-dm">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 text-slate-300 font-dm">Company</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-white transition-colors font-dm">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors font-dm">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors font-dm">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 text-slate-300 font-dm">Contact</h4>
                <p className="text-slate-500 mb-4 font-dm">hello@talentscoutmanager.com</p>
                <div className="text-xs text-slate-600 font-dm">
                  Legal • Privacy • Terms • Cookie Policy • GDPR
                </div>
              </div>
            </div>
            <div className="pt-12 mt-12 border-t border-white/10 text-center text-slate-600 text-sm font-dm">
              © 2025 Talent Scout Manager. All rights reserved. Made with ❤️ for beautiful game.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
