export const dynamic = 'force-dynamic'
"use client"

import { useState, useEffect } from 'react'

interface Message {
  id: string
  fromScout: string
  toTalentId: string
  content: string
  timestamp: string
  replied: boolean
}

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [replyingId, setReplyingId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Messages fetch error', error)
    }
    setLoading(false)
  }

  const sendReply = async (msgId: string) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msgId, reply: replyText }),
      })
      setReplyText('')
      setReplyingId(null)
      fetchMessages() // Refresh
      alert('Yanıt gönderildi!')
    } catch (error) {
      alert('Hata oluştu')
    }
  }

  const metrics = [
    { label: 'Aktif scout', value: '24' },
    { label: 'Yeni mesajlar', value: messages.filter(m => !m.replied).length.toString() },
    { label: 'Toplam sporcu', value: '10.847' },
    { label: 'Transferler', value: '387' },
  ]

  if (loading) {
    return <div className="container py-16 text-center">Yükleniyor...</div>
  }

  return (
    <main className="container py-10 md:py-16">
      <section className="flex flex-col gap-6">
        <div className="card p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                Admin Dashboard
              </span>
              <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                Operasyon Merkezi & Mesaj Kutusu
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Yeni scout mesajlarını görüntüleyin ve yanıtlayın. Sistem durumu özeti.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Ana Sayfa
              </a>
              <a href="/api/admin/logout" className="rounded-full bg-[#E94560] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b6b]">
                Çıkış
              </a>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <article key={item.label} className="card p-6">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
            </article>
          ))}
        </section>

        {/* Messages Inbox */}
        <section className="lg:col-span-full">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📥 Mesaj Kutusu 
              <span className="px-3 py-1 rounded-full bg-[#E94560]/20 text-[#E94560] text-sm font-semibold">
                {messages.filter(m => !m.replied).length} Okunmamış
              </span>
            </h2>
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Henüz mesaj yok. Scoutlar yeteneklere mesaj gönderdikçe burada görünecek.
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="font-semibold text-white">{msg.fromScout}</div>
                      <div className="text-xs text-slate-400">{new Date(msg.timestamp).toLocaleString('tr-TR')}</div>
                    </div>
                    <p className="text-slate-200 mb-4">{msg.content}</p>
                    {msg.replied ? (
                      <div className="text-xs text-green-400 bg-green-500/10 p-2 rounded-xl">
                        ✅ Yanıtlandı
                      </div>
                    ) : (
                      <div>
                        {replyingId === msg.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Yanıt yazın..."
                              className="w-full h-20 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-[#E94560] focus:outline-none resize-none"
                            />
                            <div className="flex gap-3 pt-1">
                              <button
                                onClick={() => { setReplyingId(null); setReplyText(''); }}
                                className="flex-1 py-2 px-4 rounded-xl border border-white/20 bg-slate-800/50 text-white hover:bg-slate-700 transition text-sm"
                              >
                                İptal
                              </button>
                              <button
                                onClick={() => sendReply(msg.id)}
                                disabled={!replyText.trim()}
                                className="flex-1 py-2 px-4 rounded-xl bg-[#E94560] text-white hover:bg-[#ff6b6b] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-semibold"
                              >
                                Yanıt Gönder
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setReplyingId(msg.id)}
                            className="rounded-xl bg-[#E94560] px-5 py-2 font-semibold text-white hover:bg-[#ff6b6b] transition text-sm"
                          >
                            Yanıtla
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
              Mesajlar scout'lardan yeteneklere gönderilenler. Admin tüm konuşmaları yönetir.
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Son Güncellemeler</h2>
            <ul className="space-y-4 text-sm leading-7 text-slate-300">
              <li>• Homepage TSM landing page olarak yeniden tasarlandı</li>
              <li>• Scout mesaj gönderme sistemi aktif</li>
              <li>• Admin mesaj kutusu ve yanıt sistemi eklendi</li>
              <li>• Yetenek verileri uluslararası + AI skorları güncellendi</li>
            </ul>
          </article>
          <article className="card p-8">
            <h2 className="text-xl font-bold text-white">Hızlı Geçişler</h2>
            <div className="mt-6 grid gap-3">
              <a href="/scout/overview" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                Scout Workspace
              </a>
              <a href="/login" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                Scout Girişi
              </a>
              <a href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                Ana Sayfa
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  )
}

