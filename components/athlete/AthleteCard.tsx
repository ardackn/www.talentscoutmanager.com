"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import MessageManagerModal from './MessageManagerModal'

type AthleteCardData = {
  id: string
  slug: string
  full_name: string
  sport: string
  position: string
  nationality: string
  birth_date: string
  created_at: string
}

export default function AthleteCard({ athlete }: { athlete: AthleteCardData }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        borderColor: 'rgba(233, 69, 96, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--red-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <Link href={`/athlete/${athlete.slug}`} className="relative z-10 block space-y-2">
        <h3 className="text-xl font-bold text-white group-hover:text-[var(--red-primary)] transition-colors font-clash">
          {athlete.full_name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-400 font-dm">
          <span className="font-semibold text-slate-200">{athlete.position}</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>{athlete.sport}</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>{athlete.nationality}</span>
        </div>
      </Link>

      <button
        onClick={() => setOpen(true)}
        className="relative z-10 mt-5 w-full rounded-xl bg-gradient-to-r from-[var(--red-primary)] to-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 hover:from-red-500 hover:shadow-red-900/40 transform active:scale-[0.98] transition-all font-clash flex items-center justify-center gap-2"
      >
        📩 Message Manager
      </button>

      <MessageManagerModal open={open} onClose={() => setOpen(false)} athleteId={athlete.id} athleteName={athlete.full_name} />
    </motion.div>
  )
}
