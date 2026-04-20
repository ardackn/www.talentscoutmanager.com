import { createServerComponentClient } from '@/lib/supabase-server'
import AthleteProfile from '@/components/athlete/AthleteProfile'
import MessageManagerModalClient from './page_client'

type Props = { params: { slug: string } }

export default async function AthleteDetailPage({ params }: Props) {
  const supabase = createServerComponentClient({ getAll: () => [] })
  const { data: athlete } = await supabase
    .from('athlete_profiles')
    .select('id, slug, full_name, sport, position, nationality, birth_date, profiles(email, phone)')
    .eq('slug', params.slug)
    .single()

  if (!athlete) {
    return <main className="container py-12 text-white">Athlete not found.</main>
  }

  return (
    <main className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <AthleteProfile athlete={athlete as any} />
        <aside className="rounded-xl border border-white/15 bg-white/5 p-4">
          <MessageManagerModalClient athleteId={(athlete as any).id} athleteName={(athlete as any).full_name} />
        </aside>
      </div>
    </main>
  )
}
