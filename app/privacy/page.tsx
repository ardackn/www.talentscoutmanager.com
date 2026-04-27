"use client"

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { t } = useTranslation('legal');

  return (
    <main className="min-h-screen bg-[#050806] pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] font-bold text-sm mb-6">
            <Shield className="w-4 h-4" /> GÜVENLİ VE ŞEFFAF
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('privacy_title')}
          </h1>
          <p className="text-xl text-gray-400 font-medium">
            Veri güvenliğiniz bizim önceliğimizdir. TSM, GDPR ve KVKK ile tam uyumludur.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-[#00D26A]/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#00D26A]/20 flex items-center justify-center text-[#00D26A]">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('privacy_section1_title')}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('privacy_section1_content')}
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-[#00D26A]/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#00D26A]/20 flex items-center justify-center text-[#00D26A]">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('privacy_section2_title')}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {t('privacy_section2_content')}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-[#00D26A]" /> AES-256 Şifreleme
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-[#00D26A]" /> TLS 1.3 Aktarım
              </div>
            </div>
          </section>

          {/* Section 3 & 4 */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#00D26A]/30 transition-colors">
              <h3 className="text-xl font-bold mb-4">{t('privacy_section3_title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('privacy_section3_content')}
              </p>
            </section>
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#00D26A]/30 transition-colors">
              <h3 className="text-xl font-bold mb-4">{t('privacy_section4_title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('privacy_section4_content')}
              </p>
            </section>
          </div>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-[#00D26A]/20 to-transparent border border-[#00D26A]/30 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6">{t('contact_us_title')}</h2>
              <p className="text-gray-300 mb-8">{t('contact_us_text')}</p>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('address')}</span>
                  <span className="text-white font-medium">{t('address_value')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('email')}</span>
                  <span className="text-[#00D26A] font-bold">{t('email_value')}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D26A]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          {t('last_updated')} {t('last_updated_date')} • <Link href="/terms" className="hover:text-white transition-colors">Kullanım Şartları</Link>
        </div>
      </div>
    </main>
  );
}