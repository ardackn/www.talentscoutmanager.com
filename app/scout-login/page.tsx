"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre gerekli'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function ScoutLoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast.error(error.message)
    } else if (session) {
      toast.success('Giriş başarılı!')
      router.push('/scout/search')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0d1b2a' }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-center p-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3d1e00 0%, #7a4000 40%, #f5a623 100%)', clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-md">
          <div className="text-8xl mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.3))' }}>🔍</div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Geleceğin Yıldızlarını<br />Keşfet
          </h1>
          <p className="text-white/80 text-lg mb-10">
            Yapay zeka destekli filtreleme ile dünyanın her köşesindeki yeteneklere ulaş.
          </p>
          <ul className="space-y-4">
            {[
              'AI destekli oyuncu filtreleme',
              'Ülke, pozisyon, yaş, puan filtresi',
              'Video analiz raporları',
              'Direkt oyuncu iletişimi (Premium)'
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white font-medium">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 pt-24">
        <div className="w-full max-w-md">
          <div className="text-right mb-6">
            <Link href="/player-login" className="text-sm font-medium hover:underline" style={{ color: '#00e5cc' }}>
              ← Oyuncu girişi
            </Link>
          </div>

          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/data/logo.png" alt="TSM" className="h-10 w-auto" />
              <span className="text-white font-bold text-xl">TSM</span>
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
              İzci Girişi
            </span>
            <h2 className="text-3xl font-black text-white mb-2">Scout Hesabına Giriş Yap</h2>
            <p className="text-gray-400">İzci paneline erişmek için bilgilerini gir</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-POSTA</label>
              <input
                {...register('email')}
                type="email"
                className="w-full rounded-lg border bg-white/5 px-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none transition-all"
                style={{ borderColor: 'rgba(245,166,35,0.3)', borderRadius: '8px' }}
                onFocus={(e) => e.target.style.borderColor = '#f5a623'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(245,166,35,0.3)'}
                placeholder="ornek@email.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">ŞİFRE</label>
              <input
                {...register('password')}
                type="password"
                className="w-full rounded-lg border bg-white/5 px-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none transition-all"
                style={{ borderColor: 'rgba(245,166,35,0.3)', borderRadius: '8px' }}
                onFocus={(e) => e.target.style.borderColor = '#f5a623'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(245,166,35,0.3)'}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 font-black text-base transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: '#f5a623', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
            >
              {loading ? 'Giriş Yapılıyor...' : '🔍 İzci Girişi'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-gray-400 text-sm">
              Henüz hesabın yok mu?{' '}
              <Link href="/scout-register" className="font-bold hover:underline" style={{ color: '#f5a623' }}>
                Scout Hesabı Oluştur
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
