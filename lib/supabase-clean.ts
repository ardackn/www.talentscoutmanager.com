// Clean entry point - redirects to correct Supabase clients
// Use lib/supabase-server.ts for server components/route handlers
// Use lib/supabase-client.ts for client components
// This file prevents import errors during build

export { createClientComponentClient } from './supabase-client';
export { createServerComponentClient, getUserProfile } from './supabase-server';
export type { Database } from '@/types/supabase';
