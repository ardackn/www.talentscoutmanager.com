"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from '@/hooks/use-session'
import { UserMenu } from '@/components/UserMenu'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { session, loading } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-[#0d1b2a]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="w-32 h-8 bg-white/10 rounded-xl animate-pulse" />
          <div className="hidden md:flex gap-4"><div className="w-20 h-6 bg-white/10 rounded-md animate-pulse" /></div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1b2a]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-[#0d1b2a]/80 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/data/logo.png" alt="TSM Logo" className="h-16 w-auto" />
          <span className="text-white font-bold text-[22px] tracking-tight">TSM</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/about" className="hover:text-white transition-colors">Biz Kimiz</Link>
          <Link href="/#solutions" className="hover:text-white transition-colors">Herkes İçin Çözüm</Link>
          <Link href="#contact" className="hover:text-white transition-colors">İletişim</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/player-login"
                className="hidden sm:inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg text-[#0d1b2a] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,204,0.5)]"
                style={{ backgroundColor: '#00e5cc', borderRadius: '8px' }}
              >
                ⚽ Oyuncu Girişi
              </Link>
              <Link
                href="/scout-login"
                className="hidden sm:inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg text-[#0d1b2a] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(245,166,35,0.5)]"
                style={{ backgroundColor: '#f5a623', borderRadius: '8px' }}
              >
                🔍 İzci Girişi
              </Link>
              {/* Mobile burger */}
              <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && !session && (
        <div className="md:hidden bg-[#0d1b2a] border-t border-white/10 px-6 py-4 space-y-3">
          <Link href="/about" className="block text-gray-300 hover:text-white py-2">Biz Kimiz</Link>
          <Link href="/#solutions" className="block text-gray-300 hover:text-white py-2">Herkes İçin Çözüm</Link>
          <Link href="/pricing" className="block text-gray-300 hover:text-white py-2">Fiyatlandırma</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/player-login" className="flex-1 text-center font-bold text-sm py-3 rounded-lg text-[#0d1b2a]" style={{ backgroundColor: '#00e5cc' }}>
              ⚽ Oyuncu Girişi
            </Link>
            <Link href="/scout-login" className="flex-1 text-center font-bold text-sm py-3 rounded-lg text-[#0d1b2a]" style={{ backgroundColor: '#f5a623' }}>
              🔍 İzci Girişi
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
