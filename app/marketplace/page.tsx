"use client"
export const dynamic = 'force-dynamic'

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import HeroBanner from '@/components/ui/HeroBanner'

const transferListings = [
  {
    id: 1,
    player: 'Ahmed Khalil',
    age: 19,
    position: 'ST',
    club: 'Al Ahly Youth',
    price: '€2.5M',
    aiScore: 89
  },
  {
    id: 2,
    player: 'João Silva',
    age: 20,
    position: 'LW',
    club: 'Flamengo U20',
    price: '€1.8M',
    aiScore: 87
  },
  {
    id: 3,
    player: 'Mehmet Özkan',
    age: 18,
    position: 'CB',
    club: 'Galatasaray U19',
    price: '€3.2M',
    aiScore: 91
  }
]

export default function MarketplacePage() {
  const { session, loading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login')
    }
  }, [session, loading, router])

  if (loading) {
    return <div className="container py-16 text-center">Loading...</div>
  }

  return (
    <div className="container min-h-screen py-16">
      <HeroBanner 
        badge="Marketplace"
        title="Geleceğin Yıldızlarını Bugün Transfer Edin"
        subtitle="Yapay zeka destekli değerleme ve doğrulanmış kulüp verileriyle güvenli transfer pazarı."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {transferListings.map((listing) => (
          <Card key={listing.id} className="bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 transition-all group">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <CardTitle className="text-xl font-clash group-hover:text-[var(--red-primary)]">
                  {listing.player}
                </CardTitle>
                <span className="px-3 py-1 bg-gradient-to-r from-[var(--red-primary)] to-red-500 text-white text-sm font-bold rounded-full font-clash">
                  {listing.aiScore}
                </span>
              </div>
              <div className="flex gap-2 text-sm text-slate-400 mb-2">
                <span>{listing.age}yo</span>
                <span>•</span>
                <span>{listing.position}</span>
              </div>
              <div className="text-xs text-slate-500">{listing.club}</div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-black text-[var(--gold-primary)] mb-6">
                {listing.price}
              </div>
              <Button className="w-full bg-gradient-to-r from-[var(--red-primary)] to-red-500 hover:from-red-500 font-bold">
                Detaylar & Teklif Ver
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
        <h2 className="text-3xl font-black mb-6 font-clash">🔒 Doğrulanmış Fırsatlar</h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Tüm transfer listeleri kulüpler ve acenteler tarafından doğrulanmıştır. AI değerleme ile %95 doğruluk.
        </p>
        <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 font-bold text-lg px-12 py-6">
          Daha Fazla Fırsat İçin Abone Ol
        </Button>
      </div>
    </div>
  )
}
