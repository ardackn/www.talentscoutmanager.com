"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  role: z.enum(['scout', 'athlete'], { required_error: 'Rol seçin' }),
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { role: data.role }
      }
    })

    if (error) {
      toast.error(error.message)
    } else {
      // Profile insert via service role in future API or client (RDB policy needed)
      toast.success('Kayıt başarılı! E-posta doğrulama gönderildi.')
      reset()
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <main className="container min-h-screen py-16 flex items-center justify-center">
      <section className="card mx-auto max-w-2xl w-full p-10 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950/80 border border-white/10">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold mb-6">
            Yeni Hesap Oluştur
          </span>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-100 bg-clip-text text-transparent mb-6">
            TalentScout'a Katıl
          </h1>
          <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
            Scout veya sporcu olarak platforma kaydolun. Profiliniz AI destekli yetenek keşfi ekosistemine katılacak.
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
              placeholder="scout@talentscout.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Şifre (min 6 karakter)
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-5 text-white placeholder-slate-400 text-lg focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all backdrop-blur-sm"
              placeholder="Güçlü şifreniz..."
            />
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Rolünüz
            </label>
            <select
              {...register('role')}
              className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-5 text-white text-lg focus:border-gold/50 focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all backdrop-blur-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA3TDExIDEiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-right-4"
            >
              <option value="">Rol seçin</option>
              <option value="scout">🏆 Scout (Yetenek Avcısı)</option>
              <option value="athlete">⚽ Sporcu (Athlete)</option>
            </select>
            {errors.role && <p className="mt-2 text-sm text-red-400">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 p-7 text-xl font-black text-slate-900 shadow-xl hover:shadow-2xl hover:from-yellow-400 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Kayıt Ediliyor...' : 'Hemen Katıl'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            Zaten hesabınız var mı?{' '}
            <a href="/login" className="font-semibold text-gold hover:text-yellow-400 transition-colors">
              Hemen Giriş Yap
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

