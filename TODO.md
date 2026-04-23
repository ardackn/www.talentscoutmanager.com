## TODO - Fix Next.js Build Error & Production Readiness

### Status: 🚀 In Progress

**Goal**: Fix `TypeError: createContext is not a function` and make `npm run build` pass for Vercel deploy.

---

## ✅ 1. FIX /app/not-found.tsx
- [x] Replace with pure Server Component (no hooks/client imports)
```
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A] text-white p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-clash">
          404
        </h1>
        <p className="text-xl text-slate-400 font-dm">Page not found</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 rounded-3xl font-bold text-lg font-clash">
          ← Go Home
        </a>
      </div>
    </div>
  );
}
```

---

## ✅ 2. FIX /app/layout.tsx  
- [x] Remove I18nextProvider/i18n imports
- [x] Create components/ClientProviders.tsx wrapper
- [x] Wrap providers in client boundary

**Priority: COMPLETED**

---

## 🔄 3. FIX CLIENT COMPONENTS
- [ ] Add `"use client"` to ALL files with:
```
app/scout/reports/page.tsx  ✓ useSession
app/marketplace/page.tsx    ✓ useSession  
app/athlete/dashboard/page.tsx ✓ useSession
components/UserMenu.tsx     ✓ useSession
components/athlete/AthleteProfile.tsx ✓ useSession
components/athlete/MessageManagerModal.tsx ✓ useSession
app/terms/privacy/refund pages already have ✓
```

---

## 🔄 4. i18n STRATEGY
```
Server Components: lib/i18n.ts (static ✅)
Client Components: react-i18next (isolated ✅)
Layout: Remove direct i18n import → ClientProviders
```

---

## 🔄 5. API ROUTES (Prevent build-time execution)
```
app/api/**/*
- [ ] Add `export const dynamic = 'force-dynamic'`
- [ ] Guard env vars: `if (!process.env.KEY) return NextResponse.json(...)`
```

**Files**: lemonsqueezy/webhook, mux/upload-url, analyze, admin/**

---

## 🔄 6. VALIDATION STEPS
```
[ ] npm run build ✅
[ ] npm run lint ✅  
[ ] npm run start (smoke test)
[ ] Check Vercel preview
[ ] Deploy production
```

---

## Next Action
1. Create components/ClientProviders.tsx
2. Update app/layout.tsx  
3. Batch-add "use client" to hook files
4. Test `npm run build`

**Progress: 15%** | **ETA: 45 mins**
