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
    <div className="min-h-screen bg-[#050806] text-white font-sans selection:bg-[#00D26A] selection:text-black overflow-x-hidden">
      <main className="relative z-10 pt-32">
        <section className="container mx-auto px-6 max-w-7xl pb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            DEFYING GEOGRAPHY: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D26A] to-[#008f48]">
              YOUR TALENT HAS NO LIMITS.
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
            Prove your talent to the world using only your smartphone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-[#00D26A] text-black font-bold px-8 py-4 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 text-center">
              Create Your Profile — Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}