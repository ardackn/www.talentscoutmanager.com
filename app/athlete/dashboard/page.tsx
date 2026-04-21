"use client"

import { useState, useEffect, useRef } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import type { Database } from '@/types/supabase'
import type { AthletePublic } from '@/types/athlete'
import { Position } from '@/types/athlete'
import { useSession } from '@/hooks/use-session'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Upload, Video, BarChart3, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { talents } from '@/lib/talent-data'

interface Message {
  id: string
  fromScout: string
  toTalentId: string
  content: string
  timestamp: string
  replied: boolean
}

export default function AthleteDashboardPage() {
  const { session, profile, loading: sessionLoading } = useSession()
  const supabase = createClientComponentClient<Database>()
  
  const [talent, setTalent] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [reply, setReply] = useState('')

  // Video upload state
  const [uploading, setUploading] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [analyzeData, setAnalyzeData] = useState({
    height: '',
    weight: '',
    age: '',
    position: '' as Position
  })
const [aiResults, setAiResults] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null)

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!analyzeData.height || !analyzeData.weight || !analyzeData.age || !analyzeData.position) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...analyzeData,
          videoId: videoFile ? videoFile.name : null,
          athleteId: talent?.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiResults(data);
      } else {
        alert('Analiz hatası: ' + data.error);
      }
    } catch (error) {
      alert('Bağlantı hatası');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUploadVideo = async () => {
    if (!videoFile) return;
    setUploading(true);
    try {
      const res = await fetch('/api/mux/upload-url', {
        method: 'POST',
        body: JSON.stringify({ file: videoFile.name }),
      });
      const { url } = await res.json();
      // Simulate upload
      alert('Video yüklendi: ' + url);
    } catch {
      alert('Yükleme hatası');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Demo: assume first talent or from session
    const demoTalent = talents[0]
    setTalent(demoTalent)
    setMessages(demoTalent?.messages || [])
  }, [])

  const sendReply = async () => {
    if (!talent || !reply.trim()) return

    // POST to scout or general message API
    try {
      const formData = new FormData();
      formData.append('athleteId', talent.id);
      formData.append('content', reply);
      formData.append('scoutName', profile?.name || 'Athlete Reply');
      const res = await fetch('/api/scout/contact', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert('Yanıt gönderildi!')
        setReply('')
      }
    } catch {
      alert('Hata')
    }
  }

  if (!talent) {
    return <div className="container py-16 text-center text-slate-300">Yükleniyor...</div>
  }

  return (
    <main className="container py-10 md:py-16">
      <section className="card p-8 md:p-10 mb-12">
        <div className="flex items-start gap-6 mb-8">
          <img src={talent.image} alt={talent.name} className="w-24 h-24 rounded-3xl object-cover flex-shrink-0" />
          <div>
            <h1 className="text-4xl font-black text-white">{talent.name}</h1>
            <div className="flex items-center gap-4 text-xl text-slate-300 mt-2">
              <span>{talent.aiScore} AI</span>
              <span>{talent.country}</span>
              <span>{talent.position}</span>
            </div>
            <div className="text-lg text-slate-400 mt-1">{talent.age} yaşında • {talent.height}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-[#E94560] mb-2">{talent.aiScore}</div>
            <div className="text-sm text-slate-400">AI Puanı</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-[#F7C948] mb-2">{talent.messages.length}</div>
            <div className="text-sm text-slate-400">Gelen Mesaj</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">✅</div>
            <div className="text-sm text-slate-400">Doğrulanmış</div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="card p-8">
        <h2 className="text-2xl font-bold text-white mb-8">📥 Gelen Mesajlar</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto mb-8">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 rounded-2xl bg-white/5">
              Henüz scout mesajı yok. Profiliniz öne çıktıkça mesajlar gelecek!
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold bg-[#E94560] px-3 py-1 rounded-full text-sm">{msg.fromScout}</span>
                  <span className="text-xs text-slate-400">{new Date(msg.timestamp).toLocaleDateString('tr-TR')}</span>
                </div>
                <p className="text-slate-200 mb-4 leading-relaxed">{msg.content}</p>
                {!msg.replied && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm mb-3">Yeni mesaj!</p>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Yanıt yaz..."
                      className="w-full h-20 p-4 rounded-xl border border-green-500/50 bg-green-500/5 text-white placeholder-slate-400 focus:border-green-400 focus:outline-none resize-none"
                    />
                    <button
                      onClick={sendReply}
                      disabled={!reply.trim()}
                      className="mt-3 w-full py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                    >
                      Yanıt Gönder
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="text-center text-sm text-slate-500 pt-6 border-t border-white/10">
          Scout mesajları profilinize gönderilenler. Yanıtlar doğrudan iletilir.
        </div>
      </section>

      {/* AI Video Upload & Analysis Section */}
      {aiResults ? (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-[#E94560]" />
            <h2 className="text-2xl font-black text-white">AI Analiz Sonuçları</h2>
            <Badge className="ml-auto bg-gradient-to-r from-[#E94560] to-purple-600 text-sm font-bold">
              {aiResults.scores.scoutScore}/100
            </Badge>
          </div>

          {/* Score Card */}
          <Card className="border-white/20 overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-8 border-white/10" />
                <div className="absolute inset-4 md:inset-6 w-full h-full bg-gradient-to-r from-[#E94560]/20 to-purple-600/20 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl">
                    {aiResults.scores.scoutScore}
                  </div>
                </div>
              </div>
              <CardDescription className="text-slate-400 mb-4">Scout Score</CardDescription>
              <p className="text-slate-200 font-semibold text-lg">{aiResults.scores.recommendation}</p>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle>Beceri Dağılımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(aiResults.scores.breakdown).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="w-24 font-medium text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E94560] to-purple-600 rounded-full transition-all" 
                      style={{ width: `${Math.min(100, value as number)}%` }}
                    />
                  </div>
                  <span className="w-12 font-mono font-bold text-white">{Math.round(value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleAnalyze} className="flex-1" variant="outline">
              Yeni Analiz
            </Button>
            <Button onClick={handleUploadVideo} className="flex-1" disabled={uploading || !videoFile}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Video className="w-4 h-4 mr-2" />}
              Videoyu Kaydet
            </Button>
          </div>
        </section>
      ) : (
        <section className="card p-8 md:p-12">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl md:text-4xl">
              <BarChart3 className="w-10 h-10" />
              Video Yükle & AI Analizi
            </CardTitle>
            <CardDescription className="text-slate-400 max-w-md mx-auto">
              Videonuzu yükleyin, ölçülerinizi girin ve otomatik Scout Score alın!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Upload */}
            <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center hover:border-[#E94560]/50 transition-all group cursor-pointer bg-white/5 hover:bg-white/10" 
                 onClick={() => fileInputRef.current?.click()}
                 onDrop={handleVideoDrop}
                 onDragOver={(e) => e.preventDefault()}>
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400 group-hover:text-[#E94560] transition" />
              {videoFile ? (
                <div>
                  <p className="text-lg font-semibold mb-2 text-white">{videoFile.name}</p>
                  <video src={URL.createObjectURL(videoFile)} controls className="max-w-full max-h-48 mx-auto rounded-2xl" />
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold mb-1 text-white">Drag & drop video veya tıkla</p>
                  <p className="text-sm text-slate-400">MP4/MOV (max 100MB)</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
              />
            </div>

            {/* Analyze Form */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Boy (cm)</label>
                <input
                  type="number"
                  value={analyzeData.height}
                  onChange={(e) => setAnalyzeData({...analyzeData, height: e.target.value})}
                  placeholder="180"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Kilo (kg)</label>
                <input
                  type="number"
                  value={analyzeData.weight}
                  onChange={(e) => setAnalyzeData({...analyzeData, weight: e.target.value})}
                  placeholder="75"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Yaş</label>
                <input
                  type="number"
                  value={analyzeData.age}
                  onChange={(e) => setAnalyzeData({...analyzeData, age: e.target.value})}
                  placeholder="17"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Pozisyon</label>
                <select
                  value={analyzeData.position}
                  onChange={(e) => setAnalyzeData({...analyzeData, position: e.target.value as Position})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white"
                >
                  <option value="">Seçin</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Striker">Striker</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
disabled={!analyzeData.height || !analyzeData.weight || !analyzeData.age || !analyzeData.position || analyzing}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#E94560] to-purple-600 hover:from-red-500 shadow-2xl"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  AI Analiz Ediyor...
                </>
              ) : (
                <>
                  <BarChart3 className="w-6 h-6 mr-3" />
                  Scout Score Hesapla
                </>
              )}
            </Button>
          </CardContent>
        </section>
      )}

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <a href="/" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">🏠</div>
          <h3 className="font-bold mb-2">Ana Sayfa</h3>
          <p className="text-sm text-slate-400">Platforma dön</p>
        </a>
        <a href="/scout/overview" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="font-bold mb-2">İzci Görünümü</h3>
          <p className="text-sm text-slate-400">İzci tarafını test et</p>
        </a>
        <a href="/admin/login" className="card p-8 text-center hover:-translate-y-1 transition">
          <div className="text-3xl mb-4">⚙️</div>
          <h3 className="font-bold mb-2">Admin</h3>
          <p className="text-sm text-slate-400">Yönetim paneli</p>
        </a>
      </section>
    </main>
  )
}











