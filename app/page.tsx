const quickLinks = [
  {
    href: '/login',
    title: 'Scout Girişi',
    description: 'Scout kullanıcıları için güvenli giriş ekranı.',
  },
  {
    href: '/athlete/dashboard',
    title: 'Athlete Dashboard',
    description: 'Sporcular için profil ve performans özeti.',
  },
  {
    href: '/scout/overview',
    title: 'Scout Workspace',
    description: 'Scout boru hattı, aday havuzu ve değerlendirme akışı.',
  },
  {
    href: '/admin/login',
    title: 'Admin Paneli',
    description: 'Operasyon ve içerik yönetimi için yönetici girişi.',
  },
]

export default function HomePage() {
  return (
    <main className="container px-0 py-8 md:py-14">
      <section className="hero-grid">
        <div className="card p-8 md:p-10">
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            Talent Scout Manager
          </span>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Scout, athlete ve admin akışlarını tek merkezden yönetin.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Bu sürüm, kaybolmuş Next.js kaynaklarını toparlayıp projeyi yeniden
            çalışır hale getirmek için oluşturuldu. Ana giriş noktaları ve temel
            dashboard ekranları tekrar eklendi.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/admin/login"
              className="rounded-full bg-[#E94560] px-6 py-3 font-semibold text-white transition hover:bg-[#ff6b6b]"
            >
              Admin’e Git
            </a>
            <a
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Kullanıcı Girişi
            </a>
          </div>
        </div>

        <aside className="card p-8">
          <h2 className="text-xl font-bold text-white">Neler geri kuruldu?</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <li>• App Router tabanlı temel Next.js iskeleti</li>
            <li>• Login, admin login, scout ve athlete sayfaları</li>
            <li>• Middleware ile uyumlu rota yapısı</li>
            <li>• Tailwind destekli karanlık tema arayüzü</li>
          </ul>
        </aside>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="card p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/80"
          >
            <h2 className="text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {item.description}
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#F7C948]">
              Aç →
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}
