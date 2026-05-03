"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'
import { createConfirmedUser } from '@/app/actions/auth'
import { ALL_COUNTRIES } from '@/lib/countries'

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
      const res = await createConfirmedUser(form.email, form.password, form.fullName, 'scout', {
        country: form.country,
        organization: form.organization
      })

      if (!res.success) {
        throw new Error(res.error)
      }

      toast.success('Kayıt Başarılı! Yönlendiriliyorsunuz...')
      
      await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })

      // Hard redirect to ensure session is picked up correctly
      window.location.href = '/scout/overview'
    } catch (err: any) {
      console.error('Scout registration error:', err)
      toast.error(err.message || 'Kayıt sırasında bir hata oluştu.')
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
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center" style={{ background: '#05050A' }}>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/data/logo.png" alt="TSM" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl">TSM</span>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
            🔍 İzci Kaydı — Kurumsal
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Aramıza Katıl</h1>
        </div>

        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,166,35,0.15)' }}>
          {step === 1 ? (
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
                  <label style={labelStyle}>Ülke *</label>
                  <select style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)}>
                    <option value="">Seçin</option>
                    {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 font-black text-base mt-4 hover:scale-[1.02] transition-all uppercase tracking-widest" style={{ background: '#f5a623', color: '#0d1b2a', borderRadius: '8px' }}>
                İleri →
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label style={labelStyle}>Kurum / Kulüp</label>
                <input style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Bağımsız veya Kulüp Adı" />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/20 text-white rounded-lg">Geri</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-base hover:scale-[1.02] transition-all uppercase tracking-widest"
                  style={{ background: '#f5a623', color: '#0d1b2a', borderRadius: '8px' }}
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
