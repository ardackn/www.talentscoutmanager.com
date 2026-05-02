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
  guclu_yonler: string[]
  zayif_yonler: string[]
  oyuncu_metrikleri: Array<{ name: string; performance: number; notes: string }>
  sistem_uyumu: string
  transfer_onerileri: string[]
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
    
    // Mock results for Team Analysis
    const mockResult: AnalysisResult = {
      aiScore: 85,
      guclu_yonler: [
        "Hızlı hücuma çıkışlar ve kanat organizasyonları",
        "Merkez orta sahada yüksek pas isabeti (%88)",
        "Duran toplarda etkili hava hakimiyeti"
      ],
      zayif_yonler: [
        "Defans arkasına atılan toplarda kademe hatası",
        "İkinci bölgede düşük top kazanma oranı",
        "70. dakikadan sonra takım halinde dayanıklılık düşüşü"
      ],
      oyuncu_metrikleri: [
        { name: "Oyuncu #7 (Kanat)", performance: 88, notes: "Sprint hızı ve dripling elit seviyede" },
        { name: "Oyuncu #10 (OOS)", performance: 82, notes: "Kilit paslarda başarılı, defansif katkısı zayıf" },
        { name: "Oyuncu #4 (Stoper)", performance: 75, notes: "Pozisyon bilgisi iyi, hızlanmada yavaş" }
      ],
      sistem_uyumu: "Mevcut 4-3-3 sistemi kanat hücumları için ideal ancak defansif geçişlerde 4-2-3-1 formasyonuna dönülmesi orta saha direncini artırabilir. Mevki uyumsuzluğu olan oyuncu yok.",
      transfer_onerileri: [
        "Defansif yönü kuvvetli atletik bir 6 numara",
        "Rotasyon için hızlı ve çevik bir stoper",
        "Skor katkısı verebilecek bitirici bir santrafor"
      ]
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
    <div className="container py-10 md:py-16 min-h-screen">
      <section className="card p-8 md:p-12 mb-12">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-4">
          <BarChart3 className="w-4 h-4 mr-1" /> AI Analiz Araçları
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          Takım Analizi & Video Yükleme
        </h1>
        <p className="text-base text-slate-300 max-w-2xl">
          Takım veya maç videosu yükleyin, yapay zeka takımın genel performansını, güçlü/zayıf yönlerini ve transfer ihtiyaçlarını analiz etsin.
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

          {/* Team Info Form */}
          <Card className="border-white/10 hover:border-white/20">
            <CardHeader>
              <CardTitle>Takım Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Takım veya Maç Adı</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] focus:outline-none text-white placeholder-slate-400"
                  placeholder="Örn: U19 Derbi Maçı"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Yaş Grubu / Seviye</label>
                  <input
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white"
                    placeholder="U19"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bölge / Ülke</label>
                  <input
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white placeholder-slate-400"
                    placeholder="Türkiye"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mevcut Formasyon</label>
                <input
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E94560] text-white placeholder-slate-400"
                  placeholder="4-3-3"
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
              {file && formData.name ? 'Takım Analizi için Hazır!' : 'Video ve takım/maç adı gerekli'}
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

            {/* Insights and Recommendations */}
            <div className="md:col-span-1 lg:col-span-2 space-y-6">
              
              <Card className="border-white/20 bg-[#10B981]/10">
                <CardHeader>
                  <CardTitle className="text-lg text-[#10B981]">Güçlü ve Zayıf Yönler</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">✅ Güçlü Yönler</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                      {results.guclu_yonler.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">❌ Zayıf Yönler</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                      {results.zayif_yonler.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Sistem / Mevki Uyumu Analizi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm leading-relaxed">{results.sistem_uyumu}</p>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-[#E94560]/10">
                <CardHeader>
                  <CardTitle className="text-lg text-[#E94560]">Transfer Önerileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                    {results.transfer_onerileri.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Oyuncu Bazlı Performans Metrikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.oyuncu_metrikleri.map((player, idx) => (
                      <div key={idx} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white">{player.name}</span>
                          <span className="font-mono font-bold text-[#F7C948]">{player.performance}/100</span>
                        </div>
                        <p className="text-xs text-slate-400">{player.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              variant="outline" 
              onClick={reset}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              Yeni Analiz
            </Button>
          </div>
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
    </div>
  )
}