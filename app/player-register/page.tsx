"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'

const COUNTRIES = ['Türkiye', 'Brezilya', 'Arjantin', 'Nijerya', 'Fransa', 'Almanya', 'İspanya', 'İngiltere', 'Portekiz', 'İtalya', 'Hollanda', 'Belçika', 'Uruguay', 'Kolombiya', 'Meksika', 'Diğer']
const POSITIONS = ['Kaleci', 'Stoper', 'Sol Bek', 'Sağ Bek', 'Defans Ortası', 'Merkez Orta Saha', 'Ofansif Orta Saha', 'Sol Kanat', 'Sağ Kanat', 'Forvet / Santrafor']
const LEVELS = ['Amatör', 'Bölgesel Lig', 'İl Ligi', 'Alt Lig', 'Profesyonel', 'Akademi / U17', 'Akademi / U19', 'Akademi / U21']

export default function PlayerRegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', birthDate: '', nationality: '',
    position: '', dominantFoot: '', currentClub: '', level: '',
    bio: '', profilePicture: null as File | null,
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            role: 'athlete',
            full_name: form.fullName,
            phone: form.phone,
            birth_date: form.birthDate,
            nationality: form.nationality,
            position: form.position,
            dominant_foot: form.dominantFoot,
            current_club: form.currentClub,
            level: form.level,
            bio: form.bio,
          }
        }
      })

      if (authError) throw authError

      if (authData.user && form.profilePicture) {
        const ext = form.profilePicture.name.split('.').pop()
        const filePath = `${authData.user.id}/avatar.${ext}`
        await supabase.storage.from('avatars').upload(filePath, form.profilePicture, { upsert: true })
      }

      toast.success('Profiliniz oluşturuldu! E-postanızı doğrulayın.')
      router.push('/player-login')
    } catch (err: any) {
      toast.error(err.message || 'Kayıt sırasında hata oluştu.')
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
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center" style={{ background: '#0d1b2a' }}>
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
          <p className="text-gray-400">3 adımda küresel scouting ağına katıl</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all"
                style={{
                  background: step >= s ? '#00e5cc' : 'rgba(255,255,255,0.1)',
                  color: step >= s ? '#0d1b2a' : '#6b7280',
                  boxShadow: step === s ? '0 0 20px rgba(0,229,204,0.5)' : 'none',
                }}
              >
                {s}
              </div>
              <span className="text-xs font-medium" style={{ color: step >= s ? '#00e5cc' : '#6b7280' }}>
                {s === 1 ? 'Kişisel' : s === 2 ? 'Futbol' : 'Profil'}
              </span>
              {s < 3 && <div className="absolute" />}
            </div>
          ))}
          <div className="hidden">progress</div>
        </div>
        {/* Progress line */}
        <div className="relative -mt-8 mb-10 mx-10">
          <div className="h-1 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
          <div className="h-1 rounded-full absolute top-0 left-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%`, background: '#00e5cc', boxShadow: '0 0 10px rgba(0,229,204,0.6)' }}></div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,229,204,0.15)' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Kişisel Bilgiler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Ad Soyad *</label>
                  <input style={inputStyle} value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Arda Güler" />
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
                <div>
                  <label style={labelStyle}>Doğum Tarihi *</label>
                  <input style={inputStyle} type="date" value={form.birthDate} onChange={e => set('birthDate', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Uyruk *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.nationality} onChange={e => set('nationality', e.target.value)}>
                    <option value="">Seçin</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.fullName || !form.email || !form.password || !form.phone || !form.birthDate || !form.nationality) {
                    toast.error('Lütfen tüm zorunlu alanları doldurun.')
                    return
                  }
                  setStep(2)
                }}
                className="w-full py-4 font-black text-base mt-4 hover:scale-[1.02] transition-all"
                style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,229,204,0.3)' }}
              >
                İleri →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Futbol Profili</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Pozisyon *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.position} onChange={e => set('position', e.target.value)}>
                    <option value="">Seçin</option>
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Dominant Ayak *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.dominantFoot} onChange={e => set('dominantFoot', e.target.value)}>
                    <option value="">Seçin</option>
                    <option value="Sağ">Sağ</option>
                    <option value="Sol">Sol</option>
                    <option value="Her İkisi">Her İkisi</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Mevcut Kulüp (Opsiyonel)</label>
                  <input style={inputStyle} value={form.currentClub} onChange={e => set('currentClub', e.target.value)} placeholder="Kulüp adı..." />
                </div>
                <div>
                  <label style={labelStyle}>Lig / Seviye *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.level} onChange={e => set('level', e.target.value)}>
                    <option value="">Seçin</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 font-bold text-sm hover:opacity-80 transition-all" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', background: 'transparent' }}>
                  ← Geri
                </button>
                <button
                  onClick={() => {
                    if (!form.position || !form.dominantFoot || !form.level) {
                      toast.error('Lütfen zorunlu futbol bilgilerini doldurun.')
                      return
                    }
                    setStep(3)
                  }}
                  className="flex-1 py-4 font-black text-base hover:scale-[1.02] transition-all"
                  style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,229,204,0.3)' }}
                >
                  İleri →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Profil Görseli</h2>

              {/* Image Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-4" style={{ borderColor: previewImage ? '#00e5cc' : 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">⚽</span>
                  )}
                </div>
                <label className="cursor-pointer px-6 py-3 text-sm font-bold rounded-lg transition-all hover:opacity-80" style={{ border: '1px solid #00e5cc', color: '#00e5cc', borderRadius: '8px' }}>
                  {previewImage ? 'Fotoğrafı Değiştir' : 'Fotoğraf Yükle *'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* Bio */}
              <div>
                <label style={labelStyle}>Kısa Bio (Opsiyonel)</label>
                <textarea
                  style={{ ...inputStyle, resize: 'none', minHeight: '90px' }}
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="Kendinizi kısaca tanıtın..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button onClick={() => setStep(2)} className="flex-1 py-4 font-bold text-sm hover:opacity-80 transition-all" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', background: 'transparent' }}>
                  ← Geri
                </button>
                <button
                  onClick={() => {
                    if (!form.profilePicture) {
                      toast.error('Profil fotoğrafı zorunludur.')
                      return
                    }
                    handleSubmit()
                  }}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-base transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,229,204,0.4)' }}
                >
                  {loading ? 'Oluşturuluyor...' : '✅ Profil Oluştur'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Zaten hesabın var mı?{' '}
          <Link href="/player-login" className="font-bold hover:underline" style={{ color: '#00e5cc' }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  )
}
