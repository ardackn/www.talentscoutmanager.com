"use client"
export const dynamic = 'force-dynamic'

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RefundPolicy() {
  const { t } = useTranslation('legal');

  return (
    <div className="container min-h-screen py-24 max-w-4xl mx-auto px-6 text-slate-300">
      <h1 className="text-4xl font-black mb-8 font-clash text-white bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent">
        {t('refund_title')}
      </h1>
      
      <div className="space-y-8 leading-relaxed font-dm">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('refund_section1_title')}</h2>
          <p>{t('refund_section1_content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">{t('refund_section2_title')}</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>{t('refund_section2_item1')}</li>
            <li>{t('refund_section2_item2')}</li>
            <li>{t('refund_section2_item3')}</li>
          </ul>
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
