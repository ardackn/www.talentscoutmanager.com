import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export const createClientComponentClient = <T = Database>() => createBrowserClient<T>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
