"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'
import { createConfirmedUser } from '@/app/actions/auth'
import { ALL_COUNTRIES } from '@/lib/countries'

const COUNTRIES = ALL_COUNTRIES
const POSITIONS = ['Kaleci', 'Stoper', 'Sol Bek', 'Sağ Bek', 'Defans Ortası', 'Merkez Orta Saha', 'Ofansif Orta Saha', 'Sol Kanat', 'Sağ Kanat', 'Forvet / Santrafor']
const LEVELS = ['Amatör', 'Bölgesel Lig', 'İl Ligi', 'Alt Lig', 'Profesyonel', 'Akademi / U17', 'Akademi / U19', 'Akademi / U21']

export default function PlayerRegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', birthDate: '', nationality: '', city: '',
    position: '', dominantFoot: '', currentClub: '', level: '',
    bio: '', profilePicture: null as File | null,
    videoFile: null as File | null,
  })

  const set = (key: string, value: string | File) => setForm(f => ({ ...f, [key]: value }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      set('profilePicture', file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // All-in-one registration on server (Auth + Profile + Athlete Profile)
      const res = await createConfirmedUser(form.email, form.password, form.fullName, 'athlete', {
        nationality: form.nationality,
        city: form.city,
        position: form.position,
        dominantFoot: form.dominantFoot
      })

      if (!res.success) {
        throw new Error(res.error)
      }

      toast.success('Kayıt Başarılı! Yönlendiriliyorsunuz...')
      
      // Auto-Login
      await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })

      router.push('/athlete/dashboard')
    } catch (err: any) {
      console.error('Registration error:', err)
      toast.error(err.message || 'Kayıt sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(0,229,204,0.25)',
    borderRadius: '8px',
    color: 'white',
    padding: '14px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  }

  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '8px' }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center" style={{ background: '#05050A' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/data/logo.png" alt="TSM" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl">TSM</span>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: 'rgba(0,229,204,0.15)', color: '#00e5cc', border: '1px solid rgba(0,229,204,0.3)' }}>
            ⚽ Oyuncu Kaydı — Ücretsiz
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Profilini Oluştur</h1>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,229,204,0.15)' }}>

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Ad Soyad *</label>
                  <input style={inputStyle} value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Ad Soyad" />
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
                  <label style={labelStyle}>Uyruk *</label>
                  <select style={inputStyle} value={form.nationality} onChange={e => set('nationality', e.target.value)}>
                    <option value="">Seçin</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label style={labelStyle}>Şehir *</label>
                  <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Yaşadığınız şehir..." />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-4 font-black text-base mt-4 hover:scale-[1.02] transition-all uppercase tracking-widest"
                style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px' }}
              >
                İleri →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Pozisyon *</label>
                  <select style={inputStyle} value={form.position} onChange={e => set('position', e.target.value)}>
                    <option value="">Seçin</option>
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Dominant Ayak *</label>
                  <select style={inputStyle} value={form.dominantFoot} onChange={e => set('dominantFoot', e.target.value)}>
                    <option value="">Seçin</option>
                    <option value="Sağ">Sağ</option>
                    <option value="Sol">Sol</option>
                    <option value="Her İkisi">Her İkisi</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/20 text-white rounded-lg">Geri</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-base hover:scale-[1.02] transition-all uppercase tracking-widest"
                  style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px' }}
                >
                  {loading ? 'İşleniyor...' : 'Kayıt Ol'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
