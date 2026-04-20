"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const pricingTiers = [
  {
    name: 'Starter',
    price: 0,
    description: 'Get started with basic access',
    features: ['Basic athlete search', 'View 5 profiles/month', 'Email support'],
    cta: 'Get Started - Free',
    href: '/register'
  },
  {
    name: 'Pro',
    price: 49,
    description: 'Full access for serious scouts',
    features: ['Unlimited search & profiles', 'Full AI analytics', 'Direct contact access', 'Priority support'],
    cta: 'Buy Now',
    href: '/checkout/pro'
  },
  {
    name: 'Enterprise',
    price: 149,
    description: 'For agencies & clubs',
    features: ['Everything in Pro', 'Bulk data export', 'Advanced filters', 'Direct messaging', 'Custom integrations', 'Dedicated manager'],
    cta: 'Contact Sales',
    href: '/checkout/enterprise'
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-black/50 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="font-clash text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--red-primary)] via-red-400 to-[var(--gold-primary)] bg-clip-text text-transparent drop-shadow-2xl"
            whileInView={{ scale: 1.05 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-2xl mx-auto font-dm"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            Choose the perfect plan for your scouting needs. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`group relative rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl hover:border-[var(--red-primary)]/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-[var(--red-primary)]/20 transition-all duration-500 overflow-hidden ${index === 1 ? 'ring-2 ring-[var(--red-primary)]/30 scale-[1.02]' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[var(--red-primary)] to-red-500 text-white px-6 py-2 rounded-xl font-bold font-clash text-sm shadow-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-black font-clash group-hover:text-[var(--red-primary)] transition-colors">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-5xl lg:text-6xl font-black text-white mb-2">
                  ${tier.price}
                  {tier.price > 0 && <span className="text-2xl text-slate-400 font-light">/mo</span>}
                </CardDescription>
                <p className="text-lg text-slate-300">{tier.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
                    <div className="w-6 h-6 mt-0.5 bg-[var(--red-primary)] rounded-full flex-shrink-0" />
                    <span className="text-slate-200 font-dm">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[var(--red-primary)] to-transparent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500" />
              
              <motion.div whileHover={{ scale: 1.05 }} className="pt-4">
                <Link href={tier.href}>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-[var(--red-primary)] to-red-500 hover:from-red-500 font-bold font-clash text-lg py-7 rounded-2xl border-0 shadow-xl hover:shadow-2xl hover:shadow-[var(--red-primary)]/25 backdrop-blur-sm"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

