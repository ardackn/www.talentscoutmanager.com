import { createClientComponentClient, createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export { createClientComponentClient, createServerComponentClient }

export const createServerClient = (cookieStore: ReturnType<typeof cookies>) => 
  createServerComponentClient<Database>({ cookies: () => cookieStore })
