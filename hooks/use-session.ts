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
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user || null
      setSession(user)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('id, role, full_name, phone, status, subscription_tier, email')
          .or(`user_id.eq.${user.id},id.eq.${user.id}`)
          .single()
        setProfile((data as any) || null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null
      setSession(user)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('id, role, full_name, phone, status, subscription_tier, email')
          .or(`user_id.eq.${user.id},id.eq.${user.id}`)
          .single()
        setProfile((data as any) || null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return { session, profile, loading }
}



