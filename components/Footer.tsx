"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('legal')

  return (
    <footer className="border-t border-white/10 bg-[#0D0D1A] py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
          <p className="text-sm font-dm">© 2025 Talent Scout Manager. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <Link href="/terms" className="hover:text-white transition-colors">{t('terms_title')}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t('privacy_title')}</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">{t('refund_title')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
