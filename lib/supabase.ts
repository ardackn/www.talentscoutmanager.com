import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

type CookieOptions = {
  name: string
  value: string
  options: any
}

export const createClientComponentClient = () => createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const createServerComponentClient = () => createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
  cookies: {
      getAll() {
        return cookies().getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => 
            cookies().set(name, value, options)
          )
        } catch {
          // Ignore `setAll` on Server Components
        }
      },
    },
  }
)

// createRouteHandlerClient removed - not needed yet

// Server-side user profile fetch
export async function getUserProfile(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return { user, profile }
}


