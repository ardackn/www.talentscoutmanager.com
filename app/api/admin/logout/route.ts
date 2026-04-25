export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const redirectUrl = new URL('/admin/login', request.url)
  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set('admin_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })

  return response
}
