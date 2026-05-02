"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Dna, Mail, X, Activity, User, Target, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Extended Mock Player Data
const ALL_PLAYERS = [
  { id: 1, name: 'D. Okafor', age: 19, pos: 'ST', team: 'Bundesliga Acad.', score: 9.2, code: 'SUB-001', image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=500&h=500&fit=crop&q=80', description: 'Exceptional sprint speed and finishing. Shows high genetic predisposition for fast-twitch muscle fibers.' },
  { id: 2, name: 'L. Vargas', age: 21, pos: 'AMF', team: 'Premier LG', score: 8.4, code: 'SUB-002', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&q=80', description: 'Elite spatial awareness and playmaking vision. Bio-metrics show incredible stamina.' },
  { id: 3, name: 'T. Adeyemi', age: 18, pos: 'LWF', team: 'Serie A Acad.', score: 8.9, code: 'SUB-003', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80', description: 'Highly explosive winger with exceptional agility metrics.' },
  { id: 4, name: 'M. Kaya', age: 22, pos: 'LB', team: 'Süper Lig', score: 7.8, code: 'SUB-004', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80', description: 'Relentless overlapping full-back. VO2 max scores in the 99th percentile.' },
  { id: 5, name: 'Eren Demir', age: 20, pos: 'ST', team: 'Independent', score: 9.4, code: 'SUB-005', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop&q=80', description: 'Clinical finisher with outstanding core strength parameters.' },
  { id: 6, name: 'Alper Yalçın', age: 21, pos: 'CM', team: 'Independent', score: 9.1, code: 'SUB-006', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80', description: 'Dictates the tempo with flawless passing range and high cognitive processing speed.' },
  { id: 7, name: 'Barış Köse', age: 19, pos: 'LW', team: 'TFF 1. Lig', score: 8.9, code: 'SUB-007', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=500&fit=crop&q=80', description: 'Unpredictable dribbler with an incredibly low center of gravity.' },
  { id: 8, name: 'Mustafa Duman', age: 22, pos: 'CB', team: 'Independent', score: 8.8, code: 'SUB-008', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=500&fit=crop&q=80', description: 'Dominant aerial presence and elite defensive positioning metrics.' },
  { id: 9, name: 'S. Rodriguez', age: 18, pos: 'RW', team: 'La Liga Acad.', score: 9.5, code: 'SUB-009', image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=500&h=500&fit=crop&q=80', description: 'A generational talent showing off-the-charts acceleration data.' },
  { id: 10, name: 'K. Nakamura', age: 20, pos: 'CAM', team: 'J1 League', score: 8.6, code: 'SUB-010', image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=500&h=500&fit=crop&q=80', description: 'Masterful technician with unmatched passing accuracy under pressure.' },
  { id: 11, name: 'J. Silva', age: 19, pos: 'CDM', team: 'Brasileiro', score: 8.7, code: 'SUB-011', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=500&fit=crop&q=80', description: 'Aggressive ball-winner with elite recovery sprint metrics.' },
  { id: 12, name: 'O. Mensah', age: 21, pos: 'CB', team: 'Ligue 1', score: 9.0, code: 'SUB-012', image: 'https://images.unsplash.com/photo-1517457210515-b7f7fcbd83a8?w=500&h=500&fit=crop&q=80', description: 'A physical specimen with unmatched tackling efficiency.' },
]

export default function DiscoveryPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof ALL_PLAYERS[0] | null>(null)

  const handleContactAdmin = (player: typeof ALL_PLAYERS[0]) => {
    const subject = encodeURIComponent(`Inquiry about ${player.name} (${player.code})`)
    const body = encodeURIComponent(`Hello Admin,\n\nI am interested in connecting with ${player.name} (${player.code}). Please provide more information.\n\nThank you.`)
    window.location.href = `mailto:dcctsm@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white font-sans selection:bg-[#10B981] selection:text-[#05050A]">
      
      {/* Redundant Navbar removed to avoid overlap with global Navbar */}


      {/* Header */}
      <div className="pt-32 pb-16 relative overflow-hidden text-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 relative z-10">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-white">Discovery Grid</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light tracking-wide relative z-10">
          Explore the world's most comprehensive bio-genetic talent database. Click on a subject to analyze their metrics and establish communication.
        </p>
      </div>

      {/* Grid */}
      <main className="container mx-auto px-6 max-w-7xl pb-32 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALL_PLAYERS.map((player) => (
            <motion.div 
              key={player.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPlayer(player)}
              className="group cursor-pointer bg-[#0A0A14] border border-white/5 hover:border-[#10B981]/50 rounded-[32px] overflow-hidden transition-all shadow-lg hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#10B981]">
                  {player.code}
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute -top-10 right-6 w-16 h-16 rounded-2xl bg-[#05050A] border border-white/10 flex items-center justify-center text-2xl font-black italic shadow-xl group-hover:border-[#10B981] group-hover:text-[#10B981] transition-colors">
                  {player.score}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{player.name}</h3>
                
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded font-bold text-gray-400 uppercase tracking-widest">{player.age} YRS</span>
                  <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2.5 py-1 rounded font-black uppercase tracking-widest">{player.pos}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
                <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-[10px] font-black uppercase tracking-[0.2em] rounded border border-[#10B981]/30">
                      {selectedPlayer.code}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Target className="w-3 h-3" /> {selectedPlayer.team}
                    </span>
                  </div>

                  <h2 className="text-4xl font-black italic text-white uppercase mb-4">{selectedPlayer.name}</h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/5">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Score</div>
                      <div className="text-3xl font-black text-[#10B981] italic">{selectedPlayer.score}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Age</div>
                      <div className="text-2xl font-bold text-white mt-1">{selectedPlayer.age}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Pos</div>
                      <div className="text-2xl font-bold text-white mt-1">{selectedPlayer.pos}</div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Dna className="w-4 h-4" /> Bio-Metric Analysis
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedPlayer.description}
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
