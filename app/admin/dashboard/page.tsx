const metrics = [
  { label: 'Aktif scout', value: '24' },
  { label: 'Açık değerlendirme', value: '138' },
  { label: 'Bugünkü başvuru', value: '42' },
  { label: 'Yayındaki içerik', value: '16' },
]

const activity = [
  'Scout ekipleri için yeni pipeline görünümü yayına alındı.',
  'Admin giriş ve dashboard akışı yeniden kuruldu.',
  'Athlete ve scout alanları için temel sayfalar eklendi.',
]

export default function AdminDashboardPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="flex flex-col gap-6">
        <div className="card p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                Admin Dashboard
              </span>
              <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                Operasyon merkezi
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Bu ekran, kaybolan kaynaklar sonrası sistemi tekrar çalışır hale
                getirmek için oluşturulmuş yönetim özetidir.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ana sayfa
              </a>
              <a
                href="/api/admin/logout"
                className="rounded-full bg-[#E94560] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b6b]"
              >
                Oturumu kapat
              </a>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <article key={item.label} className="card p-6">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="card p-8">
            <h2 className="text-xl font-bold text-white">Son güncellemeler</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              {activity.map((item) => (
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
                href="/athlete/dashboard"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Athlete dashboard
              </a>
              <a
                href="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Kullanıcı girişi
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  )
}
