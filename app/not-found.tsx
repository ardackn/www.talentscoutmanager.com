export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A] text-white p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 7.44 1.18 6.76L12 17.77l-6.18 6.76L7 16.71l-5-7.44 6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-clash tracking-tight">
            404
          </h1>
          <p className="text-xl text-slate-400 font-dm max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg font-bold rounded-3xl font-clash shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ← Return Home
        </a>
      </div>
    </div>
  );
}
