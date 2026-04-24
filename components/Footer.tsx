"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('legal')

  return (
    <footer className="border-t border-white/5 py-12 bg-[#050806]">
      <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#00D26A] font-black text-2xl tracking-tighter">TSM</span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">Talent Scout Manager — Defying geography to open talent to the world.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/login" className="hover:text-[#00D26A] transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-[#00D26A] transition-colors">Register</Link></li>
            <li><Link href="/#pricing" className="hover:text-[#00D26A] transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Global Network</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Brazil</li>
            <li>Nigeria</li>
            <li>Turkey</li>
            <li>Argentina</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/privacy" className="hover:text-[#00D26A] transition-colors">{t('privacy_title') || 'Privacy Policy'}</Link></li>
            <li><Link href="/terms" className="hover:text-[#00D26A] transition-colors">{t('terms_title') || 'Terms of Service'}</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#00D26A] transition-colors">{t('refund_title') || 'Refund Policy'}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl mt-12 pt-8 border-t border-white/5 text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© 2026 TSM Platform. All rights reserved.</div>
        <div>Geography is not destiny.</div>
      </div>
    </footer>
  )
}
