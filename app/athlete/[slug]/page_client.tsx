"use client"

import { useState } from 'react'
import MessageManagerModal from '@/components/athlete/MessageManagerModal'

export default function MessageManagerModalClient({ athleteId, athleteName }: { athleteId: string; athleteName: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
      >
        📩 Message Manager
      </button>
      <MessageManagerModal open={open} onClose={() => setOpen(false)} athleteId={athleteId} athleteName={athleteName} />
    </>
  )
}
