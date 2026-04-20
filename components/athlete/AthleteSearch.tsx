"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import AthleteCard from '@/components/athlete/AthleteCard'

const PAGE_SIZE = 20

export type AthleteFilters = {
  name: string
  sport: string[]
  position: string
  ageMin: number
  ageMax: number
  status: string
  membershipType: string
  role: string
  country: string
  hasVideo: boolean
}

const INITIAL_FILTERS: AthleteFilters = {
  name: '',
  sport: ['football'],
  position: '',
  ageMin: 12,
  ageMax: 60,
  status: '',
  membershipType: '',
  role: '',
  country: '',
  hasVideo: false,
}

type Props = { title: string; subtitle?: string }

export default function AthleteSearch({ title, subtitle }: Props) {
  const supabase = createClientComponentClient()
  const [filters, setFilters] = useState<AthleteFilters>(INITIAL_FILTERS)
  const [sort, setSort] = useState<'name_asc' | 'name_desc' | 'newest' | 'age_young' | 'age_old'>('newest')
  const [athletes, setAthletes] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const searchTerm = useMemo(() => filters.name, [filters.name])

  const fetchAthletes = useCallback(async (append: boolean, pageValue: number) => {
    setLoading(true)
    let query: any = supabase
      .from('athlete_profiles')
      .select('id, slug, full_name, sport, position, nationality, birth_date, created_at, profiles!inner(subscription_tier, role, status)', { count: 'exact' })

    if (searchTerm) query = query.ilike('full_name', `%${searchTerm}%`)
    if (filters.sport.length) query = query.in('sport', filters.sport)
    if (filters.position) query = query.eq('position', filters.position)
    if (filters.country) query = query.eq('nationality', filters.country)
    if (filters.status) query = query.eq('profiles.status', filters.status)
    if (filters.membershipType) query = query.eq('profiles.subscription_tier', filters.membershipType)
    if (filters.role) query = query.eq('profiles.role', filters.role)

    if (sort === 'name_asc') query = query.order('full_name', { ascending: true })
    if (sort === 'name_desc') query = query.order('full_name', { ascending: false })
    if (sort === 'newest') query = query.order('created_at', { ascending: false })
    if (sort === 'age_young') query = query.order('birth_date', { ascending: false })
    if (sort === 'age_old') query = query.order('birth_date', { ascending: true })

    const from = (pageValue - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    const { data, count } = await query.range(from, to)

    setCount(count || 0)
    setAthletes((prev) => (append ? [...prev, ...(data || [])] : (data || [])))
    setLoading(false)
  }, [supabase, searchTerm, filters, sort])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      fetchAthletes(false, 1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm, filters.sport.join(','), filters.position, filters.country, filters.status, filters.membershipType, filters.role, sort, fetchAthletes])

  const loadMore = async () => {
    const nextPage = page + 1
    setPage(nextPage)
    await fetchAthletes(true, nextPage)
  }

  return (
    <main className="container py-10 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3 rounded-xl border border-white/15 bg-white/5 p-4">
          <input value={filters.name} onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))} placeholder="Search by name" className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2" />
          <select value={filters.position} onChange={(e) => setFilters((f) => ({ ...f, position: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2">
            <option value="">All positions</option>
            <option>Forward</option><option>Midfielder</option><option>Defender</option><option>Goalkeeper</option>
          </select>
          <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2">
            <option value="">All statuses</option>
            <option>Active</option><option>Inactive</option><option>Pending</option><option>Suspended</option>
          </select>
          <select value={filters.membershipType} onChange={(e) => setFilters((f) => ({ ...f, membershipType: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2">
            <option value="">All membership</option>
            <option>Free</option><option>Pro</option><option>Premium</option><option>Elite</option>
          </select>
          <select value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2">
            <option value="">All roles</option>
            <option>Member</option><option>Scout</option><option>Coach</option><option>Club Official</option><option>Admin</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2">
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
            <option value="newest">Newest</option>
            <option value="age_young">Age (youngest)</option>
            <option value="age_old">Age (oldest)</option>
          </select>
        </aside>

        <section>
          <p className="mb-4 text-sm text-slate-400">{count} results found</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {athletes.map((athlete) => <AthleteCard key={athlete.id} athlete={athlete as any} />)}
          </div>
          {athletes.length < count && (
            <div className="mt-8 text-center">
              <button onClick={loadMore} disabled={loading} className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 disabled:opacity-50">
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
