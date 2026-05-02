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
          <div className="flex gap-4 mb-8">
            <a href="https://www.facebook.com/profile.php?id=61573632518781" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00D26A] hover:text-black transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/talentscoutmanager/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E94560] hover:text-black transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://x.com/talentscouttsm" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-black transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.linkedin.com/groups/18520016/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077B5] hover:text-black transition-all">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
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
