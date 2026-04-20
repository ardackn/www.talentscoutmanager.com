import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A] text-white p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-clash">
            404
          </h1>
          <p className="text-xl text-slate-400 font-dm">
            Page not found.
          </p>
        </div>
        <Button 
          asChild
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:shadow-xl shadow-lg font-bold px-12 py-6 text-xl rounded-3xl font-clash w-full sm:w-auto"
          size="lg"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}

