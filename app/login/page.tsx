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

export default function LoginPage() {
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()

      const redirectPath = profile?.role === 'scout' ? '/scout/search' : '/athlete/profile'
      toast.success('Giriş başarılı!')
      router.push(redirectPath)
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen bg-[#050806] flex items-center justify-center">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2070&auto=format&fit=crop" 
          alt="Football Stadium" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/80 to-transparent"></div>
      </div>

      <main className="container relative z-10 py-16 flex items-center justify-center pt-32">
        <section className="mx-auto max-w-xl w-full p-10 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl bg-black/60 border border-white/10">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full border border-[#00D26A]/30 bg-[#00D26A]/10 px-4 py-1.5 text-xs font-bold text-[#00D26A] mb-6 uppercase tracking-wider">
              GÜVENLİ GİRİŞ
            </span>
            <h1 className="text-4xl font-black text-white mb-4">
              TSM Platformuna Giriş Yap
            </h1>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Scout veya oyuncu profilinize erişmek için e-posta ve şifrenizi kullanın.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                E-POSTA ADRESİ
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 text-sm focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A] focus:outline-none transition-all"
                placeholder="ornek@email.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                ŞİFRE
              </label>
              <input
                {...register('password')}
                type="password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 text-sm focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A] focus:outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-2xl bg-[#00D26A] py-4 text-black font-black hover:bg-[#00e676] shadow-[0_0_20px_rgba(0,210,106,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? 'Giriş Yapılıyor...' : 'GİRİŞ YAP'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
            <p className="text-gray-400 text-sm">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="font-bold text-[#00D26A] hover:text-[#00e676] transition-colors">
                Ücretsiz Kayıt Olun
              </Link>
            </p>
            <Link href="/admin/login" className="inline-block text-xs text-gray-500 hover:text-white transition-colors">
              Yönetici Girişi
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
