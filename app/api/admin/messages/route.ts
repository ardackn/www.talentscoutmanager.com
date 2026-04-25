export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { talents } from '@/lib/talent-data'

export async function GET() {
  const unreadMessages = talents.flatMap(t => t.messages.filter(m => !m.replied))
  return NextResponse.json({ messages: unreadMessages })
}

export async function POST(request: NextRequest) {
  // Reply logic: update message replied = true, add reply
  // Simplified
  return NextResponse.json({ success: true })
}
