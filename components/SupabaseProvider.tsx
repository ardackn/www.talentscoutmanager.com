'use client'

import { createClientComponentClient } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

interface SupabaseProviderProps {
  children: React.ReactNode
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const supabase = createClientComponentClient()
  const [supabaseError, setSupabaseError] = useState<string | null>(null)

  useEffect(() => {
    // Optional error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Handle auth state
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <>
      {children}
    </>
  )
}

