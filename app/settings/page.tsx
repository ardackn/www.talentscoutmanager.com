"use client"

import { useState, useEffect } from 'react'
import { useSession } from '@/hooks/use-session'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { User, Mail, Shield, Save, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { session, profile, loading: sessionLoading } = useSession()
  const supabase = createClientComponentClient()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: session?.user?.email || '',
        phone: profile.phone || '',
      })
    }
  }, [profile, session])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
        })
        .eq('id', session.user.id)

      if (error) throw error
      toast.success('Profil başarıyla güncellendi!')
    } catch (error: any) {
      toast.error('Hata: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050806]">
        <Loader2 className="w-8 h-8 text-[#00D26A] animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050806] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lütfen giriş yapın.</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#050806] text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Hesap Ayarları</h1>
          <p className="text-gray-400">Profil bilgilerinizi ve hesap ayarlarınızı buradan yönetebilirsiniz.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full text-left px-6 py-4 rounded-2xl bg-white/5 border border-[#00D26A]/30 text-[#00D26A] font-bold flex items-center gap-3">
              <User className="w-5 h-5" /> Profil Bilgileri
            </button>
            <button className="w-full text-left px-6 py-4 rounded-2xl bg-transparent text-gray-500 font-bold flex items-center gap-3 hover:bg-white/5 transition-all">
              <Shield className="w-5 h-5" /> Güvenlik
            </button>
            <button className="w-full text-left px-6 py-4 rounded-2xl bg-transparent text-gray-500 font-bold flex items-center gap-3 hover:bg-white/5 transition-all">
              <Mail className="w-5 h-5" /> Bildirimler
            </button>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3">Tam Ad Soyad</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-[#00D26A] focus:outline-none transition-all"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                  </div>

                  {/* Email (Read Only) */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3">E-posta (Değiştirilemez)</label>
                    <div className="relative opacity-50">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="email"
                        value={formData.email}
                        readOnly
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3">Telefon Numarası</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">TR</div>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-[#00D26A] focus:outline-none transition-all"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 rounded-2xl bg-[#00D26A] text-black font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#00D26A]/20"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
