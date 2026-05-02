"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Search, Filter, TrendingUp, DollarSign, User, Shield, Info, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TransferListing {
  id: string
  full_name: string
  position: string
  age: number
  image_url: string
  price: string
  description: string
  created_at: string
}

export default function PublicTransferListPage() {
  const [listings, setListings] = useState<TransferListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('transfer_listings')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setListings(data)
    }
    setLoading(false)
  }

  const filteredListings = listings.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#05050A] text-white pt-24 pb-32 selection:bg-[#F5A623] selection:text-[#05050A]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5A623]/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30">
              <TrendingUp className="w-4 h-4" /> Global Transfer Market
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">
              Transfer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-white">Listesi</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-base">
              Yetenek avcıları tarafından listelenen potansiyelli oyuncuları keşfedin. Bio-metrik veriler ve transfer değerleri ile pazar analizi yapın.
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text"
            placeholder="Oyuncu veya pozisyon ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm focus:border-[#F5A623] outline-none transition-all placeholder:text-gray-600 font-medium"
          />
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[4/5] bg-white/5 rounded-[40px] animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-[#0D0D1A] border border-white/5 rounded-[48px] overflow-hidden group hover:border-[#F5A623]/50 transition-all shadow-2xl relative"
              >
                <div className="aspect-[5/4] relative overflow-hidden">
                  <img 
                    src={item.image_url || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/20 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#F5A623]">
                    {item.position}
                  </div>
                </div>
                
                <div className="p-10 -mt-12 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-black italic text-white uppercase group-hover:text-[#F5A623] transition-colors">{item.full_name}</h3>
                      <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">{item.age} Yaşında</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-white">{item.price || 'N/A'}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Market Value</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed mb-8">
                    {item.description || 'Bu oyuncu için henüz bir açıklama girilmedi.'}
                  </p>
                  
                  <button className="w-full py-5 bg-white/5 border border-white/10 hover:bg-[#F5A623] hover:text-[#05050A] rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                    Detaylı Analiz <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-32 bg-white/2 rounded-[60px] border border-dashed border-white/10">
            <Info className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-2">Oyuncu Bulunamadı</h3>
            <p className="text-gray-500 font-light tracking-widest">Transfer pazarında şu an listelenmiş oyuncu yok.</p>
          </div>
        )}
      </div>
    </div>
  )
}
