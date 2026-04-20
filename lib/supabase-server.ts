import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

type CookieStoreLike = {
  getAll: () => any[]
  set?: (...args: any[]) => any
}

function normalizeCookieStore(input: CookieStoreLike | { cookies: () => CookieStoreLike }): CookieStoreLike {
  if ('cookies' in (input as any)) {
    return (input as any).cookies()
  }
  return input as CookieStoreLike
}

export function createServerComponentClient(cookieStoreInput: CookieStoreLike | { cookies: () => CookieStoreLike }) {
  const cookieStore = normalizeCookieStore(cookieStoreInput)
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: any[]) {
          if (!cookieStore.set) return
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set?.(name, value, options)
          )
        },
      },
    }
  )
}

// Server-side user profile fetch
export async function getUserProfile(supabase: ReturnType<typeof createServerComponentClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .or(`user_id.eq.${user.id},id.eq.${user.id}`)
    .single()

  return { user, profile }
}
