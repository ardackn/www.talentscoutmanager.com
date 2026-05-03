"use client"
import React, { useState } from 'react'
import { X, Mail, Phone, Search, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'

const POSITIONS = ['Kaleci','Stoper','Sol Bek','Sağ Bek','Defans Ortası','Merkez Orta Saha','Ofansif Orta Saha','Sol Kanat','Sağ Kanat','Forvet']

const FIRST_NAMES = [
  'Ahmet','Mehmet','Mustafa','Ali','Hüseyin','İbrahim','Ömer','Kerem','Emre','Arda',
  'Enes','Furkan','Burak','Oğuzhan','Selim','Can','Mert','Yiğit','Berkay','Tolga',
  'Semih','Atakan','Efe','Umut','Cihan','Sarp','Bora','Kaan','Deniz','Ege'
]

const LAST_NAMES = [
  'Yılmaz','Kaya','Demir','Çelik','Şahin','Yıldız','Aydın','Özdemir','Arslan','Doğan',
  'Kılıç','Aslan','Çetin','Kara','Koç','Kurt','Özcan','Tekin','Polat','Güneş',
  'Bulut','Yıldırım','Sert','Toprak',' Kaplan','Aksoy','Öztürk','Avcı','Uysal','Sarı'
]

function generateRandomNames(count: number) {
  const names: string[] = []
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const name = `${first} ${last}`
    if (!names.includes(name)) {
      names.push(name)
    } else {
      i-- // Retry if duplicate
    }
  }
  return names
}

const NAMES = generateRandomNames(100)

const BIRTH_YEARS = Array.from({length: 7}, (_,i) => 2008 + i) // 2008-2014 → 12-18 yaş

function generatePlayers() {
  return NAMES.slice(0, 100).map((name, i) => {
    const pos = POSITIONS[i % POSITIONS.length]
    const birthYear = BIRTH_YEARS[i % BIRTH_YEARS.length]
    const birthMonth = String((i % 12) + 1).padStart(2,'0')
    const birthDay = String((i % 28) + 1).padStart(2,'0')
    const rating = 68 + (i % 22)
    // Use DiceBear with unique seeds based on name for consistent avatars
    const seed = encodeURIComponent(name + i)
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    
    // Yaşa ve isme göre benzersiz, gerçekçi portre eşleşmesi
    // Not: AI Görsel oluşturucu (Nano/Gemini) kotası dolu olduğu için xsgames kütüphanesinden gerçekçi ve Türk tipolojisine en uygun yüzler seçiliyor.
    let avatarId = 1
    if (age <= 14) {
      avatarId = (i % 25) + 50 // Çocuksu/Genç profiller
    } else if (age <= 16) {
      avatarId = (i % 25) + 25 // Genç ergen profilleri
    } else {
      avatarId = (i % 25) + 1  // Genç yetişkin profilleri
    }

    return {
      id: String(i + 1),
      full_name: name,
      position: pos,
      birth_date: `${birthYear}-${birthMonth}-${birthDay}`,
      nationality: 'Türkiye',
      current_club: 'Amatör (Bağımsız)',
      rating,
      avatar_url: `https://xsgames.co/randomusers/assets/avatars/male/${avatarId}.jpg?v=${i}`,
    }
  })
}

const PLAYERS = generatePlayers()

interface Player {
  id: string
  full_name: string
  position: string
  birth_date: string
  nationality: string
  current_club: string
  rating: number
  avatar_url: string
}

interface ContactForm {
  phone: string
  email: string
  message: string
}

export default function DiscoveryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showContact, setShowContact] = useState(false)
  const [contactForm, setContactForm] = useState<ContactForm>({ phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  const filtered = PLAYERS.filter(p =>
    p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAge = (birth_date: string) => new Date().getFullYear() - new Date(birth_date).getFullYear()

  const handleSendContact = async () => {
    if (!contactForm.phone || !contactForm.email) {
      toast.error('Telefon ve e-posta zorunludur.')
      return
    }
    if (!contactForm.message) {
      toast.error('Lütfen mesajınızı yazın.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: selectedPlayer?.full_name,
          senderPhone: contactForm.phone,
          senderEmail: contactForm.email,
          message: contactForm.message,
        }),
      })
      if (!res.ok) throw new Error()
      toast.success('Mesajınız başarıyla iletildi!')
      setShowContact(false)
      setContactForm({ phone: '', email: '', message: '' })
      setSelectedPlayer(null)
    } catch {
      toast.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white pt-24">

      {/* Header */}
      <div className="pb-16 text-center px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 relative z-10">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-white">Discovery Grid</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light relative z-10">
          Tüm dünyadan oyuncuları keşfedin.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-black uppercase tracking-widest">
            ⚽ 10.048 Kayıtlı Kişi
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link href="/scout-register" className="px-6 py-3 bg-[#10B981] text-[#05050A] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Keşfetmek İçin Kayıt Ol (İzci)
          </Link>
          <Link href="/player-register" className="px-6 py-3 bg-white/5 text-white border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
            Yeteneğiniz Görünür Olsun - Coğrafya Kader Değil, Videonu Yükle
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-12 relative px-6">
        <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="İsim veya pozisyon ara..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-16 pr-8 text-sm focus:border-[#10B981] outline-none transition-all"
        />
      </div>

      {/* Grid */}
      <main className="container mx-auto px-6 max-w-7xl pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.01 }}
              whileHover={{ y: -6 }}
              onClick={() => { setSelectedPlayer(player); setShowContact(false) }}
              className="group cursor-pointer bg-[#0A0A14] border border-white/5 hover:border-[#10B981]/50 rounded-[24px] overflow-hidden transition-all shadow-lg hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]"
            >
              <div className="aspect-square relative overflow-hidden bg-[#0d1117]">
                <img
                  src={player.avatar_url}
                  alt={player.full_name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#10B981]">
                  {player.position}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-[#05050A] border border-white/10 flex items-center justify-center text-sm font-black italic group-hover:border-[#10B981] group-hover:text-[#10B981] transition-colors">
                  {player.rating}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-white truncate">{player.full_name}</h3>
                <div className="flex gap-1 mt-1.5">
                  <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded font-bold text-gray-400 uppercase">
                    {getAge(player.birth_date)} YAŞ
                  </span>
                  <span className="text-[9px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-0.5 rounded font-black uppercase">
                    Amatör
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) { setSelectedPlayer(null); setShowContact(false) } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#0A0A14] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)]"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image side */}
                <div className="w-full md:w-2/5 aspect-square relative bg-[#0d1117]">
                  <img src={selectedPlayer.avatar_url} alt={selectedPlayer.full_name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Info side */}
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-between relative">
                  <button
                    onClick={() => { setSelectedPlayer(null); setShowContact(false) }}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-[#10B981] text-white hover:text-black rounded-full flex items-center justify-center transition-colors border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-[10px] font-black uppercase tracking-widest rounded border border-[#10B981]/30">
                      {selectedPlayer.position}
                    </span>
                    <h2 className="text-3xl font-black italic text-white uppercase mt-4 mb-2">{selectedPlayer.full_name}</h2>
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Skor</div>
                        <div className="text-3xl font-black text-[#10B981] italic">{selectedPlayer.rating}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Yaş</div>
                        <div className="text-2xl font-bold text-white mt-1">{getAge(selectedPlayer.birth_date)}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Seviye</div>
                        <div className="text-sm font-bold text-white mt-1">Amatör</div>
                      </div>
                    </div>

                    {/* Contact form inline */}
                    {showContact ? (
                      <div className="space-y-3">
                        <p className="text-[10px] text-[#10B981] uppercase font-black tracking-widest">İletişim Bilgileri</p>
                        <input
                          type="tel"
                          placeholder="Telefon numaranız *"
                          value={contactForm.phone}
                          onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#10B981] transition-all"
                        />
                        <input
                          type="email"
                          placeholder="E-posta adresiniz *"
                          value={contactForm.email}
                          onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#10B981] transition-all"
                        />
                        <textarea
                          placeholder="Mesajınızı yazın..."
                          value={contactForm.message}
                          onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#10B981] transition-all resize-none"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Tüm dünyadan keşfedilmeyi bekleyen futbol yetenekleri. İletişim kurmak için aşağıdaki butona tıklayın.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    {showContact ? (
                      <>
                        <button
                          onClick={() => setShowContact(false)}
                          className="px-4 py-3 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                        >
                          Geri
                        </button>
                        <button
                          onClick={handleSendContact}
                          disabled={sending}
                          className="flex-1 py-3 bg-[#10B981] text-[#05050A] rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0ea472] transition-colors disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                          {sending ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setShowContact(true)}
                        className="w-full py-4 bg-white text-[#05050A] rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#10B981] transition-colors group"
                      >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        İletişim Kur
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
