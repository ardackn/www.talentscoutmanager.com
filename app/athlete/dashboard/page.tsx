"use client"

import { useState, useEffect } from 'react'
import { talents, Talent } from '@/lib/talent-data'
import { getTalentById } from '@/lib/talent-data'

interface Message {
  id: string
  fromScout: string
  toTalentId: string
  content: string
  timestamp: string
  replied: boolean
}

export default function AthleteDashboardPage() {
  const [talent, setTalent] = useState<Talent | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [reply, setReply] = useState('')

  useEffect(() => {
    // Demo: assume first talent or from session
    const demoTalent = talents[0]
    setTalent(demoTalent)
    setMessages(demoTalent?.messages || [])
  }, [])

  const sendReply = async () => {
    if (!talent || !reply.trim()) return

    // POST to scout or general message API
    try {
      const res = await fetch('/api/scout/message', {
        method: 'POST',
        body: JSON.stringify({
          talentId: 'scout-reply', // reverse
          content: reply,
          scout: 'Athlete Reply'
        })
      })
      if (res.ok) {
        alert('Yanıt gönderildi!')
        setReply('')
      }
    } catch {
      alert('Hata')
    }
  }

  if (!talent) {
    return <div className="container py-16 text-center text-slate-300">Yükleniyor...</div>
  }

  return (
    <main className="container py-10 md:py-16">
      <section className="card p-8 md:p-10 mb-12">
        <div className="flex items-start gap-6 mb-8">
          <img src={talent.image} alt={talent.name} className="w-24 h-24 rounded-3xl object-cover flex-shrink-0" />
          <div>
            <h1 className="text-4xl font-black text-white">{talent.name}</h1>
            <div className="flex items-center gap-4 text-xl text-slate-300 mt-2">
              <span>{talent.aiScore} AI</span>
              <span>{talent.country}</span>
              <span>{talent.position}</span>
            </div>
            <div className="text-lg text-slate-400 mt-1">{talent.age} yaşında • {talent.height}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-[#E94560] mb-2">{talent.aiScore}</div>
            <div className="text-sm text-slate-400">AI Puanı</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-[#F7C948] mb-2">{talent.messages.length}</div>
            <div className="text-sm text-slate-400">Gelen Mesaj</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">✅</div>
            <div className="text-sm text-slate-400">Doğrulanmış</div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="card p-8">
        <h2 className="text-2xl font-bold text-white mb-8">📥 Gelen Mesajlar</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto mb-8">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 rounded-2xl bg-white/5">
              Henüz scout mesajı yok. Profiliniz öne çıktıkça mesajlar gelecek!
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold bg-[#E94560] px-3 py-1 rounded-full text-sm">{msg.fromScout}</span>
                  <span className="text-xs text-slate-400">{new Date(msg.timestamp).toLocaleDateString('tr-TR')}</span>
                </div>
                <p className="text-slate-200 mb-4 leading-relaxed">{msg.content}</p>
                {!msg.replied && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm mb-3">Yeni mesaj!</p>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Yanıt yaz..."
                      className="w-full h-20 p-4 rounded-xl border border-green-500/50 bg-green-500/5 text-white placeholder-slate-400 focus:border-green-400 focus:outline-none resize-none"
                    />
                    <button
                      onClick={sendReply}
                      disabled={!reply.trim()}
                      className="mt-3 w-full py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                    >
                      Yanıt Gönder
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="text-center text-sm text-slate-500 pt-6 border-t border-white/10">
          Scout mesajları profilinize gönderilenler. Yanıtlar doğrudan iletilir.
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <a href="/" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">🏠</div>
          <h3 className="font-bold mb-2">Ana Sayfa</h3>
          <p className="text-sm text-slate-400">Platforma dön</p>
        </a>
        <a href="/scout/overview" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="font-bold mb-2">İzci Görünümü</h3>
          <p className="text-sm text-slate-400">İzci tarafını test et</p>
        </a>
        <a href="/admin/login" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">⚙️</div>
          <h3 className="font-bold mb-2">Admin</h3>
          <p className="text-sm text-slate-400">Yönetim paneli</p>
        </a>
      </section>
    </main>
  )
}

