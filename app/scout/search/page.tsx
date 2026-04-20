"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase'
import { AthletePublic } from '@/types/athlete'
import { t } from '@/lib/i18n'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ScoutSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [athletes, setAthletes] = useState<AthletePublic[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAthletes()
  }, [])

  const fetchAthletes = async (query = '') => {
    setLoading(true)
    let queryBuilder = supabase.from('athletes').select('*')

    if (query.trim()) {
      queryBuilder = queryBuilder.ilike('name', `%${query.trim()}%`)
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false })
    
    if (error) {
      console.error('Search error:', error)
      setAthletes([])
    } else {
      setAthletes(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAthletes(searchQuery)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  if (loading && athletes.length === 0) {
    return (
      <main className="container py-16">
        <div className="space-y-8">
          <div className="card p-12 text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-200/50 bg-clip-text text-transparent mb-8">
              🔍 {t('search.placeholder', 'en').split(' ')[0]}
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="card h-64 animate-pulse">
                <div className="space-y-4">
                  <div className="h-48 bg-slate-800 rounded-2xl" />
                  <div className="h-6 bg-slate-800 rounded-lg w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-16">
      {/* Header */}
      <section className="card p-12 text-center mb-16">
        <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-8">
          🔍 Athlete Search
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Find elite talent worldwide. Search by name and discover hidden gems.
        </p>
      </section>

      {/* Search Bar */}
      <div className="card p-8 mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-slate-400 focus:border-slate-200 focus:outline-none text-lg font-semibold transition-all"
            />
          </div>
          <p className="text-sm text-slate-500 mt-2 text-center">
            {athletes.length} athletes {searchQuery ? `matching "${searchQuery}"` : 'available'}
          </p>
        </div>
      </div>

      {/* Results */}
      {athletes.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-8">🔍</div>
          <h2 className="text-3xl font-black text-white mb-4">{t('no.results')}</h2>
          <p className="text-xl text-slate-400 max-w-md mx-auto">
            No athletes match your search. Try different keywords.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {athletes.map((athlete) => (
            <Link 
              key={athlete.id} 
              href={`/scout/overview?highlight=${athlete.id}`}
              className="group card hover:-translate-y-2 transition-all duration-300 overflow-hidden border-white/20 hover:border-white/40"
            >
              <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-slate-900/50 to-transparent">
                <img 
                  src={athlete.image} 
                  alt={athlete.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-slate-900/90 to-transparent backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((athlete.speed + athlete.skill + athlete.jumping + athlete.agility + athlete.stamina) / 5)}
                </div>
              </div>
              <CardHeader className="p-6 pb-3">
                <CardTitle className="font-black text-xl group-hover:text-slate-200 transition-colors">
                  {athlete.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                  <span className="font-semibold text-white">{athlete.nationality}</span>
                  <span>•</span>
                  <span>{athlete.position}</span>
                </div>
                <CardDescription className="text-xs">
                  {athlete.current_team === 'Amateur' ? '⚪ Free Agent' : athlete.current_team}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-slate-200">{athlete.speed}</div>
                    <div className="text-slate-500 uppercase">SPD</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-200">{athlete.skill}</div>
                    <div className="text-slate-500 uppercase">SKL</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-200">{athlete.jumping}</div>
                    <div className="text-slate-500 uppercase">JMP</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-200">{athlete.agility}</div>
                    <div className="text-slate-500 uppercase">AGI</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-200">{athlete.stamina}</div>
                    <div className="text-slate-500 uppercase">STA</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/scout/overview" 
          className="px-8 py-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-lg font-semibold hover:bg-white/20 transition-all"
        >
          👥 View All Athletes
        </a>
        <a 
          href="/admin/login" 
          className="px-8 py-4 bg-gradient-to-r from-slate-900 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 text-lg font-semibold hover:border-white/40 transition-all"
        >
          ⚙️ Admin Dashboard
        </a>
      </div>
    </main>
  )
}

