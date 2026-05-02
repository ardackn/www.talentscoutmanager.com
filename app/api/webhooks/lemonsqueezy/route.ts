export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';



export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-signature') || '';
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';

    // Read the raw body as text for verification
    const rawBody = await req.text();

    if (secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const data = payload.data;
    const customData = payload.meta.custom_data;

    if (!customData || !customData.user_id) {
      return NextResponse.json({ success: true, message: 'No user_id found in custom_data, ignoring.' });
    }

    const userId = customData.user_id;
    const tier = customData.tier; // pro or elite

    // Connect to Supabase using Service Role to bypass RLS for webhook
    const supabase = createServerClient<any>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return [] },
          setAll() {}
        }
      }
    );

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const attributes = data.attributes;
      const status = attributes.status;
      const subscriptionId = data.id;
      const customerId = attributes.customer_id;
      const variantId = attributes.variant_id;
      const endsAt = attributes.ends_at; // might be null

      await supabase
        .from('profiles')
        .update({
          subscription_tier: tier,
          subscription_status: status,
          lemon_subscription_id: subscriptionId.toString(),
          lemon_customer_id: customerId.toString(),
          lemon_variant_id: variantId.toString(),
          subscription_period_end: endsAt,
        } as any)
        .eq('id', userId);
        
      console.log(`Updated subscription for user ${userId} to ${status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
