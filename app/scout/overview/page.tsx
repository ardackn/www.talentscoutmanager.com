"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { useSession } from '@/hooks/use-session'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, BarChart3, Upload, MessageSquare, ListPlus, User } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ScoutDashboardPage() {
  const { session, profile, loading: sessionLoading } = useSession()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAthletes: 0,
    myReports: 0,
    transferList: 80 // Static for now matching the mock
  })

  useEffect(() => {
    if (session?.user?.id) {
      fetchStats()
    }
  }, [session])

  const fetchStats = async () => {
    setLoading(true)
    const { count: athleteCount } = await supabase
      .from('athlete_profiles')
      .select('*', { count: 'exact', head: true })

    const { count: reportCount } = await supabase
      .from('analysis_reports')
      .select('*', { count: 'exact', head: true })
      .eq('scout_id', session?.user?.id)

    setStats({
      totalAthletes: athleteCount || 0,
      myReports: reportCount || 0,
      transferList: 80
    })
    setLoading(false)
  }

  if (sessionLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center text-white font-black italic">YÜKLENİYOR...</div>
  }

  return (
    <main className="container py-10 md:py-16 min-h-screen bg-[#05050A]">
      {/* Welcome Header */}
      <section className="card p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <Badge className="mb-4 bg-[#F5A623] text-black font-black uppercase tracking-widest">İzci Paneli</Badge>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white mb-4">
            Hoş Geldiniz, <span className="text-[#F5A623]">{profile?.full_name || 'Scout'}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl font-light text-lg">
            Yetenek keşfi yapın, oyuncuları analiz edin ve transfer listesini yönetin. 
            Yapay zeka destekli scouting araçları hizmetinizde.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-[#0D0D1A] border-white/5 hover:border-[#F5A623]/30 transition-all">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Toplam Yetenek</CardDescription>
            <CardTitle className="text-4xl font-black text-white italic">{stats.totalAthletes}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-[#0D0D1A] border-white/5 hover:border-[#F5A623]/30 transition-all">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Analiz Raporlarım</CardDescription>
            <CardTitle className="text-4xl font-black text-white italic">{stats.myReports}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-[#0D0D1A] border-white/5 hover:border-[#F5A623]/30 transition-all">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Transfer Listesi</CardDescription>
            <CardTitle className="text-4xl font-black text-white italic">{stats.transferList}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Action Hub */}
      <h2 className="text-2xl font-black italic uppercase text-white mb-8 flex items-center gap-3">
        <div className="w-8 h-1 bg-[#F5A623]"></div> Hızlı İşlemler
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/scout/search">
          <Card className="group bg-white/5 border-white/5 hover:bg-[#F5A623] transition-all cursor-pointer h-full">
            <CardContent className="p-8 text-center flex flex-col items-center justify-center">
              <Search className="w-12 h-12 mb-4 text-[#F5A623] group-hover:text-black transition-colors" />
              <h3 className="font-black uppercase italic text-white group-hover:text-black">Yetenek Keşfet</h3>
              <p className="text-xs text-gray-500 group-hover:text-black/70 mt-2 font-bold">Filtreli arama ile oyuncu bulun</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/scout/ai-analysis">
          <Card className="group bg-white/5 border-white/5 hover:bg-[#E94560] transition-all cursor-pointer h-full">
            <CardContent className="p-8 text-center flex flex-col items-center justify-center">
              <BarChart3 className="w-12 h-12 mb-4 text-[#E94560] group-hover:text-white transition-colors" />
              <h3 className="font-black uppercase italic text-white group-hover:text-white">Maç/Oyuncu Analizi</h3>
              <p className="text-xs text-gray-500 group-hover:text-white/70 mt-2 font-bold">Video yükle ve AI raporu al</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/transfer-list">
          <Card className="group bg-white/5 border-white/5 hover:bg-blue-600 transition-all cursor-pointer h-full">
            <CardContent className="p-8 text-center flex flex-col items-center justify-center">
              <ListPlus className="w-12 h-12 mb-4 text-blue-500 group-hover:text-white transition-colors" />
              <h3 className="font-black uppercase italic text-white group-hover:text-white">Transfer Listesi</h3>
              <p className="text-xs text-gray-500 group-hover:text-white/70 mt-2 font-bold">Listeye oyuncu ekle/çıkar</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings">
          <Card className="group bg-white/5 border-white/5 hover:bg-gray-700 transition-all cursor-pointer h-full">
            <CardContent className="p-8 text-center flex flex-col items-center justify-center">
              <User className="w-12 h-12 mb-4 text-gray-400 group-hover:text-white transition-colors" />
              <h3 className="font-black uppercase italic text-white group-hover:text-white">Profil Ayarları</h3>
              <p className="text-xs text-gray-500 group-hover:text-white/70 mt-2 font-bold">Kendi profilini görüntüle</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Info Section */}
      <section className="bg-[#0D0D1A] rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-8 opacity-10">
          <BarChart3 className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black italic uppercase text-white mb-6">Analiz Nasıl Çalışır?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center font-black flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-white mb-1">Video Yükleyin</h4>
                <p className="text-sm text-gray-400 font-light">Maç kaydı veya oyuncu özel videosunu sisteme yükleyin.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center font-black flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-white mb-1">AI İşlesin</h4>
                <p className="text-sm text-gray-400 font-light">Gelişmiş görüntü işleme algoritmalarımız oyuncu metriklerini çıkarsın.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center font-black flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-white mb-1">Raporunuzu Alın</h4>
                <p className="text-sm text-gray-400 font-light">Hız, teknik kapasite ve taktiksel uyum raporunu inceleyin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
