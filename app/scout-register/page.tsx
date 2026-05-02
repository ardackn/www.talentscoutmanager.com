"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'
import { Dna, Network, Shield } from 'lucide-react'

const COUNTRIES = ['United States', 'United Kingdom', 'Brazil', 'Argentina', 'Nigeria', 'France', 'Germany', 'Spain', 'Portugal', 'Italy', 'Netherlands', 'Belgium', 'Uruguay', 'Colombia', 'Mexico', 'Other']

import { Database } from '@/types/supabase'

export default function ScoutRegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient<any>()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', country: '',
    organization: '', experienceYears: '', specialization: '', licenseNo: '',
  })

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Geçerli bir e-posta adresi giriniz.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/scout-login`,
          data: {
            role: 'scout',
            full_name: form.fullName,
          }
        }
      })

      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
          throw new Error('Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapın.')
        }
        throw error
      }
      if (!authData.user) throw new Error('Kayıt başarısız oldu. Lütfen tekrar deneyin.')

      const userId = authData.user.id

      // 1. Create Profile record (upsert handles trigger-created profiles)
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        role: 'scout',
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        subscription_tier: 'free',
        subscription_status: 'inactive'
      }, { onConflict: 'id' })

      if (profileError && !profileError.code?.includes('23505')) {
        console.warn('Profile upsert warning:', profileError.message)
        // Non-fatal
      }

      // 2. Create Scout Profile
      const { error: scoutError } = await supabase.from('scout_profiles').insert({
        user_id: userId,
        full_name: form.fullName,
        club_or_agency: form.organization || null,
        country: form.country,
        years_experience: parseInt(form.experienceYears) || 0,
        license_number: form.licenseNo || null,
      })

      if (scoutError) {
        if (scoutError.code === '23505') {
          // Duplicate - likely already exists, not fatal
          console.warn('Scout profile may already exist:', scoutError.message)
        } else {
          throw new Error(`İzci profili oluşturulamadı: ${scoutError.message}`)
        }
      }

      toast.success('Kayıt başarılı! Lütfen e-postanızı doğrulamak için gelen kutunuzu kontrol edin.')
      router.push('/scout-login')
    } catch (err: any) {
      console.error('Scout registration error:', err)
      toast.error(err.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '12px',
    color: 'white',
    padding: '14px 20px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
  }

  const labelStyle = { display: 'block', fontSize: '10px', fontWeight: '900', color: '#10B981', textTransform: 'uppercase' as const, letterSpacing: '0.2em', marginBottom: '8px' }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-[#05050A] relative overflow-hidden">
      {/* Bio-grid background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-3xl font-black tracking-tighter text-white">TSM<span className="text-[#10B981]">.</span></span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
            <Network className="w-4 h-4" /> İzci (Scout) Kaydı
          </div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">Platforma Katıl</h1>
          <p className="text-gray-400 font-light text-sm uppercase tracking-widest">2 adımda global yetenek ağına bağlan</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-8 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500"
                style={{
                  background: step >= s ? '#10B981' : 'rgba(255,255,255,0.05)',
                  color: step >= s ? '#05050A' : '#6b7280',
                  boxShadow: step === s ? '0 0 30px rgba(16,185,129,0.4)' : 'none',
                }}
              >
                {s}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: step >= s ? '#10B981' : '#6b7280' }}>
                {s === 1 ? 'Kişisel Bilgiler' : 'Profesyonel Detaylar'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mb-12 mx-16">
          <div className="h-1 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
          <div className="h-1 rounded-full absolute top-0 left-0 transition-all duration-700 ease-in-out" style={{ width: step === 2 ? '100%' : '0%', background: '#10B981', boxShadow: '0 0 15px rgba(16,185,129,0.5)' }}></div>
        </div>

        {/* Form Card */}
        <div className="rounded-[40px] p-8 md:p-12 backdrop-blur-xl bg-[#0A0A14]/80 border border-[#10B981]/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                 <Shield className="w-5 h-5 text-[#10B981]" />
                 <h2 className="text-lg font-black text-white uppercase tracking-widest">Operator Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Ad Soyad *</label>
                  <input style={inputStyle} value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Ahmet Yılmaz" />
                </div>
                <div>
                  <label style={labelStyle}>E-Posta *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="scout@ornek.com" />
                </div>
                <div>
                  <label style={labelStyle}>Şifre *</label>
                  <input style={inputStyle} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="En az 6 karakter" />
                </div>
                <div>
                  <label style={labelStyle}>Telefon *</label>
                  <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+90 555 000 0000" />
                </div>
                <div className="sm:col-span-2">
                  <label style={labelStyle}>Ülke *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.country} onChange={e => set('country', e.target.value)}>
                    <option value="">Seçiniz</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.fullName || !form.email || !form.password || !form.phone || !form.country) {
                    toast.error('Tüm zorunlu alanları doldurmalısınız.')
                    return
                  }
                  setStep(2)
                }}
                className="w-full py-4 font-black text-sm uppercase tracking-[0.2em] mt-8 hover:scale-[1.02] transition-all bg-[#10B981] text-[#05050A] rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                2. Adıma Geç →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                 <Dna className="w-5 h-5 text-blue-500" />
                 <h2 className="text-lg font-black text-white uppercase tracking-widest">Clearance Level</h2>
              </div>

              {/* Free Plan Badge */}
              <div className="flex items-center gap-4 p-5 rounded-2xl mb-8 border border-[#10B981]/30 bg-[#10B981]/5">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-wide">Scout Ücretsiz Plan</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Daha fazla özellik için Premium'a yükseltebilirsiniz.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Kurum / Kulüp (İsteğe Bağlı)</label>
                  <input style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Bağımsız / Kulüp Adı" />
                </div>
                <div>
                  <label style={labelStyle}>Deneyim (Yıl) *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.experienceYears} onChange={e => set('experienceYears', e.target.value)}>
                    <option value="">Seçiniz</option>
                    <option value="0-1">0-1 Yıl</option>
                    <option value="2-5">2-5 Yıl</option>
                    <option value="6-10">6-10 Yıl</option>
                    <option value="10+">10+ Yıl</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Uzmanlık Alanı *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.specialization} onChange={e => set('specialization', e.target.value)}>
                    <option value="">Seçiniz</option>
                    <option value="Youth">Altyapı (Genç)</option>
                    <option value="Professional">Profesyonel (A Takım)</option>
                    <option value="Both">Her İkisi</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Lisans Numarası (İsteğe Bağlı)</label>
                  <input style={inputStyle} value={form.licenseNo} onChange={e => set('licenseNo', e.target.value)} placeholder="TFF/UEFA Lisans No" />
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button onClick={() => setStep(1)} className="px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all border border-white/20 text-white rounded-full">
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
                  className="flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02] disabled:opacity-50 bg-[#10B981] text-[#05050A] rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                >
                  {loading ? 'İşleniyor...' : 'Kaydı Tamamla'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-8">
          Zaten hesabınız var mı?{' '}
          <Link href="/scout-login" className="text-[#10B981] hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  )
}
