"use client"

import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, HelpCircle, CreditCard, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicy() {
  const { t } = useTranslation('legal');

  return (
    <main className="min-h-screen bg-[#050806] pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] font-bold text-sm mb-6">
            <RefreshCw className="w-4 h-4" /> İADE VE İPTAL SÜRECİ
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('refund_title')}
          </h1>
          <p className="text-xl text-gray-400 font-medium">
            Abonelik iptali ve iade koşullarımız hakkında şeffaf bilgilendirme.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-[#00D26A]/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#00D26A]/20 flex items-center justify-center text-[#00D26A]">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('refund_section1_title')}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('refund_section1_content')}
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-[#00D26A]/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#00D26A]/20 flex items-center justify-center text-[#00D26A]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('refund_section2_title')}</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <p className="text-gray-300">{t('refund_section2_item1')}</p>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <p className="text-gray-300">{t('refund_section2_item2')}</p>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <p className="text-gray-300">{t('refund_section2_item3')}</p>
              </div>
            </div>
          </section>

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
          {t('last_updated')} {t('last_updated_date')} • <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
        </div>
      </div>
    </main>
  );
}