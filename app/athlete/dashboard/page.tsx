const performance = [
  { label: 'Maç formu', value: '92%' },
  { label: 'Sprint kapasitesi', value: '8.7/10' },
  { label: 'İzlenme skoru', value: '81' },
]

const highlights = [
  'Son 5 maçta 3 gol, 2 asist',
  'Video ve medya alanları için temel vitrin hazırlandı',
  'Scout görünümüne hızlı geçiş bağlantıları eklendi',
]

export default function AthleteDashboardPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="card p-8 md:p-10">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Athlete Dashboard
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
          Sporcu performans özeti
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          Bu sayfa, kaybolan proje kaynakları sonrası athlete tarafını yeniden
          çalışır hale getirmek için oluşturuldu. Temel performans göstergeleri,
          öne çıkan gelişmeler ve hızlı navigasyon burada yer alır.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {performance.map((item) => (
            <article key={item.label} className="card p-6">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="card p-8">
          <h2 className="text-xl font-bold text-white">Öne çıkanlar</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            {highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>

        <article className="card p-8">
          <h2 className="text-xl font-bold text-white">Hızlı geçişler</h2>
          <div className="mt-6 grid gap-3">
            <a
              href="/scout/overview"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Scout workspace
            </a>
            <a
              href="/admin/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Admin alanı
            </a>
            <a
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ana sayfa
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}
