import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerComponentClient, getUserProfile } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

  let user: User | null = null
  let profile: { role: string } | null = null

  if (true) { // Always check if env set
    const supabase = createServerComponentClient()

    const profileData = await getUserProfile(supabase)
    if (profileData) {
      user = profileData.user
      profile = profileData.profile
    }
  }

  const adminSession = request.cookies.get('admin_session')

  // Protect Admin Dashboard
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Role-based redirects for protected routes
  if (user && profile) {
    if (pathname === '/' && profile.role === 'scout') {
      return NextResponse.redirect(new URL('/scout/search', request.url))
    }
    if (pathname === '/' && profile.role === 'athlete') {
      return NextResponse.redirect(new URL('/athlete/profile', request.url))
    }
  }

  // Role-based redirects for protected routes
  if (user && profile) {
    if (pathname.startsWith('/scout/') && profile.role !== 'scout') {
      return NextResponse.redirect(new URL('/athlete/profile', request.url))
    }
    if (pathname.startsWith('/athlete/profile') && profile.role !== 'athlete') {
      return NextResponse.redirect(new URL('/scout/search', request.url))
    }
  }

  // Protect scout routes
  if (pathname.startsWith('/scout/') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect athlete routes
  if (pathname.match(/^\/athlete\/(profile|dashboard)/) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|register|login).*)',
    '/scout/:path*',
    '/athlete/:path*',
    '/admin/:path*',
  ],
}
