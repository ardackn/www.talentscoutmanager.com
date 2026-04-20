import { NextRequest, NextResponse } from 'next/server'
import { talents, getUnreadMessages } from '@/lib/talent-data'

export async function GET() {
  const unread = getUnreadMessages()
  return NextResponse.json({ messages: unread })
}

export async function POST(request: NextRequest) {
  // Reply logic: update message replied = true, add reply
  // Simplified
  return NextResponse.json({ success: true })
}

