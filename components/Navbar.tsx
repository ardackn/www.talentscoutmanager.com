"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from '@/hooks/use-session'
import { UserMenu } from '@/components/UserMenu'

export default function Navbar() {
  const { session, loading } = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#050806]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="w-32 h-8 bg-white/10 rounded-xl animate-pulse" />
          <div className="hidden md:flex gap-4"><div className="w-20 h-6 bg-white/10 rounded-md animate-pulse" /></div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050806]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#00D26A] font-black text-2xl tracking-tighter">TSM</span>
          <span className="text-white/70 font-semibold text-xs tracking-widest uppercase mt-1 hidden sm:inline-block">PLATFORM</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/about" className="hover:text-white transition-colors">Biz Kimiz</Link>
          <Link href="/#solutions" className="hover:text-white transition-colors">Herkes İçin Çözüm</Link>
          <Link href="#contact" className="hover:text-white transition-colors">İletişim</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link>
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:inline-block">Giriş Yap</Link>
              <Link href="/register" className="bg-[#00D26A] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#00e676] transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,210,106,0.3)]">
                Kayıt Ol
              </Link>
            </>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>
    </nav>
  )
}
