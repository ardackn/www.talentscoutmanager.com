export default function AdminLoginPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="card mx-auto max-w-2xl p-8 md:p-10">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Admin Access
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
          Yönetici girişi
        </h1>

        <p className="mt-4 text-base leading-8 text-slate-300">
          Orijinal admin modülü kayıp olduğu için bu alan temel erişim ekranı
          olarak yeniden oluşturuldu. Yönetici rotaları için giriş başlangıç
          noktası artık burada.
        </p>

        <form
          action="/api/admin/demo-login"
          method="GET"
          className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 p-6"
        >
          <div className="grid gap-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                E-posta
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                placeholder="admin@talentscoutmanager.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#E94560]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Şifre
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#E94560]"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#E94560] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b6b]"
              >
                Dashboard’a geç
              </button>
              <a
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ana sayfa
              </a>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}
