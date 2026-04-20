"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre gerekli'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>({
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
      // Fetch role and redirect
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
    <main className="container min-h-screen py-16 flex items-center justify-center">
      <section className="card mx-auto max-w-2xl w-full p-10 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950/80 border border-white/10">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold mb-6">
            Güvenli Giriş
          </span>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-100 bg-clip-text text-transparent mb-6">
            TalentScout'a Hoşgeldin
          </h1>
          <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
            E-posta ve şifrenizle scout veya athlete hesabınıza hızlıca erişin.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              E-posta Adresi
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-5 text-white placeholder-slate-400 text-lg focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all backdrop-blur-sm"
              placeholder="email@talentscout.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Şifreniz
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-5 text-white placeholder-slate-400 text-lg focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all backdrop-blur-sm"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 p-7 text-xl font-black text-slate-900 shadow-xl hover:shadow-2xl hover:from-yellow-400 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center space-y-4">
          <p className="text-slate-400 text-sm">
            Hesabınız yok mu?{' '}
            <a href="/register" className="font-semibold text-gold hover:text-yellow-400 transition-colors">
              Kayıt Olun
            </a>
          </p>
          <a href="/admin/login" className="inline-flex rounded-full bg-red-600/20 border border-red-500/30 px-6 py-3 text-sm font-semibold text-red-300 hover:bg-red-600/30 transition-all">
            Admin Girişi
          </a>
        </div>
      </section>
    </main>
  )
}

