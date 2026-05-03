"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Search, Filter, Star, Target, TrendingUp, Shield, ChevronRight, ListPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Athlete {
  id: string
  full_name: string
  sport: string
  position: string
  city: string
  birth_date: string
  nationality: string
  current_club: string
  is_published: boolean
  avatar_url?: string
}

export default function DiscoveryDashboard() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPosition, setFilterPosition] = useState('All')
  const [filterAge, setFilterAge] = useState('All')
  const [filterCountry, setFilterCountry] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAthletes()
  }, [])

  const fetchAthletes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('athlete_profiles')
      .select('*')
      .eq('is_published', true)
      .order(sortBy === 'newest' ? 'created_at' : 'rating', { ascending: false })

    if (!error && data) {
      setAthletes(data)
    }
    setLoading(false)
  }

  const countries = Array.from(new Set(athletes.map(a => a.nationality).filter(Boolean)))

  const filteredAthletes = athletes.filter(a => {
    const name = a.full_name || ''
    const club = a.current_club || ''
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = filterPosition === 'All' || a.position === filterPosition
    
    const age = a.birth_date ? (new Date().getFullYear() - new Date(a.birth_date).getFullYear()) : 0
    const matchesAge = filterAge === 'All' || 
                      (filterAge === 'U18' && age < 18) ||
                      (filterAge === '18-21' && age >= 18 && age <= 21) ||
                      (filterAge === '22+' && age > 21)
    
    const matchesCountry = filterCountry === 'All' || a.nationality === filterCountry
    
    return matchesSearch && matchesPosition && matchesAge && matchesCountry
  })

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white pt-10 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
                Yetenek <span className="text-[#10B981]">Keşfi</span>
              </h1>
              <p className="text-gray-400 font-medium">Veri odaklı scouting ile geleceğin yıldızlarını bulun.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Oyuncu veya kulüp ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 focus:border-[#10B981] outline-none transition-all w-full md:w-64 font-medium"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all ${showFilters ? 'text-[#10B981] border-[#10B981]/50' : ''}`}
              >
                <Filter className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Yaş Aralığı</label>
                  <select 
                    value={filterAge}
                    onChange={(e) => setFilterAge(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#10B981] outline-none"
                  >
                    <option value="All">Tümü</option>
                    <option value="U18">U18</option>
                    <option value="18-21">18-21 Yaş</option>
                    <option value="22+">22+ Yaş</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Ülke</label>
                  <select 
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#10B981] outline-none"
                  >
                    <option value="All">Tümü</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Sıralama</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      fetchAthletes();
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#10B981] outline-none"
                  >
                    <option value="newest">En Yeni</option>
                    <option value="rating">Güç Sıralaması</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setFilterAge('All');
                      setFilterCountry('All');
                      setFilterPosition('All');
                      setSearchTerm('');
                    }}
                    className="w-full p-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters Bar (Positions) */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {['All', 'ST', 'LW', 'RW', 'AMF', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK'].map((pos) => (
            <button
              key={pos}
              onClick={() => setFilterPosition(pos)}
              className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterPosition === pos ? 'bg-[#10B981] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}
            >
              {pos === 'All' ? 'Tümü' : pos}
            </button>
          ))}
        </div>

        {/* Athletes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-[3/4] bg-white/5 rounded-[32px] animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredAthletes.map((athlete, idx) => (
                <motion.div
                  key={athlete.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group relative bg-[#1A1A2E] rounded-[32px] overflow-hidden border border-white/5 hover:border-[#10B981]/50 transition-all shadow-2xl"
                >
                  {/* Card Header/Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={athlete.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${athlete.id}`} 
                      alt={athlete.full_name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent"></div>
                    
                    {/* Floating Rating */}
                    <div className="absolute top-6 left-6 flex flex-col items-center">
                      <div className="text-3xl font-black italic text-[#10B981] drop-shadow-lg">
                        {Math.floor(Math.random() * 15) + 80}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#10B981]/70">Rating</div>
                    </div>

                    {/* Elite Tag */}
                    <div className="absolute top-6 right-6">
                       <Star className="w-6 h-6 text-[#F5A623] fill-[#F5A623]" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 -mt-10 relative z-10">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold truncate group-hover:text-[#10B981] transition-colors">{athlete.full_name}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                        <span>{athlete.nationality}</span>
                        <span>•</span>
                        <span>{athlete.position}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Kulüp</div>
                        <div className="text-xs font-bold truncate">{athlete.current_club}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Yaş</div>
                        <div className="text-xs font-bold">{athlete.birth_date ? (new Date().getFullYear() - new Date(athlete.birth_date).getFullYear()) : 'N/A'}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        href={`/scout/reports?id=${athlete.id}`}
                        className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        Rapor <ChevronRight className="w-3 h-3" />
                      </Link>
                      <button 
                        onClick={() => toast.success(`${athlete.full_name} transfer listesine eklendi!`)}
                        className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-[#F5A623] hover:text-[#0D0D1A] rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        Listeye Ekle <ListPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAthletes.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Oyuncu Bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
          </div>
        )}
      </div>
    </div>
  )
}