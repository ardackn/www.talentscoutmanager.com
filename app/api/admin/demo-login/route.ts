export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  const password = url.searchParams.get('password')

  if (email === 'admin@talentscoutmanager.com' && password === '18062023aE!') {
    const redirectUrl = new URL('/admin/dashboard', request.url)
    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('admin_session', 'demo-admin-session-valid', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return response
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
