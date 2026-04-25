"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  role: z.enum(['scout', 'athlete'], { required_error: 'Rol seçin' }),
  fullName: z.string().min(2, 'Ad Soyad zorunludur'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  age: z.string().optional(),
  position: z.string().optional(),
  nationality: z.string().optional(),
  agency: z.string().optional(),
  profilePicture: z.any()
}).superRefine((data, ctx) => {
  if (!data.profilePicture || data.profilePicture.length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Profil resmi zorunludur", path: ["profilePicture"] })
  }
  if (data.role === 'athlete') {
    if (!data.age) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Yaş zorunludur", path: ["age"] })
    if (!data.position) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Pozisyon zorunludur", path: ["position"] })
    if (!data.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Uyruk zorunludur", path: ["nationality"] })
  }
  if (data.role === 'scout') {
    if (!data.agency) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ajans/Kulüp zorunludur", path: ["agency"] })
  }
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors }, reset, control } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'athlete' }
  })

  const selectedRole = watch('role')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
    }
  }

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: data.role,
            full_name: data.fullName,
            phone: data.phone,
            age: data.age,
            position: data.position,
            nationality: data.nationality,
            agency: data.agency,
          }
        }
      })

      if (authError) throw authError

      if (authData?.user && data.profilePicture?.[0]) {
        const file = data.profilePicture[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${authData.user.id}/avatar.${fileExt}`
        
        await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
      }

      toast.success('Kayıt başarılı! Lütfen giriş yapın.')
      reset()
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message || 'Kayıt sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#050806] flex items-center justify-center">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop" 
          alt="Soccer Field" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/90 to-transparent"></div>
      </div>

      <main className="container relative z-10 py-24 flex items-center justify-center pt-32">
        <section className="mx-auto max-w-2xl w-full p-10 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl bg-black/60 border border-white/10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-4">
              TalentScout'a Katıl
            </h1>
            <p className="text-sm text-gray-400">Profilini oluştur ve AI destekli yetenek keşfine başla.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ad Soyad</label>
                <input {...register('fullName')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00D26A] focus:outline-none transition-all" />
                {errors.fullName && <p className="text-xs text-red-400 mt-1.5">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-posta</label>
                <input type="email" {...register('email')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00D26A] focus:outline-none transition-all" />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Telefon</label>
                <input type="tel" {...register('phone')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00D26A] focus:outline-none transition-all" placeholder="+90 555 555 5555" />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Şifre (min 6)</label>
                <input type="password" {...register('password')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00D26A] focus:outline-none transition-all" />
                {errors.password && <p className="text-xs text-red-400 mt-1.5">{errors.password.message}</p>}
              </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Profil Resmi (Zorunlu)</label>
               <div className="flex items-center gap-4">
                  {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-[#00D26A]" />}
                  <input 
                    type="file" 
                    accept="image/*"
                    {...register('profilePicture')}
                    onChange={(e) => {
                      register('profilePicture').onChange(e);
                      handleImageChange(e);
                    }}
                    className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00D26A] file:text-black hover:file:bg-[#00e676] transition-colors" 
                  />
               </div>
               {errors.profilePicture && <p className="text-xs text-red-400 mt-1.5">{errors.profilePicture.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rolünüz</label>
              <select {...register('role')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#00D26A] focus:outline-none transition-all">
                <option value="athlete">⚽ Sporcu (Yetenek)</option>
                <option value="scout">🏆 Scout (Yetenek Avcısı)</option>
              </select>
            </div>

            {selectedRole === 'athlete' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 border border-[#00D26A]/30 rounded-2xl bg-[#00D26A]/5">
                <div>
                  <label className="block text-xs text-gray-300 mb-2">Yaş</label>
                  <input type="number" {...register('age')} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white" />
                  {errors.age && <p className="text-xs text-red-400 mt-1">{errors.age.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-2">Pozisyon</label>
                  <input type="text" {...register('position')} placeholder="Örn: Forvet" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white" />
                  {errors.position && <p className="text-xs text-red-400 mt-1">{errors.position.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-2">Uyruk</label>
                  <input type="text" {...register('nationality')} placeholder="Örn: TC" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white" />
                  {errors.nationality && <p className="text-xs text-red-400 mt-1">{errors.nationality.message}</p>}
                </div>
              </div>
            )}

            {selectedRole === 'scout' && (
               <div className="p-5 border border-[#00D26A]/30 rounded-2xl bg-[#00D26A]/5">
                 <label className="block text-xs text-gray-300 mb-2">Bağlı Olduğunuz Kulüp / Ajans</label>
                 <input type="text" {...register('agency')} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white" placeholder="Örn: Galatasaray SK" />
                 {errors.agency && <p className="text-xs text-red-400 mt-1">{errors.agency.message}</p>}
               </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-2xl bg-[#00D26A] py-4 text-black font-black hover:bg-[#00e676] shadow-[0_0_20px_rgba(0,210,106,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? 'Kayıt Ediliyor...' : 'KAYIT OL VE BAŞLA'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-gray-400 text-sm hover:text-[#00D26A] transition-colors">
              Zaten hesabınız var mı? Giriş yapın.
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
