"use client"

import { useSession } from '@/hooks/use-session'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut, User, Search } from 'lucide-react'
import Link from 'next/link'

export function UserMenu() {
  const { session, profile, loading } = useSession()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
    )
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/player-login">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            ⚽ Oyuncu
          </Button>
        </Link>
        <Link href="/scout-login">
          <Button size="sm" style={{background:'#f5a623', color:'#0d1b2a'}} className="font-bold hover:opacity-90">
            🔍 İzci
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{session.user.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {profile?.role === 'athlete' && (
          <Link href="/athlete/dashboard">
            <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Panelim</span>
            </DropdownMenuItem>
          </Link>
        )}
        {profile?.role === 'scout' && (
          <>
            <Link href="/scout/overview">
              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>İzci Paneli</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/scout/search">
              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                <Search className="mr-2 h-4 w-4" />
                <span>Yetenek Keşfi</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/scout/transfer-list">
              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Transfer Listem</span>
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <Link href="/settings">
          <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Hesap Ayarları</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout} className="focus:bg-white/10 cursor-pointer text-red-400 focus:text-red-300">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

