export default function LoginPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="card mx-auto max-w-2xl p-8 md:p-10">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Secure Access
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
          Talent Scout Manager giriş ekranı
        </h1>

        <p className="mt-4 text-base leading-8 text-slate-300">
          Uygulama kaynakları kaybolduğu için sistem, çalışır bir temel sürüm
          olarak yeniden kuruldu. Bu ekran üzerinden scout ve athlete alanlarına
          geçiş yapabilirsiniz.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href="/scout/overview"
            className="card rounded-2xl border border-white/10 p-6 transition hover:border-white/20 hover:bg-white/10"
          >
            <h2 className="text-lg font-bold text-white">Scout alanı</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Scout pipeline, aday yönetimi ve değerlendirme görünümü.
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#F7C948]">
              Devam et →
            </span>
          </a>

          <a
            href="/athlete/dashboard"
            className="card rounded-2xl border border-white/10 p-6 transition hover:border-white/20 hover:bg-white/10"
          >
            <h2 className="text-lg font-bold text-white">Athlete alanı</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Sporcu özeti, hedefler, medya ve performans kartları.
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#F7C948]">
              Devam et →
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ana sayfa
          </a>
          <a
            href="/admin/login"
            className="rounded-full bg-[#E94560] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b6b]"
          >
            Admin girişi
          </a>
        </div>
      </section>
    </main>
  )
}
