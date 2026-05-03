import { createClientComponentClient } from '@/lib/supabase-client'
import { useEffect, useState } from 'react'

interface Profile {
  id: string
  role: string
  full_name?: string | null
  phone?: string | null
  status?: string | null
  subscription_tier?: string | null
  email?: string | null
}

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  useEffect(() => {
    let mounted = true

    async function initialize() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const user = session?.user || null
        if (!mounted) return
        
        setSession(user)
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, role, full_name, phone, status, subscription_tier, email')
            .or(`user_id.eq.${user.id},id.eq.${user.id}`)
            .single()
          
          if (!mounted) return
          setProfile((data as any) || null)
        } else {
          setProfile(null)
        }
      } catch (err) {
        console.error('Session initialization error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initialize()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null
      setSession(user)
      if (user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('id, role, full_name, phone, status, subscription_tier, email')
            .or(`user_id.eq.${user.id},id.eq.${user.id}`)
            .single()
          if (mounted) setProfile((data as any) || null)
        } catch (e) {
          if (mounted) setProfile(null)
        }
      } else {
        if (mounted) setProfile(null)
      }
      if (mounted) setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return { session, profile, loading }
}



