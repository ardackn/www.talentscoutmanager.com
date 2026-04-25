export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPolicy() {
  return (
    <div className="container min-h-screen py-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black mb-8 font-clash bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent">
          🔒 Güvenli ve Özel
        </h1>
        <p className="text-xl text-slate-300">GDPR uyumlu veri koruma ve şifreleme politikamız</p>
      </div>

      <div className="space-y-12">
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-8 font-clash">GDPR Uyumluluğu</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Talent Scout Manager, Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR) ile tam uyumludur. 
            Tüm kullanıcı verileri AES-256 şifreleme ile korunur ve yalnızca sizin izninizle paylaşılır.
          </p>
          <ul className="grid md:grid-cols-2 gap-6 text-slate-300">
            <li className="flex items-start gap-4">
              <span className="text-2xl mt-1">✅</span>
              <span>Veri sahipliği size aittir</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl mt-1">✅</span>
              <span>24/7 veri güvenliği</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl mt-1">✅</span>
              <span>Supabase enterprise security</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl mt-1">✅</span>
              <span>Silme hakkı (right to be forgotten)</span>
            </li>
          </ul>
        </section>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-8 font-clash">Şifreleme & Güvenlik</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[var(--red-primary)]">Veri Depolama</h3>
              <p className="text-slate-300">Video ve istatistikleriniz AES-256 ile şifrelenir. Supabase SOC2 Type 2 sertifikalıdır.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[var(--gold-primary)]">Transfer Güvenliği</h3>
              <p className="text-slate-300">Tüm iletişim TLS 1.3 ile korunur. 2FA opsiyonel olarak aktif edilebilir.</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[var(--red-primary)]/10 to-red-500/10 border border-[var(--red-primary)]/20 rounded-3xl p-12 text-center">
          <div className="text-6xl mb-8">🛡️</div>
          <h2 className="text-4xl font-black mb-6 font-clash text-white">Sıfır Tolerans Güvenlik Politikası</h2>
          <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
            Veri ihlali durumunda 24 saat içinde tam şeffaflık ve tazminat garantisi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-[var(--red-primary)] hover:bg-slate-100 font-bold text-lg px-12 py-8 rounded-2xl font-clash">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/50 hover:bg-white/10 font-bold text-lg px-12 py-8 rounded-2xl font-clash">
                Kayıt Ol
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-24 pt-12 border-t border-white/10 text-center text-sm text-slate-500">
        Son güncelleme: 2025 • <Link href="/terms" className="hover:text-white transition-colors">Kullanım Şartları</Link>
      </div>
    </div>
  )
}
