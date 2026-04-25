"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-[#050806] text-white font-sans selection:bg-[#00D26A] selection:text-black overflow-x-hidden relative">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/80 via-transparent to-[#050806]"></div>
      </div>

      <main className="relative z-10 pt-32">
        <section className="container mx-auto px-6 max-w-7xl pb-24 text-center mt-20">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
            DEFYING GEOGRAPHY: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D26A] to-[#008f48]">
              YOUR TALENT HAS NO LIMITS.
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-lg mx-auto leading-relaxed drop-shadow-md">
            Prove your talent to the world using only your smartphone. AI-powered football scouting platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-[#00D26A] text-black font-bold px-8 py-4 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 text-center shadow-[0_0_20px_rgba(0,210,106,0.4)]">
              Create Your Profile — Free
            </Link>
            <Link href="/pricing" className="bg-transparent border-2 border-[#00D26A] text-[#00D26A] font-bold px-8 py-4 rounded-full hover:bg-[#00D26A]/10 transition-colors text-center">
              View Scout Plans
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}