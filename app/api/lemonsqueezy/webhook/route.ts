import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('X-Signature') as string;

    // Verify webhook signature
    if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
      console.error('Missing LEMONSQUEEZY_WEBHOOK_SECRET');
      return NextResponse.json({ error: 'Webhook secret missing' }, { status: 500 });
    }

    const hmac = crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature || '', 'utf8');

    if (signature && !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventName = event.meta.event_name;
    const userId = event.meta.custom_data?.user_id;
    const tier = event.meta.custom_data?.tier as 'pro' | 'elite';

    if (!userId) return NextResponse.json({ received: true });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase env vars');
      return NextResponse.json({ error: 'Supabase config missing' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_resumed':
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: tier || 'pro',
            subscription_status: 'active',
            lemon_customer_id: String(event.data.attributes.customer_id),
            lemon_subscription_id: String(event.data.id),
            lemon_variant_id: String(event.data.attributes.variant_id),
            subscription_period_end: event.data.attributes.renews_at,
          })
          .eq('id', userId);
        break;

      case 'subscription_cancelled':
      case 'subscription_expired':
      case 'subscription_payment_failed':
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: 'free',
            subscription_status: 'inactive',
          })
          .eq('lemon_subscription_id', String(event.data.id));
        break;

      case 'subscription_updated':
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: event.data.attributes.status,
            subscription_period_end: event.data.attributes.renews_at,
          })
          .eq('lemon_subscription_id', String(event.data.id));
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('LemonSqueezy webhook error:', error);
    return NextResponse.json({ received: true });
  }
}
