# waterFasting — Claude Code Proje Talimatları

## Proje Hakkında
- **Proje adı:** waterFasting
- **Açıklama:** Su orucu takip uygulaması — PWA olarak hem Android hem iOS'ta çalışır
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + PWA
- **Dağıtım:** PWA — tarayıcıdan "Ana Ekrana Ekle" ile native-benzeri deneyim

## Mimari Kararlar
- **Next.js App Router** — file-based routing, server components, SSG
- **PWA (Serwist)** — service worker, offline cache, install prompt
- **Offline-first** — IndexedDB (Dexie.js) ile lokal veri, ağ olduğunda senkronize
- **Zustand** — hafif, boilerplate'siz state management
- **Tailwind CSS** — mobile-first responsive, dark mode desteği
- **Mobile-first tasarım** — 390px (iPhone) genişliğinden başla, yukarı ölçekle
- Basit ve temiz UI — sağlık uygulaması olarak güven verici tasarım

## Dosya Yapısı Konvansiyonları
```
src/
├── app/                # Next.js App Router sayfaları
│   ├── layout.tsx      # Root layout + PWA meta
│   ├── page.tsx        # Ana sayfa (oruç timer)
│   ├── history/        # Geçmiş oruçlar
│   ├── stats/          # İstatistikler
│   └── settings/       # Ayarlar
├── components/         # Paylaşılan UI bileşenleri
│   ├── ui/             # Temel UI (Button, Card, Modal)
│   └── fasting/        # Oruç-spesifik bileşenler
├── hooks/              # Custom React hooks
├── lib/                # Veritabanı, PWA yardımcıları
├── stores/             # Zustand store'ları
├── types/              # TypeScript tip tanımları
├── constants/          # Sabit değerler
└── __tests__/          # Test dosyaları
public/
├── manifest.json       # PWA manifest
├── icons/              # PWA ikonları (192x192, 512x512)
└── sw.js               # Service worker (Serwist tarafından üretilir)
```

## İsimlendirme Kuralları
- Dosyalar: kebab-case (fasting-timer.ts)
- Bileşenler: PascalCase (FastingTimer.tsx)
- Fonksiyonlar: camelCase (startFasting)
- Sabitler: UPPER_SNAKE_CASE (MAX_FASTING_HOURS)
- Tipler/Interface: PascalCase, "I" prefiksi yok (FastingSession, not IFastingSession)
- Next.js sayfalar: page.tsx, layout.tsx (framework convention)

## Domain Terimleri
- **Fasting** = Oruç dönemi
- **Feeding window** = Yeme penceresi
- **Fast duration** = Oruç süresi
- **Break fast** = Orucu bitirme
- **Streak** = Ardışık başarılı oruç serisi
- **Hydration** = Su tüketimi takibi

## Test Stratejisi
- Birim testleri: Vitest + React Testing Library
- Test dosya konumu: src/__tests__/
- Minimum kapsam hedefi: %80
- Test isimlendirme: describe("FonksiyonAdı") → it("ne yapması gerektiği")

## ASLA YAPMA
- node_modules, .env, veya build çıktılarını commit'leme
- API anahtarlarını koda gömme
- any tipini kullanma
- console.log ile debugging bırakma
- Test yazmadan PR açma
- Kullanıcı sağlık verisini şifrelenmeden saklama
- "use client" direktifini gereksiz yere ekleme — sadece interaktif bileşenlerde

## Sık Kullanılan Komutlar
```bash
# Geliştirme
npm run dev

# Test
npm test

# Lint
npm run lint

# Build
npm run build

# PWA test (build sonrası)
npx serve out
```

## Bağımlılıklar
- **next** — React framework, App Router
- **react / react-dom** — UI kütüphanesi
- **typescript** — tip güvenliği
- **tailwindcss** — utility-first CSS
- **serwist** — PWA service worker yönetimi
- **dexie** — IndexedDB wrapper, offline veri
- **zustand** — state management
- **vitest** — test framework
- **@testing-library/react** — bileşen testleri
