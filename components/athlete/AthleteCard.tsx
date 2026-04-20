"use client"

import Link from 'next/link'
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
    <div className="rounded-xl border border-white/15 bg-white/5 p-4">
      <Link href={`/athlete/${athlete.slug}`} className="block">
        <h3 className="text-lg font-semibold text-white">{athlete.full_name}</h3>
        <p className="text-sm text-slate-400">{athlete.position} • {athlete.sport} • {athlete.nationality}</p>
      </Link>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
      >
        📩 Message Manager
      </button>
      <MessageManagerModal open={open} onClose={() => setOpen(false)} athleteId={athlete.id} athleteName={athlete.full_name} />
    </div>
  )
}
