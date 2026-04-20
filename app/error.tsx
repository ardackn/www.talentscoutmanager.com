"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A] text-white p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent font-clash">
            Something went wrong!
          </h1>
          <p className="text-xl text-slate-400 font-dm">
            An unexpected error has occurred.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => reset()} 
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:shadow-xl shadow-lg font-bold px-8 py-4 text-lg rounded-2xl font-clash"
            size="lg"
          >
            Try again
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 font-bold px-8 py-4 text-lg rounded-2xl font-clash"
            size="lg"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
        {error.digest && (
          <div className="text-sm text-slate-500 bg-slate-900/50 p-4 rounded-xl backdrop-blur-sm">
            <code>{error.digest}</code>
          </div>
        )}
      </div>
    </div>
  )
}

