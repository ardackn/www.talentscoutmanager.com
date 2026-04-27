import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-preview',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const priceId = session.line_items?.data[0].price?.id;

    let plan = 'FREE';
    if (priceId === process.env.STRIPE_GOLD_PRICE_ID) plan = 'GOLD';
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'PRO';

    await prisma.user.update({
      where: { email: email! },
      data: {
        plan,
        stripeCustomerId: session.customer as string,
        stripePriceId: priceId,
      },
    });
  }

  return NextResponse.json({ received: true });
}