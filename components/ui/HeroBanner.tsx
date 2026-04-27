'use client'
import React from 'react'

interface HeroBannerProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  badge?: string
}

export default function HeroBanner({ title, subtitle, backgroundImage, badge }: HeroBannerProps) {
  return (
    <div className="relative w-full h-64 bg-[#0D0D1A] flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-yellow-500">
            {badge}
          </span>
        )}
        {title && <h1 className="text-4xl font-bold font-display mb-2">{title}</h1>}
        {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
      </div>
    </div>
  )
}
