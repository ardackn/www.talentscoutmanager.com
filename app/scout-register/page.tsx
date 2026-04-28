"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'
import { Dna, Network, Shield } from 'lucide-react'

const COUNTRIES = ['United States', 'United Kingdom', 'Brazil', 'Argentina', 'Nigeria', 'France', 'Germany', 'Spain', 'Portugal', 'Italy', 'Netherlands', 'Belgium', 'Uruguay', 'Colombia', 'Mexico', 'Other']

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
      toast.success('Neural link established! Verify your frequency (email).')
      router.push('/scout-login')
    } catch (err: any) {
      toast.error(err.message || 'Error occurred during registration.')
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
            <Network className="w-4 h-4" /> Operator Registration
          </div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">Establish Access</h1>
          <p className="text-gray-400 font-light text-sm uppercase tracking-widest">Connect to the global bio-metric grid in 2 steps</p>
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
                {s === 1 ? 'Operator Identity' : 'Authorization Level'}
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
                  <label style={labelStyle}>Designation (Full Name) *</label>
                  <input style={inputStyle} value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="John Doe" />
                </div>
                <div>
                  <label style={labelStyle}>Comms Link (Email) *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="scout@network.com" />
                </div>
                <div>
                  <label style={labelStyle}>Security Key (Password) *</label>
                  <input style={inputStyle} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
                </div>
                <div>
                  <label style={labelStyle}>Direct Link (Phone) *</label>
                  <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 555 000 0000" />
                </div>
                <div className="sm:col-span-2">
                  <label style={labelStyle}>Operational Zone (Country) *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.country} onChange={e => set('country', e.target.value)}>
                    <option value="">Select Region</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.fullName || !form.email || !form.password || !form.phone || !form.country) {
                    toast.error('All fields are required to establish link.')
                    return
                  }
                  setStep(2)
                }}
                className="w-full py-4 font-black text-sm uppercase tracking-[0.2em] mt-8 hover:scale-[1.02] transition-all bg-[#10B981] text-[#05050A] rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                Proceed to Phase 2 →
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
                  <p className="text-sm font-black text-white uppercase tracking-wide">Scout Free Protocol Initiated</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Upgrade to Premium for full matrix access.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Organization / Node (Optional)</label>
                  <input style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Independent / Club" />
                </div>
                <div>
                  <label style={labelStyle}>Cycles Active (Years) *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.experienceYears} onChange={e => set('experienceYears', e.target.value)}>
                    <option value="">Select Cycles</option>
                    <option value="0-1">0-1 Cycles</option>
                    <option value="2-5">2-5 Cycles</option>
                    <option value="6-10">6-10 Cycles</option>
                    <option value="10+">10+ Cycles</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Primary Vector *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#05050A' }} value={form.specialization} onChange={e => set('specialization', e.target.value)}>
                    <option value="">Select Vector</option>
                    <option value="Youth">Youth Genetics</option>
                    <option value="Professional">Pro Bio-metrics</option>
                    <option value="Both">Omni-Scout</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Clearance ID (License) (Optional)</label>
                  <input style={inputStyle} value={form.licenseNo} onChange={e => set('licenseNo', e.target.value)} placeholder="FIFA/UEFA ID" />
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button onClick={() => setStep(1)} className="px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all border border-white/20 text-white rounded-full">
                  ← Revert
                </button>
                <button
                  onClick={() => {
                    if (!form.experienceYears || !form.specialization) {
                      toast.error('Vectors must be defined.')
                      return
                    }
                    handleSubmit()
                  }}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02] disabled:opacity-50 bg-[#10B981] text-[#05050A] rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                >
                  {loading ? 'Processing...' : 'Establish Neural Link'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-8">
          Already an operator?{' '}
          <Link href="/scout-login" className="text-[#10B981] hover:underline">Access Terminal</Link>
        </p>
      </div>
    </div>
  )
}
