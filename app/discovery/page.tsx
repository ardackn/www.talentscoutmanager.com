"use client"
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import Link from 'next/link'
import { ChevronLeft, Dna, Mail, X, Activity, User, Target, Shield, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  rating?: number
}

export default function DiscoveryPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState<Athlete | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
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
      .order('created_at', { ascending: false })

    if (!error && data) {
      setAthletes(data)
    }
    setLoading(false)
  }

  const filteredAthletes = athletes.filter(a => 
    (a.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContactAdmin = (player: Athlete) => {
    const subject = encodeURIComponent(`Inquiry about ${player.full_name}`)
    const body = encodeURIComponent(`Hello Admin,\n\nI am interested in connecting with ${player.full_name}. Please provide more information.\n\nThank you.`)
    window.location.href = `mailto:dcctsm@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white font-sans selection:bg-[#10B981] selection:text-[#05050A] pt-24">
      
      {/* Header */}
      <div className="pb-16 relative overflow-hidden text-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 relative z-10">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-white">Discovery Grid</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light tracking-wide relative z-10">
          Dünyanın dört bir yanından yetenekleri keşfedin. Bio-metrik analizleri inceleyin ve iletişim kurun.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-16 relative px-6">
        <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input 
          type="text"
          placeholder="Yetenek ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm focus:border-[#10B981] outline-none transition-all"
        />
      </div>

      {/* Grid */}
      <main className="container mx-auto px-6 max-w-7xl pb-32 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAthletes.map((player) => (
              <motion.div 
                key={player.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPlayer(player)}
                className="group cursor-pointer bg-[#0A0A14] border border-white/5 hover:border-[#10B981]/50 rounded-[32px] overflow-hidden transition-all shadow-lg hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={player.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.id}`} 
                    alt={player.full_name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#10B981]">
                    {player.position}
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <div className="absolute -top-10 right-6 w-16 h-16 rounded-2xl bg-[#05050A] border border-white/10 flex items-center justify-center text-2xl font-black italic shadow-xl group-hover:border-[#10B981] group-hover:text-[#10B981] transition-colors">
                    {player.rating || 85}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 truncate">{player.full_name}</h3>
                  
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded font-bold text-gray-400 uppercase tracking-widest">
                      {player.birth_date ? (new Date().getFullYear() - new Date(player.birth_date).getFullYear()) : 'N/A'} YAŞ
                    </span>
                    <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2.5 py-1 rounded font-black uppercase tracking-widest">
                      {player.nationality}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-[#0A0A14] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)] flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-[#10B981] text-white hover:text-black rounded-full flex items-center justify-center transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative">
                <img 
                  src={selectedPlayer.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPlayer.id}`} 
                  alt={selectedPlayer.full_name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-[10px] font-black uppercase tracking-[0.2em] rounded border border-[#10B981]/30">
                      {selectedPlayer.position}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Target className="w-3 h-3" /> {selectedPlayer.current_club || 'Independent'}
                    </span>
                  </div>

                  <h2 className="text-4xl font-black italic text-white uppercase mb-4">{selectedPlayer.full_name}</h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/5">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Score</div>
                      <div className="text-3xl font-black text-[#10B981] italic">{selectedPlayer.rating || 85}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Age</div>
                      <div className="text-2xl font-bold text-white mt-1">
                        {selectedPlayer.birth_date ? (new Date().getFullYear() - new Date(selectedPlayer.birth_date).getFullYear()) : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Nat</div>
                      <div className="text-2xl font-bold text-white mt-1">{selectedPlayer.nationality}</div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Dna className="w-4 h-4" /> Bio-Metric Analysis
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       Profesyonel AI analizi yakında bu profilde görüntülenecek.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleContactAdmin(selectedPlayer)}
                  className="w-full py-5 bg-white text-[#05050A] rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#10B981] transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Establish Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
