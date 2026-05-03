"use client"

import { useState, useEffect } from 'react'
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

export default function PlayerLoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
          toast.error('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('E-posta adresiniz henüz doğrulanmamış. Lütfen gelen kutunuzu kontrol edin.')
        } else if (error.message.includes('Too many requests')) {
          toast.error('Çok fazla giriş denemesi. Lütfen bir süre bekleyin.')
        } else {
          toast.error(error.message)
        }
      } else if (authData.session) {
        toast.success('Giriş başarılı!')
        window.location.href = '/athlete/dashboard'
      }
    } catch (err: any) {
      toast.error('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex" style={{ background: '#0d1b2a' }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-center p-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #003d35 0%, #00665a 40%, #00e5cc 100%)', clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-md">
          <div className="text-8xl mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.3))' }}>⚽</div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Dünya Seni<br />Bekliyor
          </h1>
          <p className="text-white/80 text-lg mb-10">
            Performansını yükle, dünyaya açıl. AI puanın seni geleceğe taşısın.
          </p>
          <ul className="space-y-4">
            {[
              'AI ile performans analizi',
              '500+ kulüpten izci erişimi',
              'Ücretsiz profil oluşturma',
              'Küresel görünürlük'
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
            <Link href="/scout-login" className="text-sm font-medium hover:underline" style={{ color: '#f5a623' }}>
              İzci girişi için tıkla →
            </Link>
          </div>

          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/data/logo.png" alt="TSM" className="h-10 w-auto" />
              <span className="text-white font-bold text-xl">TSM</span>
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: 'rgba(0,229,204,0.15)', color: '#00e5cc', border: '1px solid rgba(0,229,204,0.3)' }}>
              Oyuncu Girişi
            </span>
            <h2 className="text-3xl font-black text-white mb-2">Hesabına Giriş Yap</h2>
            <p className="text-gray-400">Oyuncu paneline erişmek için bilgilerini gir</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-POSTA</label>
              <input
                {...register('email')}
                type="email"
                className="w-full rounded-lg border bg-white/5 px-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none transition-all"
                style={{ borderColor: 'rgba(0,229,204,0.3)', borderRadius: '8px' }}
                onFocus={(e) => e.target.style.borderColor = '#00e5cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,229,204,0.3)'}
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
                style={{ borderColor: 'rgba(0,229,204,0.3)', borderRadius: '8px' }}
                onFocus={(e) => e.target.style.borderColor = '#00e5cc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,229,204,0.3)'}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 font-black text-base transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: '#00e5cc', color: '#0d1b2a', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,229,204,0.4)' }}
            >
              {loading ? 'Giriş Yapılıyor...' : '⚽ Oyuncu Girişi'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-gray-400 text-sm">
              Henüz hesabın yok mu?{' '}
              <Link href="/player-register" className="font-bold hover:underline" style={{ color: '#00e5cc' }}>
                Ücretsiz Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
