"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'

const COUNTRIES = ['Türkiye', 'Brezilya', 'Arjantin', 'Nijerya', 'Fransa', 'Almanya', 'İspanya', 'İngiltere', 'Portekiz', 'İtalya', 'Hollanda', 'Belçika', 'Uruguay', 'Kolombiya', 'Meksika', 'Diğer']

export default function ScoutRegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', country: '',
    organization: '', experienceYears: '', specialization: '', licenseNo: '',
  })

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            role: 'scout',
            full_name: form.fullName,
            phone: form.phone,
            country: form.country,
            organization: form.organization,
            experience_years: form.experienceYears,
            specialization: form.specialization,
            license_no: form.licenseNo,
            subscription_tier: 'free',
          }
        }
      })
      if (error) throw error
      toast.success('Hesabınız oluşturuldu! E-postanızı doğrulayın.')
      router.push('/scout-login')
    } catch (err: any) {
      toast.error(err.message || 'Kayıt sırasında hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(245,166,35,0.25)',
    borderRadius: '8px',
    color: 'white',
    padding: '14px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  }

  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '8px' }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center" style={{ background: '#0d1b2a' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/data/logo.png" alt="TSM" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl">TSM</span>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
            🔍 Scout Kaydı
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Scout Hesabı Oluştur</h1>
          <p className="text-gray-400">2 adımda ücretsiz izci hesabına kavuş</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all"
                style={{
                  background: step >= s ? '#f5a623' : 'rgba(255,255,255,0.1)',
                  color: step >= s ? '#0d1b2a' : '#6b7280',
                  boxShadow: step === s ? '0 0 20px rgba(245,166,35,0.5)' : 'none',
                }}
              >
                {s}
              </div>
              <span className="text-xs font-medium" style={{ color: step >= s ? '#f5a623' : '#6b7280' }}>
                {s === 1 ? 'Hesap Bilgileri' : 'Profesyonel'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mb-10 mx-16">
          <div className="h-1 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
          <div className="h-1 rounded-full absolute top-0 left-0 transition-all duration-500" style={{ width: step === 2 ? '100%' : '0%', background: '#f5a623', boxShadow: '0 0 10px rgba(245,166,35,0.6)' }}></div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,166,35,0.15)' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Hesap Bilgileri</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Ad Soyad *</label>
                  <input style={inputStyle} value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Ahmet Yılmaz" />
                </div>
                <div>
                  <label style={labelStyle}>E-posta *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="ornek@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>Şifre *</label>
                  <input style={inputStyle} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="En az 6 karakter" />
                </div>
                <div>
                  <label style={labelStyle}>Telefon *</label>
                  <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+90 555 000 00 00" />
                </div>
                <div className="sm:col-span-2">
                  <label style={labelStyle}>Ülke *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.country} onChange={e => set('country', e.target.value)}>
                    <option value="">Seçin</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.fullName || !form.email || !form.password || !form.phone || !form.country) {
                    toast.error('Lütfen tüm zorunlu alanları doldurun.')
                    return
                  }
                  setStep(2)
                }}
                className="w-full py-4 font-black text-base mt-4 hover:scale-[1.02] transition-all"
                style={{ background: '#f5a623', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(245,166,35,0.3)' }}
              >
                İleri →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Profesyonel Bilgiler</h2>

              {/* Free Plan Badge */}
              <div className="flex items-center gap-3 p-4 rounded-2xl mb-4" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-sm font-bold text-white">Ücretsiz Plan ile Başlıyorsunuz</p>
                  <p className="text-xs text-gray-400">Kayıt sonrası Premium'a yükseltebilirsiniz.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Kulüp / Organizasyon (Opsiyonel)</label>
                  <input style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Bağımsız / Kulüp adı" />
                </div>
                <div>
                  <label style={labelStyle}>Deneyim Yılı *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.experienceYears} onChange={e => set('experienceYears', e.target.value)}>
                    <option value="">Seçin</option>
                    <option value="0-1">0-1 yıl</option>
                    <option value="2-5">2-5 yıl</option>
                    <option value="6-10">6-10 yıl</option>
                    <option value="10+">10+ yıl</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Uzmanlık Alanı *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.specialization} onChange={e => set('specialization', e.target.value)}>
                    <option value="">Seçin</option>
                    <option value="Gençlik">Gençlik Scouting</option>
                    <option value="Profesyonel">Profesyonel Scouting</option>
                    <option value="Her İkisi">Her İkisi</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Lisans / Belge No (Opsiyonel)</label>
                  <input style={inputStyle} value={form.licenseNo} onChange={e => set('licenseNo', e.target.value)} placeholder="UEFA A, B lisans vb." />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 font-bold text-sm hover:opacity-80 transition-all" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', background: 'transparent' }}>
                  ← Geri
                </button>
                <button
                  onClick={() => {
                    if (!form.experienceYears || !form.specialization) {
                      toast.error('Lütfen zorunlu alanları doldurun.')
                      return
                    }
                    handleSubmit()
                  }}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-base transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: '#f5a623', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
                >
                  {loading ? 'Oluşturuluyor...' : '🔍 Scout Hesabı Oluştur'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Zaten hesabın var mı?{' '}
          <Link href="/scout-login" className="font-bold hover:underline" style={{ color: '#f5a623' }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  )
}
