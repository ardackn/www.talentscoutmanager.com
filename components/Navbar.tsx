"use client"

import Link from 'next/link'
import { useSession } from '@/hooks/use-session'
import { useTranslation } from 'react-i18next'
import { UserMenu } from '@/components/UserMenu'

export default function Navbar() {
  const { t, i18n } = useTranslation('common')
  const { loading } = useSession()
  if (loading) {
    return (
      <nav className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-8 bg-white/10 rounded-xl animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-20 h-10 bg-white/10 rounded-lg animate-pulse" />
              <div className="w-20 h-10 bg-white/10 rounded-lg animate-pulse" />
              <div className="w-20 h-10 bg-white/10 rounded-lg animate-pulse" />
              <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-white via-slate-100 to-transparent bg-clip-text">
            TSM.
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/scout/overview" className="px-6 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white font-semibold transition-all">
              {t('nav.scout')} ({t('nav.yetenek-avcisi')})
            </Link>
            <Link href="/athlete/dashboard" className="px-6 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white font-semibold transition-all">
              {t('nav.athlete')} ({t('nav.yetenek')})
            </Link>
            <Link href="#pricing" className="px-6 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white font-semibold transition-all">
              {t('nav.pricing')}
            </Link>
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')}
              className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white font-semibold transition-all text-sm"
            >
              {i18n.language === 'tr' ? 'EN' : 'TR'}
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
