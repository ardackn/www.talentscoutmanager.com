import { createClientComponentClient } from '@/lib/supabase-clean'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface Profile {
  role: 'scout' | 'athlete'
}

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session?.user || null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return { session, profile, loading }
}

