"use client"

import { useMemo, useState } from 'react'
import { useSession } from '@/hooks/use-session'

type Props = {
  open: boolean
  onClose: () => void
  athleteId: string
  athleteName: string
}

export default function MessageManagerModal({ open, onClose, athleteId, athleteName }: Props) {
  const { session, profile } = useSession()
  const [scoutName, setScoutName] = useState(profile?.full_name || session?.user_metadata?.full_name || '')
  const [scoutClub, setScoutClub] = useState('')
  const [scoutEmail, setScoutEmail] = useState(profile?.email || session?.email || '')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const remaining = useMemo(() => Math.max(0, 50 - message.length), [message.length])

  if (!open) return null

  const submit = async () => {
    if (message.trim().length < 50) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scoutName, scoutEmail, scoutClub, message, athleteId, athleteName }),
      })
      if (!res.ok) throw new Error('failed')
      setMessage('')
      onClose()
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Send Message to Manager</h3>
            <p className="mt-1 text-sm text-slate-400">Athlete: {athleteName}</p>
          </div>
          <button onClick={onClose} className="rounded px-2 py-1 text-slate-400 hover:bg-white/10 hover:text-white">✕</button>
        </div>

        <div className="space-y-3">
          <input value={scoutName} onChange={(e) => setScoutName(e.target.value)} placeholder="Your Name" className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white" />
          <input value={scoutClub} onChange={(e) => setScoutClub(e.target.value)} placeholder="Your Club/Agency" className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white" />
          <input value={scoutEmail} onChange={(e) => setScoutEmail(e.target.value)} placeholder="Your Email" className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Message (minimum 50 characters)" className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white" />
          <p className="text-xs text-slate-500">{remaining > 0 ? `${remaining} more characters required` : 'Ready to send'}</p>
          <button
            onClick={submit}
            disabled={submitting || message.trim().length < 50}
            className="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Message to Manager'}
          </button>
        </div>
      </div>
    </div>
  )
}
