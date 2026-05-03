"use client"

import { useState, useEffect, useRef } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { useSession } from '@/hooks/use-session'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Upload, Video, Edit2, Check, X, Film } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function AthleteDashboardPage() {
  const { session, profile, loading: sessionLoading } = useSession()
  const supabase = createClientComponentClient()
  
  const [athlete, setAthlete] = useState<any>(null)
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    position: '',
    nationality: '',
    birth_date: '',
    current_club: '',
    city: ''
  })

  // Video Upload State
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session?.user?.id) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    setLoading(true)
    
    // Fetch Profile
    const { data: athData, error: athError } = await supabase
      .from('athlete_profiles')
      .select('*')
      .eq('user_id', session?.user?.id)
      .single()

    if (athData) {
      setAthlete(athData)
      setEditForm({
        full_name: athData.full_name || '',
        position: athData.position || '',
        nationality: athData.nationality || '',
        birth_date: athData.birth_date || '',
        current_club: athData.current_club || '',
        city: athData.city || ''
      })
    }

    // Fetch Videos
    const { data: vidData } = await supabase
      .from('athlete_videos')
      .select('*')
      .eq('athlete_id', athData?.id)
      .order('created_at', { ascending: false })

    if (vidData) setVideos(vidData)

    setLoading(false)
  }

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('athlete_profiles')
        .update(editForm)
        .eq('id', athlete.id)

      if (error) throw error
      
      setAthlete({ ...athlete, ...editForm })
      setIsEditing(false)
      toast.success('Profil güncellendi!')
    } catch (err: any) {
      toast.error('Güncelleme hatası: ' + err.message)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !athlete) return
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video boyutu 100MB dan küçük olmalı')
      return
    }

    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const filename = `vid_${Math.random().toString(36).slice(2)}.${ext}`
      const filePath = `${session?.user?.id}/${filename}`
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('videos').getPublicUrl(filePath)

      const { data: newVideo, error: dbError } = await supabase
        .from('athlete_videos')
        .insert({
          athlete_id: athlete.id,
          video_url: publicUrl,
          title: file.name,
          video_type: 'custom',
          is_primary: videos.length === 0,
          storage_path: filePath
        })
        .select()
        .single()

      if (dbError) throw dbError

      setVideos([newVideo, ...videos])
      toast.success('Video başarıyla yüklendi!')
    } catch (err: any) {
      toast.error('Video yükleme hatası: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteVideo = async (videoId: string, storagePath: string) => {
    try {
      if (storagePath) {
        await supabase.storage.from('videos').remove([storagePath])
      }
      await supabase.from('athlete_videos').delete().eq('id', videoId)
      setVideos(videos.filter(v => v.id !== videoId))
      toast.success('Video silindi')
    } catch (err) {
      toast.error('Silme başarısız oldu')
    }
  }

  if (sessionLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>
  }

  if (!athlete) {
    return (
      <div className="container py-16 text-center">
        Profiliniz bulunamadı. Lütfen destek ile iletişime geçin.
      </div>
    )
  }

  return (
    <main className="container py-10 md:py-16 min-h-screen">
      
      {/* Profile Section */}
      <section className="card p-8 md:p-10 mb-8 relative">
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> <span className="text-sm font-bold">Düzenle</span>
          </button>
        ) : (
          <div className="absolute top-6 right-6 flex gap-2">
            <button 
              onClick={handleSaveProfile}
              className="p-3 bg-[#00e5cc] text-black hover:bg-white rounded-xl transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> <span className="text-sm font-bold">Kaydet</span>
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="p-3 bg-red-500/20 text-red-500 hover:bg-red-500/40 rounded-xl transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" /> <span className="text-sm font-bold">İptal</span>
            </button>
          </div>
        )}

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
            {athlete.avatar_url ? (
              <img src={athlete.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black italic text-white/50">{athlete.full_name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 mt-2">
            {isEditing ? (
              <input 
                value={editForm.full_name} 
                onChange={e => setEditForm({...editForm, full_name: e.target.value})}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-2xl font-black text-white w-full max-w-sm mb-2"
              />
            ) : (
              <h1 className="text-4xl font-black text-white">{athlete.full_name}</h1>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-widest text-gray-400 mt-2">
              <span className="flex items-center gap-2">
                🌍 
                {isEditing ? (
                   <input value={editForm.nationality} onChange={e=>setEditForm({...editForm, nationality: e.target.value})} className="bg-white/5 border border-white/20 rounded px-2 py-1 text-white w-24"/>
                ) : (athlete.nationality || 'Belirtilmedi')}
              </span>
              <span className="flex items-center gap-2">
                ⚽ 
                {isEditing ? (
                   <input value={editForm.position} onChange={e=>setEditForm({...editForm, position: e.target.value})} className="bg-white/5 border border-white/20 rounded px-2 py-1 text-white w-24"/>
                ) : (athlete.position || 'Belirtilmedi')}
              </span>
              <span className="flex items-center gap-2">
                🛡️ 
                {isEditing ? (
                   <input value={editForm.current_club} onChange={e=>setEditForm({...editForm, current_club: e.target.value})} className="bg-white/5 border border-white/20 rounded px-2 py-1 text-white w-32" placeholder="Kulüp"/>
                ) : (athlete.current_club || 'Serbest')}
              </span>
            </div>
            
            {isEditing && (
              <div className="mt-4">
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Şehir</label>
                <input 
                  value={editForm.city} 
                  onChange={e => setEditForm({...editForm, city: e.target.value})}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white w-full max-w-md"
                />
              </div>
            )}
            {!isEditing && athlete.city && (
              <p className="mt-4 text-sm text-gray-400 max-w-2xl">Şehir: {athlete.city}</p>
            )}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="card p-8 md:p-10 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <Film className="w-6 h-6 text-[#00e5cc]" /> Videolarım
          </h2>
          <div>
            <input 
              type="file" 
              accept="video/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleVideoUpload}
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-[#00e5cc] text-black hover:bg-white font-bold"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploading ? 'Yükleniyor...' : 'Video Yükle'}
            </Button>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl">
            <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Henüz Video Yüklemedin</h3>
            <p className="text-gray-500 text-sm">Yeteneklerini sergilemek için sınırsız sayıda maç veya antrenman videosu yükleyebilirsin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                <video src={video.video_url} controls className="w-full aspect-video bg-black object-contain" />
                <div className="p-4 flex justify-between items-center">
                  <span className="font-bold text-sm truncate">{video.title || 'İsimsiz Video'}</span>
                  <button 
                    onClick={() => handleDeleteVideo(video.id, video.storage_path)}
                    className="text-red-500 hover:text-red-400 text-xs font-bold uppercase"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/discovery" className="card p-8 text-center hover:bg-white/5 transition-colors group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
          <h3 className="text-xl font-black uppercase italic mb-2">Keşfet</h3>
          <p className="text-sm text-gray-400">Tüm yetenekleri gör (Filtresiz Görünüm)</p>
        </Link>
        <Link href="/transfer-list" className="card p-8 text-center hover:bg-white/5 transition-colors group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📋</div>
          <h3 className="text-xl font-black uppercase italic mb-2">Transfer Listesi</h3>
          <p className="text-sm text-gray-400">Açık transfer pazarını incele</p>
        </Link>
      </section>

    </main>
  )
}
