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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1b2a]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00D26A] to-[#00e5cc] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img src="/data/logo.png" alt="TSM Logo" className="relative h-12 md:h-14 w-auto" />
          </div>
          <span className="text-white font-black text-2xl tracking-tighter italic">TSM</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-black uppercase tracking-[0.2em] text-gray-400">
          <Link href="/about" className="hover:text-[#00D26A] transition-colors">Biz Kimiz</Link>
          <Link href="/#solutions" className="hover:text-[#00D26A] transition-colors">Çözümler</Link>
          <Link href="/pricing" className="hover:text-[#00D26A] transition-colors">Fiyatlandırma</Link>
          <Link href="#contact" className="hover:text-[#00D26A] transition-colors">İletişim</Link>
        </div>

        {/* Desktop CTA / User Menu */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                <Link
                  href="/player-login"
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-[#0d1b2a] bg-[#00e5cc] hover:bg-white hover:scale-105 transition-all shadow-[0_10px_20px_rgba(0,229,204,0.2)]"
                >
                  ⚽ Oyuncu
                </Link>
                <Link
                  href="/scout-login"
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-[#0d1b2a] bg-[#f5a623] hover:bg-white hover:scale-105 transition-all shadow-[0_10px_20px_rgba(245,166,35,0.2)]"
                >
                  🔍 İzci
                </Link>
              </>
            ) : (
              <UserMenu />
            )}
          </div>
          
          {/* Mobile Burger Toggle */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer (Modern Slide-in Menu) */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[300px] bg-[#0d1b2a] border-l border-white/10 p-8 shadow-2xl transition-transform duration-500 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="text-white font-black text-xl italic">MENÜ</span>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <Link href="/about" className="block text-xl font-bold text-white hover:text-[#00D26A] transition-colors" onClick={() => setMenuOpen(false)}>Biz Kimiz</Link>
              <Link href="/#solutions" className="block text-xl font-bold text-white hover:text-[#00D26A] transition-colors" onClick={() => setMenuOpen(false)}>Çözümler</Link>
              <Link href="/pricing" className="block text-xl font-bold text-white hover:text-[#00D26A] transition-colors" onClick={() => setMenuOpen(false)}>Fiyatlandırma</Link>
              <Link href="#contact" className="block text-xl font-bold text-white hover:text-[#00D26A] transition-colors" onClick={() => setMenuOpen(false)}>İletişim</Link>
              
              <div className="pt-8 border-t border-white/5 space-y-4">
                {!session ? (
                  <>
                    <Link 
                      href="/player-login" 
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#00e5cc] text-[#0d1b2a] font-black uppercase tracking-widest text-xs"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚽ Oyuncu Girişi
                    </Link>
                    <Link 
                      href="/scout-login" 
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#f5a623] text-[#0d1b2a] font-black uppercase tracking-widest text-xs"
                      onClick={() => setMenuOpen(false)}
                    >
                      🔍 İzci Girişi
                    </Link>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                      <p className="text-[10px] font-black text-[#00D26A] uppercase tracking-widest mb-1">Hesap</p>
                      <p className="text-white font-bold truncate">{session.user.email}</p>
                    </div>
                    <Link 
                      href="/settings" 
                      className="block text-lg font-bold text-gray-300 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚙️ Hesap Ayarları
                    </Link>
                    <button 
                      onClick={async () => {
                        const supabase = createClientComponentClient()
                        await supabase.auth.signOut()
                        setMenuOpen(false)
                        window.location.reload()
                      }}
                      className="block text-lg font-bold text-red-400 hover:text-red-300"
                    >
                      🚪 Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-12 text-center">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Talent Scout Manager</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
