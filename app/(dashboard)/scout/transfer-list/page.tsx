"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Plus, Trash2, Globe, TrendingUp, DollarSign, User, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface TransferListing {
  id: string
  full_name: string
  position: string
  age: number
  image_url: string
  price: string
  description: string
  is_published: boolean
}

export default function ScoutTransferListPage() {
  const [listings, setListings] = useState<TransferListing[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newListing, setNewListing] = useState({
    full_name: '',
    position: '',
    age: '',
    image_url: '',
    price: '',
    description: '',
  })
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('transfer_listings')
      .select('*')
      .eq('scout_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setListings(data)
    }
    setLoading(false)
  }

  const handleAddListing = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Oturum açmanız gerekiyor')
      return
    }

    if (!newListing.full_name || !newListing.position) {
      toast.error('Lütfen zorunlu alanları doldurun')
      return
    }

    const { error } = await supabase
      .from('transfer_listings')
      .insert({
        scout_id: user.id,
        full_name: newListing.full_name,
        position: newListing.position,
        age: parseInt(newListing.age) || null,
        image_url: newListing.image_url,
        price: newListing.price,
        description: newListing.description,
      })

    if (error) {
      toast.error('Hata: ' + error.message)
    } else {
      toast.success('Oyuncu transfer listesine eklendi!')
      setShowAddForm(false)
      setNewListing({ full_name: '', position: '', age: '', image_url: '', price: '', description: '' })
      fetchListings()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('transfer_listings')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Silinemedi')
    } else {
      toast.success('İlan silindi')
      fetchListings()
    }
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-2">
              Transfer <span className="text-[#F5A623]">Pazarı</span>
            </h1>
            <p className="text-gray-400">Yönettiğiniz veya keşfettiğiniz oyuncuları listeye ekleyin.</p>
          </div>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-[#F5A623] text-[#05050A] px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(245,166,35,0.3)]"
          >
            <Plus className="w-5 h-5" /> Yeni İlan Ekle
          </button>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-[#0A0A14] border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#F5A623]/30 transition-all"
              >
                <div className="aspect-[4/3] relative">
                  <img 
                    src={item.image_url || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 -mt-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{item.full_name}</h3>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#F5A623]/10 text-[#F5A623] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#F5A623]/20">
                      {item.position}
                    </span>
                    <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {item.age} YAŞ
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="text-xl font-black text-white">{item.price || 'Pazarlıkta'}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center gap-1">
                       <TrendingUp className="w-3 h-3" /> Listelendi
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <h3 className="text-2xl font-bold mb-2">Henüz ilanınız yok</h3>
            <p className="text-gray-500 mb-8">Hemen bir oyuncuyu transfer listesine ekleyin.</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-[#F5A623] font-bold uppercase tracking-widest text-sm hover:underline"
            >
              + İlk İlanı Oluştur
            </button>
          </div>
        )}
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A14] border border-white/10 rounded-[40px] p-10 overflow-hidden"
            >
              <h2 className="text-3xl font-black uppercase italic mb-8">Oyuncuyu <span className="text-[#F5A623]">Listele</span></h2>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Ad Soyad *</label>
                  <input 
                    value={newListing.full_name}
                    onChange={(e) => setNewListing({...newListing, full_name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all"
                    placeholder="Oyuncu adı..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Pozisyon *</label>
                    <input 
                      value={newListing.position}
                      onChange={(e) => setNewListing({...newListing, position: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all"
                      placeholder="Örn: ST, LW..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Yaş</label>
                    <input 
                      type="number"
                      value={newListing.age}
                      onChange={(e) => setNewListing({...newListing, age: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all"
                      placeholder="21"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Resim URL (Manuel Giriş)</label>
                  <input 
                    value={newListing.image_url}
                    onChange={(e) => setNewListing({...newListing, image_url: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Transfer Değeri / Fiyat</label>
                  <input 
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all"
                    placeholder="Örn: €10M veya Pazarlık"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Açıklama / Özellikler</label>
                  <textarea 
                    value={newListing.description}
                    onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#F5A623] outline-none transition-all h-24 resize-none"
                    placeholder="Oyuncunun öne çıkan teknik ve fiziksel özellikleri..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-4 bg-white/5 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Vazgeç
                  </button>
                  <button 
                    onClick={handleAddListing}
                    className="flex-1 py-4 bg-[#F5A623] text-[#05050A] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all"
                  >
                    İlanı Yayınla
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
