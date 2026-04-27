"use client"

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white p-8 flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="w-24 h-24 mx-auto bg-white/10 rounded-3xl" />
        <Skeleton className="h-12 w-64 mx-auto bg-white/10 rounded-2xl" />
        <Skeleton className="h-8 w-48 mx-auto bg-white/5 rounded-xl" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-3">
          <Skeleton className="h-12 w-32 bg-white/10 rounded-3xl" />
          <Skeleton className="h-12 w-32 bg-white/10 rounded-3xl" />
        </div>
        <Skeleton className="h-4 w-72 bg-white/5 rounded-full" />
      </div>
    </div>
  )
}

