"use client"

import { Globe, Target, Eye, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050806] pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#00D26A] font-semibold text-sm mb-6">
            BİZ KİMİZ?
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Yetenek ve Fırsat Arasındaki <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D26A] to-blue-500">
              Küresel Köprü
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Talent Scout Manager (TSM), dünyanın dört bir yanındaki genç yetenekleri, büyük kulüplerle buluşturmayı amaçlayan yapay zeka destekli ilk küresel scouting platformudur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:border-[#00D26A]/50 transition-colors">
            <Target className="w-12 h-12 text-[#00D26A] mb-6" />
            <h2 className="text-3xl font-bold mb-4">Misyonumuz</h2>
            <p className="text-gray-300 leading-relaxed">
              Misyonumuz, futboldaki "coğrafya kaderdir" anlayışını kırmak ve dünyanın neresinde olursa olsun gerçek yeteneğin keşfedilmesini sağlamaktır. Altyapı eksiklikleri veya izleme ağlarının yetersizliği nedeniyle kaybolan genç yeteneklere, doğrudan Avrupa ve dünya devlerinin izci ağlarına dahil olma fırsatı sunuyoruz. Geliştirdiğimiz yapay zeka analizleriyle, oyuncu seçimlerini tamamen adil, objektif ve veri odaklı bir hale getiriyoruz.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:border-blue-500/50 transition-colors">
            <Eye className="w-12 h-12 text-blue-500 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Vizyonumuz</h2>
            <p className="text-gray-300 leading-relaxed">
              Vizyonumuz, küresel futbol ekosisteminde yetenek keşfinin ve transfer kararlarının merkezindeki en güvenilir platform olmaktır. Gelişmekte olan pazarlardaki amatör sahalardan, dünyanın en büyük stadyumlarına uzanan yolda; oyuncuların, kulüplerin ve menajerlerin ortak dili haline gelmeyi hedefliyoruz. Teknolojinin gücünü sporun tutkusuyla birleştirerek, geleceğin futbol dünyasını bugünden inşa ediyoruz.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#00D26A]/10 to-transparent border border-[#00D26A]/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-6">Platformun Arkasındaki Felsefe</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Pahalı seyahatlere, aracı kurumlara veya şans faktörüne dayalı eski scouting sistemini değiştiriyoruz. Sadece bir akıllı telefon kamerası ve yapay zekanın analitik gücüyle, 14 yaşındaki bir dâhinin yeteneklerinin Londra, Madrid veya İstanbul'daki direktörlerin masasına aynı gün ulaşmasını sağlıyoruz.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#00D26A]" /> <span className="font-semibold text-white">47 Aktif Ülke</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00D26A]" /> <span className="font-semibold text-white">500+ Partner Kulüp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
