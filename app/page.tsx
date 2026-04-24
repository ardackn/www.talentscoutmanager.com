import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight font-display drop-shadow-lg">
          Talent Scout <span className="text-yellow-500">Manager</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 drop-shadow-md">
          Yapay Zeka Destekli Futbolcu Keşif ve Analiz Platformu
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            Hemen Başla
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  )
}