import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';

lemonSqueezySetup({ 
  apiKey: process.env.LEMONSQUEEZY_API_KEY! 
});

export async function createTSMCheckout({
  variantId,
  userId,
  userEmail,
  tier,
}: {
  variantId: string
  userId: string
  userEmail: string
  tier: 'pro' | 'elite'
}) {
const checkout = await createCheckout({
  storeId: process.env.LEMONSQUEEZY_STORE_ID!,
  variantIds: [parseInt(variantId)],
  checkoutOptions: {
    embed: false,
  },
  checkoutData: {
    email: userEmail,
    custom: {
      user_id: userId,
      tier,
    },
  },
  productOptions: {
    redirectUrl: `${process.env.NEXT_PUBLIC_URL}/scout/settings?success=true`,
  },
});
return checkout;
}

export async function getLemonSubscription(subscriptionId: string) {
  // Implementation for getting subscription status
  return null;
}

