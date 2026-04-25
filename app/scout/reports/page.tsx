"use client"
export const dynamic = 'force-dynamic'

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
  const { session, profile, loading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!session || profile?.role !== 'scout')) {
      router.push('/login')
    }
  }, [session, profile, loading, router])

  if (loading) {
    return <div className="container py-16 text-center">Loading...</div>
  }

  return (
    <div className="container min-h-screen py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4 font-clash bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent">
          📄 PDF Raporları
        </h1>
        <p className="text-xl text-slate-300">Sporcu istatistiklerini PDF olarak oluşturun ve indirin.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white p-8 hover:bg-white/10 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-clash">Yeni Rapor Oluştur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">Bir sporcunun detaylı istatistik raporunu PDF olarak indirin.</p>
            <Link href="/scout/search">
              <Button className="w-full bg-gradient-to-r from-[var(--red-primary)] to-red-500 hover:from-red-500 font-bold">
                Sporcu Seç → 
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white p-8 hover:bg-white/10 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-clash">Önceki Raporlar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">Daha önce oluşturduğunuz raporları görüntüleyin.</p>
            <Button variant="outline" className="w-full" disabled>
              Henüz rapor yok
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-xl border-white/10 text-white p-8 hover:bg-white/10 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-clash">📋 Rapor Özellikleri</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold text-lg mb-1">AI Skorları</div>
              <p className="text-sm text-slate-400">Tam AI analizi dahil</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold text-lg mb-1">Detaylı İstatistikler</div>
              <p className="text-sm text-slate-400">Teknik + Fiziksel veriler</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-bold text-lg mb-1">Güvenli İndirme</div>
              <p className="text-sm text-slate-400">Şifreli PDF dosyaları</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

