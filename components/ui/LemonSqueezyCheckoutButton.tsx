"use client"

import React from 'react';

interface LemonSqueezyCheckoutButtonProps {
  productId: string;
  variantId: string;
  children: React.ReactNode;
  className?: string;
}

export default function LemonSqueezyCheckoutButton({
  productId,
  variantId,
  children,
  className,
}: LemonSqueezyCheckoutButtonProps) {
  const handleCheckout = () => {
    if (typeof window !== 'undefined' && (window as any).LemonSqueezy) {
      (window as any).LemonSqueezy.Url.Open(`https://talentscoutmanager.lemonsqueezy.com/checkout/buy/${variantId}?product=${productId}`);
    } else {
      console.error('Lemon Squeezy script not loaded. Falling back to direct link.');
      window.open(`https://talentscoutmanager.lemonsqueezy.com/checkout/buy/${variantId}?product=${productId}`, '_blank');
    }
  };

  return (
    <button onClick={handleCheckout} className={className}>
      {children}
    </button>
  );
}