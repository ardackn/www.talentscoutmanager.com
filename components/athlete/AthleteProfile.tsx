"use client"

import { useSession } from '@/hooks/use-session'

type AthleteProfileData = {
  id: string
  full_name: string
  sport: string
  position: string
  nationality: string
  birth_date: string
  profiles?: {
    email?: string | null
    phone?: string | null
  } | null
}

export default function AthleteProfile({ athlete }: { athlete: AthleteProfileData }) {
  const { profile } = useSession()
  const isAdmin = profile?.role === 'admin'
  const age = Math.max(0, new Date().getFullYear() - new Date(athlete.birth_date).getFullYear())

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-white">{athlete.full_name}</h1>
      <p className="text-slate-300">{athlete.position} • {athlete.sport} • {athlete.nationality} • Age {age}</p>
      {isAdmin && athlete.profiles?.email && <p className="text-xs text-gray-400">{athlete.profiles.email}</p>}
      {isAdmin && athlete.profiles?.phone && <p className="text-xs text-gray-400">{athlete.profiles.phone}</p>}
    </div>
  )
}
