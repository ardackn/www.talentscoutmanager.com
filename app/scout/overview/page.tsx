const pipeline = [
  {
    stage: 'Yeni adaylar',
    count: 18,
    description: 'İlk tarama bekleyen yeni sporcu profilleri.',
  },
  {
    stage: 'İzleme listesi',
    count: 9,
    description: 'Kısa listeye alınmış ve takip edilen oyuncular.',
  },
  {
    stage: 'Canlı değerlendirme',
    count: 6,
    description: 'Maç, video ve performans verisiyle aktif analiz.',
  },
  {
    stage: 'Kulübe önerildi',
    count: 3,
    description: 'Scout raporu tamamlanan ve paylaşıma hazır adaylar.',
  },
]

const notes = [
  'Video, fiziksel ölçüm ve istatistik akışları tek sayfada özetlenir.',
  'Scout ekibi adayları aşama bazlı izleyebilir.',
  'Bu sürüm, kayıp proje dosyaları sonrası yeniden oluşturulan temel workspace ekranıdır.',
]

export default function ScoutOverviewPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="card p-8 md:p-10">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Scout Workspace
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
          Aday havuzu ve değerlendirme akışı
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          Scout operasyonları için temel görünüm geri kuruldu. Bu alan, aday
          yönetimi ve değerlendirme pipeline’ını hızlıca gözden geçirmek için
          başlangıç ekranı olarak hizmet verir.
        </p>

        <div className="mt-8 grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          {pipeline.map((item) => (
            <article key={item.stage} className="card p-6">
              <p className="text-sm text-slate-400">{item.stage}</p>
              <p className="mt-3 text-3xl font-black text-white">{item.count}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="card p-8">
          <h2 className="text-xl font-bold text-white">Scout notları</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            {notes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>

        <article className="card p-8">
          <h2 className="text-xl font-bold text-white">Hızlı geçişler</h2>
          <div className="mt-6 grid gap-3">
            <a
              href="/athlete/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Athlete dashboard
            </a>
            <a
              href="/admin/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Admin girişi
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
