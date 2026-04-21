"use client"

import HeroBanner from '@/components/athlete/HeroBanner'
import AthleteSearch from '@/components/athlete/AthleteSearch'
import Pricing from '@/components/sections/Pricing'

export default function HomePage() {
  return (
    <main className=\"min-h-screen\">
      <section className=\"pt-24 pb-20\">
        <div className=\"container mx-auto px-6\">
          <HeroBanner 
            title={`Discover Next Generation Football Stars`}
            subtitle={`Professional scouting platform connecting elite talent with top clubs worldwide. Advanced AI analysis and verified video highlights.`}
            badge=\"Trusted by 50+ Pro Clubs\"
          />
        </div>
      </section>

      <section className=\"-mt-12\">
        <div className=\"container mx-auto px-6\">
          <AthleteSearch 
            title=\"Find Your Perfect Athlete\"
            subtitle=\"Search 5,000+ verified football players worldwide\"
          />
        </div>
      </section>

      <section className=\"py-24 bg-gradient-to-b from-slate-950/50 to-black/50\">
        <div className=\"container mx-auto px-6\">
          <Pricing />
        </div>
      </section>
    </main>
  )
}
