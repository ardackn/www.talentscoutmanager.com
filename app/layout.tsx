import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import SupabaseProvider from '@/components/SupabaseProvider'
import ClientProviders from '@/components/ClientProviders'
import Script from 'next/script';
import type { ReactNode } from 'react'
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-clash',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Talent Scout Manager - AI Destekli Yetenek Keşfi',
  description: 'Dünyanın en gelişmiş AI destekli oyuncu analiz ve yetenek keşif platformu. Geleceğin yıldızlarını yapay zeka ile keşfedin.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ 
  children 
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(
      spaceGrotesk.variable,
      dmSans.variable,
      "font-sans"
    )}>
      <body className="bg-[#0D0D1A] text-white min-h-screen flex flex-col dark">
        <Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
