import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

  let user: unknown = null

  if (hasSupabaseEnv) {
    const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies: { name: string; value: string; options: any }[]) =>
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    })

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser
  }

  const adminSession = request.cookies.get('admin_session')

  // Protect Admin Dashboard
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect unauthenticated users from scout dashboard
  if (hasSupabaseEnv && pathname.startsWith('/scout/') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect unauthenticated users from athlete dashboard
  if (hasSupabaseEnv && pathname.startsWith('/athlete/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/scout/:path*', '/athlete/dashboard/:path*', '/admin/:path*'],
}
