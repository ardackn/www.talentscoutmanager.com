"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginRedirect() {
  const router = useRouter()
  const params = useSearchParams()
  const role = params.get('role')

  useEffect(() => {
    if (role === 'scout') {
      router.replace('/scout-login')
    } else {
      router.replace('/player-login')
    }
  }, [role, router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d1b2a' }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: '#00e5cc', borderTopColor: 'transparent' }}></div>
        <p className="text-gray-400">Yönlendiriliyor...</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d1b2a' }}>
        <div className="w-12 h-12 rounded-full border-4 animate-spin" style={{ borderColor: '#00e5cc', borderTopColor: 'transparent' }}></div>
      </div>
    }>
      <LoginRedirect />
    </Suspense>
  )
}
