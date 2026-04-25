"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, CheckCircle2, Globe, Users, TrendingUp, Shield, ChevronRight, Star } from 'lucide-react'

const LIVE_ACTIVITY = [
  { id: 1, name: 'Alperen Aktaş', pos: 'Kaleci', loc: 'İstanbul', score: 74, time: 'Şu anda', initials: 'AA' },
  { id: 2, name: 'Can Demir', pos: 'Stoper', loc: 'Ankara', score: 66, time: '2 dk önce', initials: 'CD' },
  { id: 3, name: 'İsmail Kara', pos: 'Sol Bek', loc: 'İzmir', score: 77, time: '8 dk önce', initials: 'İK' },
  { id: 4, name: 'Semih Kılıç', pos: 'Sağ Bek', loc: 'Bursa', score: 79, time: '14 dk önce', initials: 'SK' },
]

const TOP_PLAYERS = [
  { rank: 1, name: 'Uğur Çetin', pos: 'Kaleci', team: 'Sivasspor U21', score: 84 },
  { rank: 2, name: 'Berk Güler', pos: 'Sol Kanat', team: 'Ankaragücü U21', score: 84 },
  { rank: 3, name: 'Arda Kaya', pos: 'Sağ Kanat', team: 'Ümraniyespor U21', score: 84 },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#050806] text-white font-sans selection:bg-[#00D26A] selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH VIDEO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/40 via-[#050806]/60 to-[#050806]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl text-center mt-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 text-sm font-semibold text-[#00D26A]">
            <span className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse"></span>
            YETENEK VE FIRSAT ARASINDAKİ KÜRESEL KÖPRÜ
          </span>
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6 tracking-tighter drop-shadow-2xl">
            YETENEĞİNİZİN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D26A] to-[#008f48]">
              SINIRI YOKTUR.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Dünyanın ilk yapay zeka destekli küresel futbol yetenek keşif platformu. Sadece telefonunuzla performansınızı kaydedin ve dünyaya açılın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-[#00D26A] text-black font-black text-lg px-10 py-5 rounded-full hover:bg-[#00e676] hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,210,106,0.5)]">
              Ücretsiz Profil Oluştur
            </Link>
            <Link href="/pricing" className="bg-transparent border-2 border-white/20 text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
              Kulüpler İçin İncele
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Sonsuza dek ücretsiz · Kredi kartı gerekmez · 2 dakikada hazır</p>
        </div>
      </section>

      {/* 2. CANLI PLATFORM ETKİNLİĞİ (TICKER/LIST) */}
      <section className="py-12 border-b border-white/5 bg-gradient-to-r from-black via-white/5 to-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              Canlı Platform Etkinliği
            </h2>
            <Link href="/register" className="text-[#00D26A] hover:underline text-sm font-semibold flex items-center mt-2 md:mt-0">
              Yeni Katılanları Gör <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LIVE_ACTIVITY.map((player) => (
              <div key={player.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D26A] to-blue-600 flex items-center justify-center text-black font-black shrink-0">
                  {player.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{player.name}</div>
                  <div className="text-xs text-gray-400">{player.pos} · {player.loc}</div>
                  <div className="text-[10px] text-[#00D26A] mt-1">{player.time}</div>
                </div>
                <div className="ml-auto font-black text-lg text-white/50">{player.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TSM NEDİR? & NEDEN KAYIT OLMALISINIZ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-[#00D26A] font-bold tracking-wider mb-2">TSM NEDİR?</h3>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Yetenek Her Yerdeydi. Sorun Görünürlüktü.</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Manchester'daki bir yetenek avcısı, Lagos'ta 14 yaşında bir dâhinin yeteneğini keşfedebilir. Madrid'deki bir kulüp yöneticisi, İstanbul'daki bir oyuncunun performans verilerini inceleyebilir.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00D26A] shrink-0" />
                  <span className="text-gray-300">Yapay zeka videonuzu analiz eder ve performans puanı oluşturur.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00D26A] shrink-0" />
                  <span className="text-gray-300">500'den fazla kulüpten gelen yetenek avcıları küresel yetenekleri inceliyor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00D26A] shrink-0" />
                  <span className="text-gray-300">Oyuncular ve karar vericiler arasında %100 doğrudan bağlantı.</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#00D26A]/20 to-transparent p-6 rounded-3xl border border-[#00D26A]/30 text-center">
                <Globe className="w-10 h-10 text-[#00D26A] mx-auto mb-4" />
                <h4 className="text-3xl font-black text-white mb-1">47</h4>
                <p className="text-sm text-gray-400">Aktif Ülke</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-6 rounded-3xl border border-blue-500/30 text-center translate-y-8">
                <Shield className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h4 className="text-3xl font-black text-white mb-1">%94.2</h4>
                <p className="text-sm text-gray-400">Yapay Zeka Doğruluğu</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-6 rounded-3xl border border-purple-500/30 text-center">
                <Users className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                <h4 className="text-3xl font-black text-white mb-1">500+</h4>
                <p className="text-sm text-gray-400">Ortak Kulüp</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-transparent p-6 rounded-3xl border border-orange-500/30 text-center translate-y-8">
                <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h4 className="text-3xl font-black text-white mb-1">1000+</h4>
                <p className="text-sm text-gray-400">Keşfedilen Oyuncu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPÜLER OYUNCULAR (TOP RECOMMENDATIONS) */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">En Çok Tavsiye Edilenler</h2>
            <p className="text-gray-400">Yapay zeka tarafından haftanın en yüksek potansiyelli olarak belirlenen yetenekleri.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TOP_PLAYERS.map((player) => (
              <div key={player.rank} className="bg-[#0a0f0c] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#00D26A]/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D26A]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="text-[#00D26A] font-black text-xl">#{player.rank}</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm font-bold">{player.score} AI</div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">{player.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{player.pos} · {player.team}</p>
                  <Link href="/register" className="text-sm font-semibold text-[#00D26A] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Profili İncele <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NASIL ÇALIŞIR - 3 ADIM */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Keşfedilmek İçin 3 Adım</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D26A]/30 to-transparent hidden md:block -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 bg-[#050806] p-8 rounded-3xl border border-white/10 hover:border-[#00D26A]/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D26A] text-black font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,210,106,0.4)]">01</div>
              <h3 className="text-2xl font-bold mb-4">Videonuzu Yükleyin</h3>
              <p className="text-gray-400">Performans videonuzu platforma ekleyin. Akıllı telefonla çekilmiş olması yeterlidir.</p>
            </div>
            
            <div className="relative z-10 bg-[#050806] p-8 rounded-3xl border border-white/10 hover:border-[#00D26A]/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D26A] text-black font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,210,106,0.4)]">02</div>
              <h3 className="text-2xl font-bold mb-4">AI Puanınızı Alın</h3>
              <p className="text-gray-400">Yapay zekâ sistemimiz videonuzu analiz eder ve aktivite, hız, konumlandırma puanı üretir.</p>
            </div>
            
            <div className="relative z-10 bg-[#050806] p-8 rounded-3xl border border-white/10 hover:border-[#00D26A]/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D26A] text-black font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,210,106,0.4)]">03</div>
              <h3 className="text-2xl font-bold mb-4">Küresel Olun</h3>
              <p className="text-gray-400">Dünyanın dört bir yanındaki yetenek avcıları profilinizi ve puanınızı anında görür.</p>
            </div>
          </div>
          
          <div className="mt-16">
            <Link href="/register" className="inline-block bg-white text-black font-black text-lg px-12 py-5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all">
              Şimdi Profilinizi Oluşturun
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TRUSTED BY / MARKA */}
      <section className="py-12 border-y border-white/5 bg-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">ÖNDE GELEN KULÜPLERİN GÜVENDİĞİ MARKA</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'Başakşehir', 'Ankaragücü'].map((club) => (
              <span key={club} className="text-2xl font-black text-white">{club}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KİMLER KULLANABİLİR & PRICING CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-[#00D26A]/10 via-transparent to-transparent rounded-3xl border border-[#00D26A]/20 p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Her Bütçeye Uygun Planlar</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Bağımsız yetenek avcılarından dev federasyonlara kadar, ihtiyacınız olan veri odaklı scouting araçları tek platformda. Üstelik 14 gün ücretsiz deneme fırsatıyla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="bg-[#00D26A] text-black font-black text-lg px-10 py-5 rounded-full hover:bg-[#00e676] hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,210,106,0.5)]">
                Fiyatlandırmayı İncele
              </Link>
              <Link href="/register?role=scout" className="bg-white/10 text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-white/20 transition-all">
                İzci Olarak Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-black text-white mb-4">TSM</h4>
            <p className="text-gray-500 text-sm">Yetenek Avcısı Yöneticisi — Coğrafi engelleri aşarak yetenekleri dünyaya açıyor.</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Platform</h5>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><Link href="/login" className="hover:text-[#00D26A]">Giriş yapmak</Link></li>
              <li><Link href="/register" className="hover:text-[#00D26A]">Kayıt olmak</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00D26A]">Fiyatlandırma</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Küresel Ağ</h5>
            <ul className="space-y-2 text-gray-500 text-sm grid grid-cols-2">
              <li>Brezilya</li>
              <li>Nijerya</li>
              <li>Türkiye</li>
              <li>Arjantin</li>
              <li>Gana</li>
              <li>Kolombiya</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Yasal</h5>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Gizlilik Bildirimi</li>
              <li>Hizmet Şartları</li>
              <li>Çerez Politikası</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl mt-12 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
          &copy; 2026 TSM Platform · Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  )
}