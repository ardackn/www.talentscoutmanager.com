"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function Footer() {
  const { t } = useTranslation('legal')
  const [formData, setFormData] = useState({ email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        toast.success('Mesajınız başarıyla gönderildi!')
        setFormData({ email: '', phone: '', message: '' })
      } else {
        toast.error('Mesaj gönderilirken hata oluştu.')
      }
    } catch {
      toast.error('Bağlantı hatası.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer id="contact" className="border-t border-white/10 py-16 bg-[#050806] text-white">
      <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img src="/data/logo.png" alt="TSM Logo" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Yetenek Avcısı Yöneticisi — Coğrafi engelleri aşarak yetenekleri dünyaya açıyor.
          </p>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00D26A] shrink-0 mt-0.5" />
              <span>Nurol Kulesi, İzzet Paşa, Yeni Yol Cd. No:3, 34387 Şişli/İstanbul</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#00D26A] shrink-0" />
              <span>+90 532 419 38 75</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00D26A] shrink-0" />
              <span>hello@talentscoutmanager.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Platform</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/player-login" className="hover:text-[#00e5cc] transition-colors">⚽ Oyuncu Girişi</Link></li>
            <li><Link href="/scout-login" className="hover:text-[#f5a623] transition-colors">🔍 İzci Girişi</Link></li>
            <li><Link href="/player-register" className="hover:text-[#00e5cc] transition-colors">Ücretsiz Kayıt</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link></li>
          </ul>
          
          <h4 className="font-bold text-lg mb-4 mt-8">Yasal</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/privacy" className="hover:text-[#00D26A] transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/terms" className="hover:text-[#00D26A] transition-colors">Hizmet Şartları</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#00D26A] transition-colors">İade ve İptal Politikası</Link></li>
          </ul>
        </div>

        {/* Map Image Link */}
        <div>
          <h4 className="font-bold text-lg mb-6">Konumumuz</h4>
          <a 
            href="https://maps.app.goo.gl/NurolKulesiSisli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden border border-white/10 hover:border-[#00D26A]/50 transition-all group relative"
          >
            {/* Using a professional placeholder map image */}
            <img 
              src="/data/map_nurol.png" 
              alt="Google Maps Nurol Kulesi" 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-[#00D26A] text-black font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Haritada Gör
              </span>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div>
          <h4 className="font-bold text-lg mb-6">Bize Ulaşın</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="email" 
              placeholder="E-posta Adresiniz" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00D26A] focus:outline-none transition-colors"
            />
            <input 
              type="tel" 
              placeholder="Telefon Numaranız" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00D26A] focus:outline-none transition-colors"
            />
            <textarea 
              placeholder="Mesajınız..." 
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00D26A] focus:outline-none transition-colors resize-none"
            ></textarea>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#00D26A] text-black font-bold py-3 rounded-xl hover:bg-[#00e676] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : <><Send className="w-4 h-4" /> Mesaj Gönder</>}
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-white/10 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© 2026 TSM Platform. Tüm hakları saklıdır.</div>
        <div className="font-semibold text-gray-400">Coğrafya kader değildir.</div>
      </div>
    </footer>
  )
}
