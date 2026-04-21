import { NextRequest, NextResponse } from 'next/server';
import { createMuxUpload } from '@/lib/mux';

export async function POST(req: NextRequest) {
  try {
    const upload = await createMuxUpload();
    return NextResponse.json({
      uploadId: upload.id,
      url: upload.url
    });
  } catch (error) {
    console.error('Mux upload error:', error);
    return NextResponse.json({ error: 'Mux upload failed' }, { status: 500 });
  }
}

