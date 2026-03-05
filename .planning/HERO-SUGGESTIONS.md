# Hero Section — Görsel, Animasyon ve Grafik Önerileri

**Mevcut:** Maximalist hero — floating blobs, split typography, tech marquee, decorative block.

---

## Eklenebilecek Görseller

### 1. Profil / Avatar Fotoğrafı

- **Konum:** Sağ taraftaki decorative block yerine veya yanında
- **Stil:** Yuvarlak veya organik kesim, hafif gölge, border accent rengi
- **Boyut:** Desktop’ta ~200–300px, mobilde gizlenebilir
- **Öneri:** `next/image` ile optimize, `rounded-3xl` veya `rounded-full` + `ring-4 ring-[var(--color-accent)]/30`

### 2. Abstract SVG / Illustration

- **Geometrik şekiller:** Üçgen, daire, çizgiler — Electric Warm palette
- **Kod snippet görseli:** Syntax highlighted, blur efektli arka plan
- **3D / isometric:** Küçük bir “dev workspace” illüstrasyonu

### 3. Gradient Mesh / Noise

- **CSS gradient mesh:** `radial-gradient` katmanları
- **Perlin noise:** Mevcut grain overlay’e benzer, hero’ya özel

---

## Animasyon Önerileri

### 1. Harf Bazlı Reveal (Letter-by-Letter)

- **“Onur Ata Asar”** her harf için `staggerChildren` ile fade-in
- **Kütüphane:** Framer Motion `split` / `character` animasyonu
- **Örnek:** `"Asar"` her harf 0.03s delay ile

### 2. Cursor / Mouse Takip

- **Glow:** Mouse pozisyonuna göre hafif gradient glow
- **Spotlight:** Mouse etrafında soft spotlight

### 3. Gradient Shift

- **“Asar”:** Hover veya sürekli animasyonla gradient renklerinin kayması
- **Örnek:** `background-position` veya `hue-rotate` animasyonu

### 4. Floating Elements

- **Parallax:** Scroll ile hafif hareket
- **Yavaş dönme:** Küçük bir blob veya ikon için `rotate` animasyonu

### 5. Scroll Indicator

- **Bounce / pulse:** “Scroll” veya ok ikonu
- **Animasyon:** `y: [0, 8, 0]` infinite

---

## Grafik Önerileri

### 1. Tech Stack / Badge

- **Yığın:** React, Next.js, TypeScript vb. ikonlar
- **Stil:** Yuvarlak badge’ler, hover’da scale

### 2. Dekoratif Çizgiler / Bracket

- **`<` ve `>`:** İsim etrafında
- **Stil:** Syne font, accent rengi, hafif opacity

### 3. Blob / Shape

- **Sağ:** `clip-path` ile organik kesim
- **Renk:** `var(--color-accent)` veya `var(--color-highlight)`

### 4. Grid / Dot Pattern

- **Arka plan:** Hafif grid veya nokta deseni
- **Kullanım:** `background-image` veya SVG pattern

### 5. Code Snippet (Statik)

- **Örnek:** `const greeting = "Selam";` gibi
- **Stil:** Monospace, `var(--color-accent)` vurgu, blur

---

## Öncelik Önerisi

| Öncelik | Öneri                       | Zorluk |
| ------- | --------------------------- | ------ |
| 1       | Profil fotoğrafı (sağ blok) | Düşük  |
| 2       | Harf bazlı reveal           | Orta   |
| 3       | Scroll indicator            | Düşük  |
| 4       | Gradient shift animasyonu   | Düşük  |
| 5       | `< Onur Ata Asar >` bracket | Düşük  |

---

## Mevcut Bileşenler

- `HeroBackground.tsx` — Floating blobs, grid overlay
- `HeroTechMarquee.tsx` — Scrolling tech tags
- `HeroEntrance.tsx` — Staggered entrance
- `MagneticButton.tsx` — Hover magnetic effect

---

_Planlama: 2026-03-05_
