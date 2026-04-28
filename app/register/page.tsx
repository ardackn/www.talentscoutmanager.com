"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@/lib/supabase-client'
import { toast } from 'sonner'
import Link from 'next/link'
import { Dna, UploadCloud } from 'lucide-react'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  age: z.string().min(1, 'Age is required'),
  position: z.string().min(1, 'Position is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  profilePicture: z.any()
}).superRefine((data, ctx) => {
  if (!data.profilePicture || data.profilePicture.length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Genetic profile image is required", path: ["profilePicture"] })
  }
})

type RegisterForm = z.infer<typeof registerSchema>

export default function AthleteRegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

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
            role: 'athlete',
            full_name: data.fullName,
            phone: data.phone,
            age: data.age,
            position: data.position,
            nationality: data.nationality,
          }
        }
      })

      if (authError) throw authError

      if (authData?.user && data.profilePicture?.[0]) {
        try {
           const file = data.profilePicture[0]
           const fileExt = file.name.split('.').pop()
           const filePath = `${authData.user.id}/avatar.${fileExt}`
           await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
        } catch(e) {
           console.log("Avatar upload bypassed for demo.")
        }
      }

      toast.success('Genetic data recorded! Please verify your email.')
      reset()
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message || 'Error occurred during sequence initialization.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#05050A] flex items-center justify-center pt-20">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#10B981]/5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/95 to-transparent"></div>
      </div>

      <main className="container relative z-10 py-12 flex items-center justify-center">
        <section className="mx-auto max-w-2xl w-full p-10 md:p-12 rounded-[40px] shadow-[0_0_50px_rgba(16,185,129,0.1)] backdrop-blur-3xl bg-[#0A0A14]/80 border border-white/10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Dna className="w-8 h-8 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
              Inject Your DNA
            </h1>
            <p className="text-xs tracking-widest text-gray-400 uppercase">Create your bio-metric profile and enter the database.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-2">Subject Name</label>
                <input {...register('fullName')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#10B981] focus:outline-none transition-all placeholder:text-gray-600 font-medium" placeholder="Full Name" />
                {errors.fullName && <p className="text-xs text-red-400 mt-1.5">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-2">Comms Channel (Email)</label>
                <input type="email" {...register('email')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#10B981] focus:outline-none transition-all placeholder:text-gray-600 font-medium" placeholder="subject@network.com" />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-2">Direct Link (Phone)</label>
                <input type="tel" {...register('phone')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#10B981] focus:outline-none transition-all placeholder:text-gray-600 font-medium" placeholder="+1 555 000 0000" />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-2">Security Key (Password)</label>
                <input type="password" {...register('password')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#10B981] focus:outline-none transition-all placeholder:text-gray-600 font-medium" placeholder="Min 6 characters" />
                {errors.password && <p className="text-xs text-red-400 mt-1.5">{errors.password.message}</p>}
              </div>
            </div>

            <div>
               <label className="block text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] mb-2">Visual ID (Required)</label>
               <div className="flex items-center gap-4 p-4 border border-dashed border-white/20 rounded-2xl bg-white/5 hover:border-[#10B981]/50 transition-colors group">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-[#10B981]" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    {...register('profilePicture')}
                    onChange={(e) => {
                      register('profilePicture').onChange(e);
                      handleImageChange(e);
                    }}
                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-black file:bg-[#10B981]/20 file:text-[#10B981] hover:file:bg-[#10B981] hover:file:text-[#05050A] cursor-pointer transition-all" 
                  />
               </div>
               {errors.profilePicture && <p className="text-xs text-red-400 mt-1.5">{errors.profilePicture.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-[#10B981]/20 rounded-3xl bg-[#10B981]/5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Age</label>
                <input type="number" {...register('age')} className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-[#10B981] outline-none" placeholder="18" />
                {errors.age && <p className="text-xs text-red-400 mt-1">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Primary Module (Pos)</label>
                <input type="text" {...register('position')} placeholder="ST, LW, GK..." className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-[#10B981] outline-none" />
                {errors.position && <p className="text-xs text-red-400 mt-1">{errors.position.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Origin</label>
                <input type="text" {...register('nationality')} placeholder="Country" className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-[#10B981] outline-none" />
                {errors.nationality && <p className="text-xs text-red-400 mt-1">{errors.nationality.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-full bg-[#10B981] py-4 text-[#05050A] font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? 'Initializing Sequence...' : 'Initialize Sequence'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <Link href="/login" className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-[#10B981] transition-colors">
              Already in the system? Establish Connection.
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
