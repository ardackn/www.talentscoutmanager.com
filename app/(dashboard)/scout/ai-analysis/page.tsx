"use client"


import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Upload, Loader2, Circle, BarChart3, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Mock skills matching talent-data.ts
const mockSkills = [
  { name: 'Sprint Speed', value: 87, max: 100 },
  { name: 'Finishing', value: 92, max: 100 },
  { name: 'Jumping', value: 83, max: 100 },
  { name: 'Defense', value: 45, max: 100 },
  { name: 'Technique', value: 87, max: 100 },
  { name: 'Game Intelligence', value: 84, max: 100 },
]

interface AnalysisResult {
  aiScore: number
  skills: Array<{ name: string; value: number; max: number }>
  comment: string
}

export default function ScoutAIAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    position: '',
  })
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile)
      const url = URL.createObjectURL(droppedFile)
      setPreview(url)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleAnalyze = async () => {
    if (!file || !formData.name) return
    
    setAnalyzing(true)
    // Mock AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock results
    const mockResult: AnalysisResult = {
      aiScore: 89,
      skills: mockSkills.map(skill => ({
        ...skill,
        value: Math.floor(Math.random() * 20) + skill.value - 10 // Variation
      })),
      comment: `AI Analizi: ${formData.name} (${formData.position}, ${formData.age} yaşında, ${formData.country}). Olağanüstü sprint hızı ve bitiricilik kombinasyonu. Savunma becerilerini geliştirerek elit seviyeye çıkabilir. Teknik mükemmel, oyun zekası üst düzey. Brezilya stili forvet profili - izlemeye değer!`
    }
    
    setResults(mockResult)
    setAnalyzing(false)
  }

  const reset = () => {
    setFile(null)
    setPreview('')
    setFormData({ name: '', age: '', country: '', position: '' })
    setResults(null)
    setAnalyzing(false)
  }

  return (
    <main className="container py-10 md:py-16 min-h-screen">
      <section className="card p-8 md:p-12 mb-12">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-4">
          <BarChart3 className="w-4 h-4 mr-1" /> AI Analiz Araçları
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          Video Yükle &amp; AI Analizi
        </h1>
        <p className="text-base text-slate-300 max-w-2xl">
          Oyuncu videosu yükleyin, temel bilgileri girin ve yapay zeka anında beceri analizi yapsın.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Upload &amp; Form */}
        <div className="space-y-8">
          {/* Video Upload */}
          <Card className="group hover:border-white/20 transition-all overflow-hidden border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-6 h-6" /> Video Yükle
              </CardTitle>
              <CardDescription>
                MP4, MOV formatı (max 100MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={cn(
                  "relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-all cursor-pointer group-hover:bg-white/5",
                  preview && "ring-2 ring-[#E94560] bg-gradient-to-br from-[#E94560]/5"
                )}
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
              >
                {!preview ? (
                  <>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <div>
                      <p className="text-lg font-semibold mb-1">Drag &amp; drop video</p>
                      <p className="text-sm text-slate-400">veya buraya tıklayın</p>
                    </div>
                  </>
                ) : (
                  <video 
                    src={preview} 
                    controls 
                    className="w-full max-h-64 rounded-xl object-cover"
                  />
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Player Info Form */}
          <Card className="border-white/10 hover:border-white/20">
            <CardHeader>
              <CardTitle>Oyuncu Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">İsim</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] focus:outline-none text-white placeholder-slate-400"
                  placeholder="Oyuncu adı"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Yaş</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white"
                    placeholder="17"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ülke</label>
                  <input
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white placeholder-slate-400"
                    placeholder="Brezilya"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pozisyon</label>
                <input
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white placeholder-slate-400"
                  placeholder="Forvet"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <Card className="lg:col-span-2 border-white/10 bg-gradient-to-br from-[#E94560]/5 to-purple-600/5 backdrop-blur-xl">
          <CardContent className="py-16 text-center">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!file || !formData.name || analyzing}
              className={cn(
                "group gap-3 text-lg px-8 py-8 rounded-2xl bg-gradient-to-r from-[#E94560] to-purple-600 hover:from-[#ff6b6b] shadow-2xl shadow-[#E94560]/25 hover:shadow-[#ff6b6b]/30 font-bold min-h-[70px] w-full sm:w-auto",
                (analyzing || !file || !formData.name) && "opacity-50 cursor-not-allowed"
              )}
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  AI analiz ediyor...
                </>
              ) : (
                <>
                  <BarChart3 className="w-6 h-6 group-hover:scale-110 transition" />
                  Analiz Et
                </>
              )}
            </Button>
            <p className="text-sm text-slate-400 mt-4">
              {file && formData.name ? 'Hazır!' : 'Video ve oyuncu adı gerekli'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <Circle className="w-8 h-8 text-[#E94560] flex-shrink-0" />
            AI Analiz Sonuçları
            <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-[#E94560] to-purple-600">
              {results.aiScore}/100
            </Badge>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Circular Score */}
            <Card className="lg:col-span-1 relative overflow-hidden border-white/20 group">
              <CardContent className="p-8 md:p-12 text-center relative">
                <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6">
                  <div 
                    className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-8 border-white/10 shadow-2xl"
                  />
                  <svg viewBox="0 0 36 36" className="absolute inset-4 md:inset-6 w-full h- full animate-pulse">
                    <path d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100, 100" strokeDashoffset="0" pathLength="1" className="origin-center -rotate-90 transition-all duration-1000" style={{ '--dashoffset': ((1 - results.aiScore / 100) * 100) + '%' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                      {results.aiScore}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Genel AI Skoru</h3>
                <p className="text-slate-400">Yetenek endeksi</p>
              </CardContent>
            </Card>

            {/* Skill Bars */}
            <Card className="md:col-span-1 lg:col-span-2 border-white/20">
              <CardHeader>
                <CardTitle>Beceri Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="w-28 font-medium text-slate-300 flex-shrink-0">
                        {skill.name}
                      </span>
                      <div className="flex-1 bg-white/5 rounded-full h-3 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#E94560] to-purple-600 rounded-full transition-all duration-700 shadow-md"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                      <span className="w-12 font-mono text-sm text-slate-400">
                        {skill.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Comment */}
          <Card className="border-white/20">
            <CardHeader className="flex-row items-center gap-3 pb-4">
              <MessageSquare className="w-6 h-6 text-[#E94560] flex-shrink-0" />
              <CardTitle className="text-xl">AI Yorumu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                {results.comment}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                onClick={reset}
                className="w-full border-white/20 hover:bg-white/10"
              >
                Yeni Analiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </main>
  )
}