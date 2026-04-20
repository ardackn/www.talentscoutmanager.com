"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase'
import { AthletePublic } from '@/types/athlete'
import { t } from '@/lib/i18n'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ScoutOverviewPage() {
  const [athletes, setAthletes] = useState<AthletePublic[]>([])
  const [selectedAthlete, setSelectedAthlete] = useState<AthletePublic | null>(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  
  const highlightedId = searchParams.get('highlight')
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAthletes()
  }, [])

  const fetchAthletes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch athletes error:', error)
    } else {
      setAthletes(data || [])
      // Auto-highlight from search
      if (highlightedId && data) {
        const highlighted = data.find(a => a.id === highlightedId)
        if (highlighted) setSelectedAthlete(highlighted)
      }
    }
    setLoading(false)
  }

  const sendContactMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAthlete || !message.trim()) return

    setSending(true)
    const formData = new FormData()
    formData.append('athleteId', selectedAthlete.id)
    formData.append('content', message)
    formData.append('scoutName', 'Scout User')

    try {
      const res = await fetch('/api/scout/contact', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        alert(t('contact.sent'))
        setMessage('')
        setSelectedAthlete(null)
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      alert('Error sending message')
    }
    setSending(false)
  }

  if (loading) {
    return (
      <main className="container py-16">
        <section className="card p-12 text-center mb-16">
          <div className="animate-spin w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-slate-400">Loading athletes...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="container py-10 md:py-16">
      {/* Header */}
      <section className="card p-8 md:p-10 mb-12">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Scout Workspace
        </span>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
          Elite Talent Pipeline
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          Browse verified athletes and contact the administrator to connect. Messages are private and routed through admin.
        </p>
      </section>

      {/* Athletes Grid */}
      <section className="mb-12">
        <div className="flex gap-4 mb-8">
          <Link href="/scout/search" className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-lg font-semibold hover:bg-white/20 transition-all">
            🔍 Search
          </Link>
          <Link href="/scout/search" className="px-6 py-3 bg-gradient-to-r from-slate-800 to-transparent rounded-3xl border border-white/20 text-lg font-semibold hover:border-white/40 transition-all">
            💎 Top Rated
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {athletes.slice(0, 9).map((athlete) => {
            const avgStat = Math.round((athlete.speed + athlete.skill + athlete.jumping + athlete.agility + athlete.stamina) / 5)
            return (
              <div key={athlete.id} className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 cursor-pointer" onClick={() => setSelectedAthlete(athlete)}>
                <div className="flex items-start gap-4 mb-6">
                  <img src={athlete.image} alt={athlete.name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-black text-[#E94560]">{avgStat}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">AVG</span>
                    </div>
                    <h3 className="text-lg font-bold truncate">{athlete.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                      <span>{athlete.nationality}</span>
                      <span>•</span>
                      <span>{athlete.position}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {athlete.current_team === 'Amateur' ? '⚪ Free Agent' : athlete.current_team}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-1 text-xs mb-4">
                  <div className="text-center">
                    <div className="font-mono text-slate-300">{athlete.speed}</div>
                    <div className="text-slate-500 uppercase text-[10px]">SPD</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-slate-300">{athlete.skill}</div>
                    <div className="text-slate-500 uppercase text-[10px]">SKL</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-slate-300">{athlete.jumping}</div>
                    <div className="text-slate-500 uppercase text-[10px]">JMP</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-slate-300">{athlete.agility}</div>
                    <div className="text-slate-500 uppercase text-[10px]">AGI</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-slate-300">{athlete.stamina}</div>
                    <div className="text-slate-500 uppercase text-[10px]">STA</div>
                  </div>
                </div>
                <button
                  className="w-full rounded-2xl bg-gradient-to-r from-[#E94560]/90 to-purple-600/90 hover:from-[#E94560] hover:to-purple-600 py-4 px-6 font-bold text-white text-sm backdrop-blur-xl border border-transparent hover:shadow-2xl hover:shadow-[#E94560]/25 transition-all duration-300"
                >
                  {t('contact.button')}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <img src={selectedAthlete.image} alt={selectedAthlete.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-black text-white truncate">{selectedAthlete.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>{selectedAthlete.nationality}</span>
                  <span>•</span>
                  <span>{selectedAthlete.position}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAthlete(null)} 
                className="text-slate-400 hover:text-white text-2xl p-2 -m-2 rounded-xl hover:bg-white/10 transition"
              >
                ×
              </button>
            </div>

            <div className="text-sm text-slate-400 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p><strong>Note:</strong> Contact requests are sent directly to the administrator. Personal contact info is private.</p>
            </div>

            <form onSubmit={sendContactMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  {t('contact.title')}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.placeholder')}
                  className="w-full h-32 p-4 rounded-2xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:border-slate-200 focus:outline-none resize-none font-medium"
                  disabled={sending}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setSelectedAthlete(null); setMessage(''); }}
                  className="flex-1 rounded-2xl border border-white/30 bg-slate-900/50 py-4 px-6 font-semibold text-slate-300 hover:bg-slate-800/50 hover:border-white/50 transition-all disabled:opacity-50"
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-[#E94560] to-purple-600 py-4 px-6 font-bold text-white hover:from-[#ff6b6b] hover:shadow-2xl hover:shadow-[#E94560]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : t('contact.button')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pipeline Summary */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <h2 className="text-2xl font-black text-white mb-6">📊 Pipeline Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 text-center">
              <div className="text-4xl font-black text-[#E94560] mb-2">{athletes.length}</div>
              <div className="text-lg font-semibold text-slate-300">Active Athletes</div>
              <div className="text-sm text-slate-500 mt-1">Verified profiles</div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 border border-white/10 text-center">
              <div className="text-4xl font-black text-emerald-400 mb-2">{athletes.filter(a => Math.round((a.speed + a.skill + a.jumping + a.agility + a.stamina)/5) > 85).length}</div>
              <div className="text-lg font-semibold text-slate-300">Elite (85+)</div>
              <div className="text-sm text-slate-500 mt-1">Top percentile</div>
            </div>
          </div>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-black text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/scout/search" className="group rounded-2xl border border-white/20 bg-white/5 p-6 text-center hover:bg-white/10 hover:border-white/30 transition-all">
              <div className="text-2xl mb-3">🔍</div>
              <div className="font-bold text-lg mb-1 group-hover:text-white">Advanced Search</div>
              <div className="text-sm text-slate-500">Filter by stats & position</div>
            </Link>
            <Link href="/admin/login" className="group rounded-2xl border border-white/20 bg-white/5 p-6 text-center hover:bg-white/10 hover:border-white/30 transition-all">
              <div className="text-2xl mb-3">⚙️</div>
              <div className="font-bold text-lg mb-1 group-hover:text-white">Admin Panel</div>
              <div className="text-sm text-slate-500">View messages & manage</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

