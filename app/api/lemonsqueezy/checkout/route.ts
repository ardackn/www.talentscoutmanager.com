import { NextRequest, NextResponse } from 'next/server';
import { createTSMCheckout } from '@/lib/lemonsqueezy';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@/lib/supabase-server';


export async function POST(req: NextRequest) {
  try {
    const { variantId, tier } = await req.json();
    
    if (!variantId || !tier || !['pro', 'elite'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

const cookieStore = cookies();
const supabase = createServerComponentClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const checkout = await createTSMCheckout({
      variantId,
      userId: user.id,
      userEmail: user.email!,
      tier: tier as 'pro' | 'elite',
    });

return NextResponse.json({ url: checkout.data?.url || checkout.url });
  } catch (error) {
    console.error('LemonSqueezy checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

