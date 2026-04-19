import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const redirectUrl = new URL('/admin/dashboard', request.url)
  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set('admin_session', 'demo-admin-session', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
