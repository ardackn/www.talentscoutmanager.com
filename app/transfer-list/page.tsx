"use client"

import { useState } from 'react'
import { Search, Info, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const GLOBAL_NAMES = [
  "James Smith", "John Johnson", "Robert Williams", "Michael Brown", "William Jones", 
  "David Garcia", "Richard Miller", "Joseph Davis", "Thomas Rodriguez", "Charles Martinez", 
  "Christopher Hernandez", "Daniel Lopez", "Matthew Gonzalez", "Anthony Wilson", "Mark Anderson", 
  "Donald Thomas", "Steven Taylor", "Paul Moore", "Andrew Jackson", "Joshua Martin", 
  "Kenneth Lee", "Kevin Perez", "Brian Thompson", "George White", "Timothy Harris", 
  "Ronald Sanchez", "Edward Clark", "Jason Ramirez", "Jeffrey Lewis", "Ryan Robinson", 
  "Jacob Walker", "Gary Young", "Nicholas Allen", "Eric King", "Jonathan Wright", 
  "Stephen Scott", "Larry Torres", "Justin Nguyen", "Scott Hill", "Brandon Flores", 
  "Benjamin Green", "Samuel Adams", "Gregory Nelson", "Alexander Baker", "Frank Hall", 
  "Patrick Rivera", "Raymond Campbell", "Jack Mitchell", "Dennis Carter", "Jerry Roberts", 
  // 50 end for sale
  "Tyler Gomez", "Aaron Phillips", "Jose Evans", "Adam Turner", "Nathan Diaz", 
  "Henry Parker", "Douglas Cruz", "Zachary Edwards", "Peter Collins", "Kyle Reyes", 
  "Ethan Stewart", "Walter Morris", "Noah Morales", "Jeremy Murphy", "Christian Cook", 
  "Keith Rogers", "Roger Gutierrez", "Terry Ortiz", "Gerald Morgan", "Harold Cooper", 
  "Sean Peterson", "Austin Bailey", "Carl Reed", "Arthur Kelly", "Lawrence Howard", 
  "Dylan Ramos", "Jesse Kim", "Jordan Cox", "Bryan Ward", "Billy Richardson"
  // 30 end for loan
];

const POSITIONS = ['Forvet', 'Orta Saha', 'Defans', 'Kaleci'];

interface PlayerListing {
  id: string;
  fullName: string;
  position: string;
  age: number;
  type: 'Satılık' | 'Kiralık';
}

const players: PlayerListing[] = GLOBAL_NAMES.map((name, index) => ({
  id: `player-${index}`,
  fullName: name,
  position: POSITIONS[index % POSITIONS.length],
  age: (index % 12) + 17, // 17 to 28
  type: index < 50 ? 'Satılık' : 'Kiralık'
}));

export default function TransferListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'Tümü' | 'Satılık' | 'Kiralık'>('Tümü')
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerListing | null>(null)

  const [formData, setFormData] = useState({
    clubName: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || p.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'Tümü' || p.type === filterType
    return matchesSearch && matchesType
  })

  const handleTransferClick = (player: PlayerListing) => {
    setSelectedPlayer(player)
    setSubmitStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlayer) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: selectedPlayer.fullName,
          senderClub: formData.clubName,
          senderPhone: formData.phone,
          senderEmail: formData.email,
          message: formData.message || `${selectedPlayer.fullName} için transfer görüşmesi talebi.`
        })
      })

      if (res.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          setSelectedPlayer(null)
          setFormData({ clubName: '', phone: '', email: '', message: '' })
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white pt-24 pb-32 selection:bg-[#F5A623] selection:text-[#05050A]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5A623]/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">
              Transfer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-white">Listesi</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-base">
              Satılık ve Kiralık profesyonel serbest oyuncular.
            </p>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-16 relative z-10">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Oyuncu veya mevki ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-16 pr-8 text-sm focus:border-[#F5A623] outline-none transition-all placeholder:text-gray-600 font-medium"
            />
          </div>
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-full h-[58px]">
            {['Tümü', 'Satılık', 'Kiralık'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  filterType === type 
                    ? 'bg-[#F5A623] text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredPlayers.map((player) => (
            <motion.div 
              key={player.id}
              whileHover={{ y: -5 }}
              className="bg-[#0D0D1A] border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#F5A623]/50 transition-all shadow-2xl relative"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    player.type === 'Satılık' 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {player.type}
                  </div>
                  <div className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400 border border-white/10">
                    Profesyonel
                  </div>
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl font-black italic text-white/50 border border-white/10 shadow-inner">
                    {player.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <h3 className="text-2xl font-black italic text-center text-white uppercase group-hover:text-[#F5A623] transition-colors mb-2">
                  {player.fullName}
                </h3>
                
                <div className="flex justify-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
                  <span>{player.age} Yaş</span>
                  <span>•</span>
                  <span className="text-[#F5A623]">{player.position}</span>
                  <span>•</span>
                  <span>Serbest</span>
                </div>
                
                <button 
                  onClick={() => handleTransferClick(player)}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-[#F5A623] hover:text-[#05050A] rounded-[16px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  Transfer Et
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-32 bg-white/2 rounded-[40px] border border-dashed border-white/10 relative z-10">
            <Info className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase italic mb-2">Sonuç Bulunamadı</h3>
            <p className="text-gray-500 font-light tracking-widest">Kriterlerinize uygun oyuncu bulunmuyor.</p>
          </div>
        )}

        {/* Transfer Modal */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0D0D1A] border border-white/10 rounded-[32px] p-8 max-w-md w-full relative"
              >
                <button 
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-black italic uppercase mb-2">Transfer Talebi</h2>
                <p className="text-gray-400 text-sm mb-8">
                  <span className="text-[#F5A623] font-bold">{selectedPlayer.fullName}</span> ({selectedPlayer.type}) için kulübünüz adına talep gönderin.
                </p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-emerald-500 font-bold text-lg mb-2">Talep Gönderildi!</h3>
                    <p className="text-sm text-gray-400">En kısa sürede sizinle iletişime geçilecektir.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kulüp İsmi</label>
                      <input 
                        type="text" 
                        required
                        value={formData.clubName}
                        onChange={e => setFormData({...formData, clubName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#F5A623] outline-none transition-colors"
                        placeholder="Örn: Galatasaray A.Ş."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">İletişim Numarası</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#F5A623] outline-none transition-colors"
                        placeholder="+90 555 555 5555"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-posta</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#F5A623] outline-none transition-colors"
                        placeholder="ornek@kulup.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">İletişim (Mesaj)</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#F5A623] outline-none transition-colors min-h-[100px] resize-none"
                        placeholder="Transfer şartları hakkında bilgi almak istiyoruz..."
                      ></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-xs text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 mt-4 bg-[#F5A623] text-black hover:bg-white rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Talebi Gönder'}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
