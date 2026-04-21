import React from 'react';
import { motion } from 'framer-motion';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  badge?: string;
};

export default function HeroBanner({ title, subtitle, badge }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-[#1a0b0b] to-black border border-white/10 p-8 md:p-16 mb-12">
      {/* Arka Plan Süslemeleri (SVG) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[var(--red-primary)]/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-[var(--gold-primary)]/5 blur-[100px] rounded-full" />
      
      <div className="relative z-10 max-w-3xl">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-[var(--gold-primary)]">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-black mb-6 font-clash leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-dm max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Dekoratif Grid Deseni */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
    </div>
  );
}