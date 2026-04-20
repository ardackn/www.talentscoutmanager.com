import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

type CookieOptions = {
  name: string
  value: string
  options: any
}

export const createServerComponentClient = () => createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return cookies().getAll()
      },
      setAll(cookiesToSet: CookieOptions[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => 
            cookies().set(name, value, options)
          )
        } catch {
          // Ignore on Server Components
        }
      },
    },
  }
)

// Server-side user profile fetch
export async function getUserProfile(supabase: ReturnType<typeof createServerComponentClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return { user, profile }
}
