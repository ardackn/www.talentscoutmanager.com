export const dynamic = 'force-dynamic'
"use client"

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation('legal');

  return (
    <div className="container min-h-screen py-24 max-w-4xl mx-auto px-6 text-slate-300">
      <h1 className="text-4xl font-black mb-8 font-clash text-white bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent">
        {t('privacy_title')}
      </h1>
      
      <div className="space-y-8 leading-relaxed font-dm">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('privacy_section1_title')}</h2>
          <p>{t('privacy_section1_content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('privacy_section2_title')}</h2>
          <p>{t('privacy_section2_content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('privacy_section3_title')}</h2>
          <p>{t('privacy_section3_content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('privacy_section4_title')}</h2>
          <p>{t('privacy_section4_content')}</p>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10 mt-12">
          <h2 className="text-xl font-bold mb-4 text-white font-clash">{t('contact_us_title')}</h2>
          <p>{t('contact_us_text')}</p>
          <p className="mt-2"><strong>{t('address')}</strong> {t('address_value')}</p>
          <p><strong>{t('email')}</strong> {t('email_value')}</p>
        </section>
      </div>

      <div className="mt-12 text-sm text-slate-500 text-center">
        {t('last_updated')} {t('last_updated_date')}
      </div>
    </div>
  );
}
