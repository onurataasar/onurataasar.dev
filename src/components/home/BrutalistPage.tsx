"use client";

import { useState, useEffect } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type CursorVariant = "default" | "link";

interface Project {
  num: string;
  name: string;
  category: string;
  year: string;
  icon: "pill" | "cart" | "car" | "bulb" | "chart" | "tooth";
  summary: string;
  stats: { label: string; value: string }[];
  sector: string;
  team: string;
  stack: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "Farmaborsa",
    category: "B2B Marketplace",
    year: "2024",
    icon: "pill",
    summary:
      "İlaç sektörüne özel B2B pazar yeri. Tedarikçi ve eczane yönetimi, sipariş takibi ve faturalama entegrasyonu.",
    stats: [
      { label: "Kullanıcı", value: "2K+" },
      { label: "SKU", value: "50K+" },
      { label: "İşlem", value: "99.9%" },
    ],
    sector: "Sağlık / İlaç",
    team: "4 Kişi",
    stack: "Next.js · Redux · REST",
  },
  {
    num: "02",
    name: "Lokman E-Ticaret",
    category: "B2B Platform",
    year: "2023",
    icon: "cart",
    summary:
      "Tıbbi malzeme ve sarf ürünleri için B2B e-ticaret platformu. Katalog, sepet, ödeme ve raporlama modülleri.",
    stats: [
      { label: "Ürün", value: "15K+" },
      { label: "Sipariş/gün", value: "500+" },
      { label: "Uptime", value: "99.8%" },
    ],
    sector: "Medikal / E-ticaret",
    team: "3 Kişi",
    stack: "React · MUI · GraphQL",
  },
  {
    num: "03",
    name: "Ördek Panel",
    category: "Admin Panel",
    year: "2023",
    icon: "car",
    summary:
      "Araç kiralama filolarını yöneten kapsamlı admin paneli. Rezervasyon, araç durumu ve müşteri yönetimi.",
    stats: [
      { label: "Araç", value: "300+" },
      { label: "Rezervasyon", value: "1K+/ay" },
      { label: "Panel", value: "React" },
    ],
    sector: "Araç Kiralama",
    team: "2 Kişi",
    stack: "React · Zustand · Node",
  },
  {
    num: "04",
    name: "Ledbim",
    category: "Landing Page",
    year: "2024",
    icon: "bulb",
    summary:
      "LED aydınlatma çözümleri şirketi için performans odaklı kurumsal web sitesi. SEO ve Core Web Vitals optimizasyonu.",
    stats: [
      { label: "LCP", value: "<1.2s" },
      { label: "CLS", value: "0.01" },
      { label: "Lighthouse", value: "98" },
    ],
    sector: "Aydınlatma",
    team: "1 Kişi",
    stack: "Next.js · TS · Tailwind",
  },
  {
    num: "05",
    name: "Fundervest",
    category: "Web Application",
    year: "2022",
    icon: "chart",
    summary:
      "Yatırımcı ve girişimleri buluşturan web uygulaması. Profil eşleştirme, mesajlaşma ve belge yönetimi.",
    stats: [
      { label: "Kullanıcı", value: "500+" },
      { label: "Eşleşme", value: "85%" },
      { label: "NPS", value: "72" },
    ],
    sector: "Fintech / Yatırım",
    team: "5 Kişi",
    stack: "React · Firebase · TS",
  },
  {
    num: "06",
    name: "Crystal Aligner",
    category: "Tracking System",
    year: "2022",
    icon: "tooth",
    summary:
      "Dental aligner üretim sürecini uçtan uca izleyen sistem. Hasta takibi, sipariş durumu ve klinisyen paneli.",
    stats: [
      { label: "Hasta", value: "1K+" },
      { label: "Klinik", value: "20+" },
      { label: "Acc.", value: "99%" },
    ],
    sector: "Diş Hekimliği",
    team: "3 Kişi",
    stack: "Next.js · Prisma · TS",
  },
];

const TICKER_ITEMS = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND",
  "FRAMER MOTION",
  "NODE",
  "REDUX TOOLKIT",
  "REACT QUERY",
  "PLAYWRIGHT",
  "JEST",
  "VERCEL",
  "SENTRY",
];

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconPill({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <rect
        x="12"
        y="36"
        width="72"
        height="24"
        rx="12"
        stroke={color}
        strokeWidth="3"
      />
      <line x1="48" y1="36" x2="48" y2="60" stroke={color} strokeWidth="3" />
      <circle cx="30" cy="48" r="4" fill={color} />
      <circle cx="66" cy="48" r="4" fill={color} />
    </svg>
  );
}

function IconCart({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <path
        d="M12 20h10l14 36h32l10-28H30"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="72" r="6" stroke={color} strokeWidth="3" />
      <circle cx="68" cy="72" r="6" stroke={color} strokeWidth="3" />
      <line
        x1="44"
        y1="20"
        x2="44"
        y2="56"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="56"
        y1="20"
        x2="56"
        y2="56"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function IconCar({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <path
        d="M8 56L20 36h56l12 20v8H8v-8z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M28 36l6-14h28l6 14"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="68" r="8" stroke={color} strokeWidth="3" />
      <circle cx="68" cy="68" r="8" stroke={color} strokeWidth="3" />
    </svg>
  );
}

function IconBulb({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <path
        d="M48 16C34 16 24 26 24 40c0 10 6 18 14 22v10h20V62c8-4 14-12 14-22 0-14-10-24-24-24z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="36"
        y="72"
        width="24"
        height="8"
        rx="2"
        stroke={color}
        strokeWidth="3"
      />
      <line x1="42" y1="40" x2="42" y2="56" stroke={color} strokeWidth="2" />
      <line x1="48" y1="36" x2="48" y2="56" stroke={color} strokeWidth="2" />
      <line x1="54" y1="40" x2="54" y2="56" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function IconChart({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <line x1="16" y1="16" x2="16" y2="80" stroke={color} strokeWidth="3" />
      <line x1="16" y1="80" x2="80" y2="80" stroke={color} strokeWidth="3" />
      <rect x="24" y="52" width="14" height="28" fill={color} opacity="0.8" />
      <rect x="42" y="36" width="14" height="44" fill={color} opacity="0.8" />
      <rect x="60" y="20" width="14" height="60" fill={color} opacity="0.8" />
      <polyline
        points="24,56 42,40 60,48 76,28"
        stroke="#f4f3ee"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTooth({ color }: { color: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <path
        d="M30 16c-8 0-14 6-14 14 0 6 2 10 4 14l4 32c1 4 4 6 6 6s5-2 6-6l4-16 4 16c1 4 4 6 6 6s5-2 6-6l4-32c2-4 4-8 4-14 0-8-6-14-14-14-4 0-8 2-10 4-2-2-6-4-10-4z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectIcon({
  icon,
  color,
}: {
  icon: Project["icon"];
  color: string;
}) {
  switch (icon) {
    case "pill":
      return <IconPill color={color} />;
    case "cart":
      return <IconCart color={color} />;
    case "car":
      return <IconCar color={color} />;
    case "bulb":
      return <IconBulb color={color} />;
    case "chart":
      return <IconChart color={color} />;
    case "tooth":
      return <IconTooth color={color} />;
  }
}

// ─── Ticker ──────────────────────────────────────────────────────────────────

function Ticker({ dark = false }: { dark?: boolean }) {
  // Triple the items so the -33.333% loop is seamless
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      style={{
        background: dark ? "#0a0a0a" : "#fff",
        overflow: "hidden",
        borderTop: `1px solid ${dark ? "rgba(244,243,238,0.1)" : "#0a0a0a"}`,
        borderBottom: `1px solid ${dark ? "rgba(244,243,238,0.1)" : "#0a0a0a"}`,
        padding: "20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          animation: `sbTicker ${dark ? "70s" : "80s"} linear infinite`,
          animationDirection: dark ? "reverse" : "normal",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: dark ? "#f4f3ee" : "#0a0a0a",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              paddingRight: "32px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "rgba(10,10,10,0.3)", fontSize: "11px" }}>
              /{String((i % TICKER_ITEMS.length) + 1).padStart(3, "0")}
            </span>
            {item}
            <span style={{ color: "#ff5b1f", marginLeft: "2px" }}> ✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  dimmed,
  onEnter,
  onLeave,
}: {
  project: Project;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    onEnter();
  };
  const handleLeave = () => {
    setHovered(false);
    onLeave();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        border: `1px solid ${hovered ? "#ff5b1f" : "#0a0a0a"}`,
        minHeight: "360px",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s, opacity 0.2s",
        transform: hovered ? "translateY(-4px)" : "none",
        opacity: dimmed ? 0.45 : 1,
        background: "#f4f3ee",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Default visible content */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flexGrow: 1,
        }}
      >
        {/* Top row: number + year */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "13px",
              color: "#ff5b1f",
              fontWeight: 600,
            }}
          >
            {project.num}
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "rgba(10,10,10,0.4)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 0",
          }}
        >
          <ProjectIcon
            icon={project.icon}
            color={hovered ? "#ff5b1f" : "#0a0a0a"}
          />
        </div>

        {/* Name + category */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "28px",
              fontWeight: 900,
              color: "#0a0a0a",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "rgba(10,10,10,0.5)",
              margin: "8px 0 0",
              letterSpacing: "0.06em",
            }}
          >
            {project.category}
          </p>
        </div>
      </div>

      {/* Hover overlay slides up */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflow: "hidden",
        }}
      >
        {/* Summary */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            color: "rgba(244,243,238,0.8)",
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {project.summary}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
          }}
        >
          {project.stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#ff5b1f",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "9px",
                  color: "rgba(244,243,238,0.4)",
                  letterSpacing: "0.08em",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Meta rows */}
        {[
          { label: "SEKTÖR", value: project.sector },
          { label: "EKİP", value: project.team },
          { label: "STACK", value: project.stack },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(244,243,238,0.1)",
              paddingTop: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "rgba(244,243,238,0.4)",
                letterSpacing: "0.08em",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                color: "#f4f3ee",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}

        {/* CTA */}
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            color: "#ff5b1f",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          VAKAYI AÇ <span>↗</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BrutalistPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  // Custom cursor tracking
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const onLinkEnter = () => setCursorVariant("link");
  const onLinkLeave = () => setCursorVariant("default");

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        background: "#f4f3ee",
        color: "#0a0a0a",
        fontFamily: "var(--font-inter), sans-serif",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      {/* ── Custom Cursor (desktop only) ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: cursorVariant === "link" ? "32px" : "14px",
          height: cursorVariant === "link" ? "32px" : "14px",
          background: cursorVariant === "link" ? "#ff5b1f" : "#0a0a0a",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "width 0.15s, height 0.15s, background 0.15s",
        }}
      />

      {/* ── Vertical Grid Lines ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: "1px",
              height: "100%",
              background: "rgba(10,10,10,0.06)",
            }}
          />
        ))}
      </div>

      {/* ─── Mobile-responsive overrides ─────────────────────────────────── */}
      <style>{`
        /* Hero meta row: collapse to 3 cols on mobile */
        @media (max-width: 640px) {
          .bm-meta-row { grid-template-columns: repeat(3, 1fr) !important; }
          .bm-meta-row > div:nth-child(n+4) { border-top: 1px solid rgba(10,10,10,0.15) !important; }
        }
        /* Hero bottom grid: stack on mobile */
        @media (max-width: 640px) {
          .bm-hero-bottom { grid-template-columns: 1fr !important; }
          .bm-hero-bottom > div:first-child { border-right: none !important; border-bottom: 1px solid #0a0a0a; }
        }
        /* Projects grid: 1 col on mobile, 2 on tablet */
        @media (max-width: 480px)  { .bm-projects-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 481px) and (max-width: 900px) { .bm-projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        /* Approach grid: 2 cols on tablet, 1 on mobile */
        @media (max-width: 480px)  { .bm-approach-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 481px) and (max-width: 900px) { .bm-approach-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        /* Facts band: 2 cols on mobile */
        @media (max-width: 640px) { .bm-facts { grid-template-columns: repeat(2, 1fr) !important; } }
        /* Contact social grid: 2 cols on mobile */
        @media (max-width: 640px) { .bm-social-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        /* Section head: stack on mobile */
        @media (max-width: 640px) {
          .bm-section-head { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
        /* Manifesto grid: stack on mobile */
        @media (max-width: 768px) {
          .bm-manifesto-grid { grid-template-columns: 1fr !important; }
          .bm-manifesto-sig { text-align: left !important; }
        }
        /* Vertical writing-mode label: hide on very small screens */
        @media (max-width: 380px) { .bm-vertical-label { display: none !important; } }
        /* Footer marquee animation */
        @keyframes footerMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 24px 0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        {/* 6-column meta row */}
        <div
          className="bm-meta-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            borderBottom: "1px solid #0a0a0a",
            marginTop: "24px",
          }}
        >
          {[
            { label: "İNDEKS", value: "01" },
            { label: "STACK", value: "R/N/TS" },
            { label: "YER", value: "Antalya, TR" },
            { label: "YIL", value: "MMXXVI" },
            { label: "DURUM", value: "● MÜSAİT", accent: true },
            { label: "v", value: "04.RC1" },
          ].map((col) => (
            <div
              key={col.label}
              style={{
                borderTop: `3px solid ${col.accent ? "#ff5b1f" : "#0a0a0a"}`,
                padding: "12px 16px",
                borderRight: "1px solid rgba(10,10,10,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "9px",
                  color: "rgba(10,10,10,0.4)",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
              >
                {col.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: col.accent ? "#ff5b1f" : "#0a0a0a",
                }}
              >
                {col.value}
              </div>
            </div>
          ))}
        </div>

        {/* Massive hero name */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          {/* Line 1 */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
            {/* Vertical writing-mode label */}
            <div
              className="bm-vertical-label"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "0.15em",
                writingMode: "vertical-lr",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                marginBottom: "16px",
                flexShrink: 0,
              }}
            >
              (selam, ben)
            </div>

            <h1
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(80px, 16vw, 240px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                margin: 0,
                color: "#0a0a0a",
              }}
            >
              ONUR ATA
            </h1>
          </div>

          {/* Line 2 — right aligned */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
              gap: "24px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "clamp(10px, 1.2vw, 16px)",
                  color: "rgba(10,10,10,0.4)",
                  letterSpacing: "0.1em",
                }}
              >
                FRONTEND DEV. /EST.2019
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(80px, 16vw, 240px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#ff5b1f",
              }}
            >
              [ASAR]
            </span>
          </div>
        </div>

        {/* Bottom 2-col grid */}
        <div
          className="bm-hero-bottom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: "1px solid #0a0a0a",
            gap: "0",
          }}
        >
          {/* Left — summary */}
          <div
            style={{
              padding: "32px 24px 32px 0",
              borderRight: "1px solid #0a0a0a",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              ÖZET
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(15px, 1.5vw, 22px)",
                lineHeight: 1.5,
                color: "#0a0a0a",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Next.js, React ve TypeScript kullanarak ölçeklenebilir frontend
              mimarileri tasarlarım. 2019&apos;dan bu yana B2B platformlar,
              e-ticaret ve kurumsal projeler üzerine çalışıyorum.
            </p>
          </div>

          {/* Right — contact */}
          <div style={{ padding: "32px 0 32px 24px" }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              ERİŞİM
            </div>
            <a
              href="mailto:onurataasar@gmail.com"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(20px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#0a0a0a",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                lineHeight: 1.1,
                transition: "color 0.15s",
              }}
            >
              onurataasar@gmail.com
              <span style={{ color: "#ff5b1f" }}>↗</span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 0",
            borderTop: "1px solid rgba(10,10,10,0.15)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(10,10,10,0.15)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "rgba(10,10,10,0.4)",
            }}
          >
            SCROLL · KAYDIR
          </span>
          <span style={{ color: "rgba(10,10,10,0.4)", fontSize: "14px" }}>
            ↓
          </span>
        </div>
      </section>

      {/* ── Ticker (white) ────────────────────────────────────────────────── */}
      <Ticker dark={false} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MANIFESTO SECTION                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr 200px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Label col */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "0.1em",
                borderTop: "3px solid #0a0a0a",
                paddingTop: "12px",
              }}
            >
              01 / MANİFESTO
            </div>
          </div>

          {/* Quote */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                fontFamily:
                  "var(--font-newsreader), 'Newsreader', Georgia, serif",
                fontSize: "clamp(48px, 6vw, 96px)",
                color: "#ff5b1f",
                lineHeight: 0.8,
                display: "block",
                marginBottom: "-16px",
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(22px, 3.5vw, 64px)",
                fontWeight: 600,
                lineHeight: 1.15,
                margin: 0,
                color: "#0a0a0a",
                letterSpacing: "-0.02em",
              }}
            >
              Kod kalitesi, sürdürülebilir mimari ve uzun vadede kolay bakım
              yapılabilir projeler benim için her zaman{" "}
              <span style={{ color: "#ff5b1f" }}>öncelikli</span>.
            </p>
            <span
              style={{
                fontFamily:
                  "var(--font-newsreader), 'Newsreader', Georgia, serif",
                fontSize: "clamp(48px, 6vw, 96px)",
                color: "#ff5b1f",
                lineHeight: 0.8,
                display: "block",
                textAlign: "right",
                marginTop: "-8px",
              }}
            >
              &rdquo;
            </span>
          </div>

          {/* Signature */}
          <div
            style={{
              textAlign: "right",
              borderTop: "3px solid #0a0a0a",
              paddingTop: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "16px",
                fontWeight: 600,
                color: "#0a0a0a",
                letterSpacing: "0.05em",
              }}
            >
              O.A. ASAR
            </div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "0.1em",
                marginTop: "6px",
              }}
            >
              2026 / ANTALYA
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PROJECTS SECTION                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "end",
            padding: "40px 24px 24px",
            borderBottom: "1px solid #0a0a0a",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "#ff5b1f",
              letterSpacing: "0.1em",
              paddingBottom: "8px",
            }}
          >
            02 / SEÇİLMİŞ ÇALIŞMALAR
          </span>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: 0,
              color: "#0a0a0a",
            }}
          >
            İNDEX .
          </h2>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "rgba(10,10,10,0.4)",
              letterSpacing: "0.08em",
              paddingBottom: "8px",
              textAlign: "right",
            }}
          >
            06 PROJE · 2022—2024
          </span>
        </div>

        {/* Cards grid */}
        <div
          className="bm-projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "none",
          }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.num}
              style={{
                borderRight: "1px solid #0a0a0a",
                borderBottom: "1px solid #0a0a0a",
              }}
            >
              <ProjectCard
                project={project}
                dimmed={hoveredProject !== null && hoveredProject !== i}
                onEnter={() => {
                  setHoveredProject(i);
                  onLinkEnter();
                }}
                onLeave={() => {
                  setHoveredProject(null);
                  onLinkLeave();
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark Reverse Ticker ───────────────────────────────────────────── */}
      <Ticker dark={true} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* APPROACH SECTION                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "48px",
            borderBottom: "1px solid rgba(10,10,10,0.1)",
            paddingBottom: "24px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "#ff5b1f",
              letterSpacing: "0.1em",
            }}
          >
            03 / NASIL ÇALIŞIRIM
          </span>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              margin: "12px 0 0",
              color: "#0a0a0a",
            }}
          >
            YAKLAŞIM .
          </h2>
        </div>

        {/* 4-column cards */}
        <div
          className="bm-approach-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "#0a0a0a",
            border: "1px solid #0a0a0a",
          }}
        >
          {[
            {
              letter: "A",
              title: "COMPONENT İLK",
              desc: "Önce küçük, izole, test edilebilir component'ler inşa ederim. Bileşen hiyerarşisi ve tek sorumluluk prensibi tüm mimarinin temelini oluşturur.",
            },
            {
              letter: "B",
              title: "TİP HER ZAMAN",
              desc: "TypeScript sadece bir araç değil, stratejik bir yatırımdır. Güçlü tip sistemi, ekip büyüdükçe kod kalitesini ve geliştirici deneyimini korur.",
            },
            {
              letter: "C",
              title: "PERFORMANS HEDEF",
              desc: "LCP, CLS, INP metriklerini her projede ölçerim. Core Web Vitals skoru 90+ olmayan bir projeyi tamamlanmış saymam.",
            },
            {
              letter: "D",
              title: "SÜRDÜRÜLEBİLİR",
              desc: "6 ay sonra geri döndüğümde kodu anlayabilmek için yazan kişi. İsimlendirme, dokümantasyon ve klasör yapısı tutarlılığı vazgeçilmezim.",
            },
          ].map((card) => (
            <div
              key={card.letter}
              style={{
                background: "#f4f3ee",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ff5b1f",
                  letterSpacing: "0.1em",
                }}
              >
                {card.letter}.
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "28px",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: "#0a0a0a",
                  lineHeight: 1,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(10,10,10,0.7)",
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FACTS BAND                                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#0a0a0a",
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid rgba(244,243,238,0.1)",
        }}
      >
        <div
          className="bm-facts"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {[
            { num: "05+", label: "YIL" },
            { num: "20+", label: "PROJE" },
            { num: "06", label: "STACK" },
            { num: "∞", label: "MERAK" },
          ].map((fact, i) => (
            <div
              key={fact.label}
              style={{
                padding: "48px 24px",
                borderRight:
                  i < 3 ? "1px solid rgba(244,243,238,0.08)" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(56px, 10vw, 144px)",
                  fontWeight: 900,
                  color: "#f4f3ee",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {fact.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  color: "#ff5b1f",
                  letterSpacing: "0.15em",
                }}
              >
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CONTACT SECTION                                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        {/* Big 3-line text */}
        <div style={{ marginBottom: "64px" }}>
          <div
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              fontSize: "clamp(60px, 18vw, 280px)",
            }}
          >
            <div style={{ textAlign: "left", color: "#0a0a0a" }}>BİR</div>
            <div style={{ textAlign: "center", color: "#ff5b1f" }}>
              FİKRİN Mİ
            </div>
            <div style={{ textAlign: "right", color: "#0a0a0a" }}>VAR?</div>
          </div>
        </div>

        {/* Email pill CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <a
            href="mailto:onurataasar@gmail.com"
            onMouseEnter={onLinkEnter}
            onMouseLeave={onLinkLeave}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              background: "#0a0a0a",
              color: "#f4f3ee",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(16px, 4vw, 40px)",
              fontWeight: 700,
              padding: "20px 48px",
              borderRadius: "9999px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            onurataasar@gmail.com
            <span style={{ color: "#ff5b1f" }}>↗</span>
          </a>
          <a
            href="/iletisim"
            onMouseEnter={onLinkEnter}
            onMouseLeave={onLinkLeave}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "transparent",
              color: "#0a0a0a",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "clamp(12px, 1.5vw, 16px)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              padding: "20px 32px",
              border: "1px solid #0a0a0a",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            İLETİŞİM FORMU ↗
          </a>
        </div>

        {/* 4-cell social grid */}
        <div
          className="bm-social-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid #0a0a0a",
          }}
        >
          {[
            { label: "GitHub", href: "https://github.com/onurataasar" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/onur-ata-asar/",
            },
            { label: "Medium", href: "https://medium.com/@onurataasar" },
            { label: "CV", href: "/cv" },
          ].map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("/") ? undefined : "_blank"}
              rel={
                social.href.startsWith("/") ? undefined : "noopener noreferrer"
              }
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px",
                borderRight: i < 3 ? "1px solid #0a0a0a" : "none",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#0a0a0a";
                const spans = (
                  e.currentTarget as HTMLAnchorElement
                ).querySelectorAll("span");
                spans.forEach((s) => {
                  (s as HTMLElement).style.color = "#f4f3ee";
                });
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                const spans = (
                  e.currentTarget as HTMLAnchorElement
                ).querySelectorAll("span");
                spans.forEach((s) => {
                  (s as HTMLElement).style.color = "#0a0a0a";
                });
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 700,
                  color: "#0a0a0a",
                  transition: "color 0.15s",
                }}
              >
                {social.label}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  color: "#ff5b1f",
                  transition: "color 0.15s",
                }}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        {/* Giant name — looping marquee */}
        <div
          style={{
            overflow: "hidden",
            padding: "40px 0 0",
            borderTop: "1px solid rgba(10,10,10,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: "footerMarquee 40s linear infinite",
              width: "max-content",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(80px, 18vw, 280px)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                  color: i % 2 === 0 ? "#0a0a0a" : "transparent",
                  WebkitTextStroke: i % 2 !== 0 ? "2px #0a0a0a" : "none",
                  paddingRight: "0.3em",
                }}
              >
                ONUR ATA ASAR ✱
              </span>
            ))}
          </div>
        </div>

        {/* Dark footer bar */}
        <div
          style={{
            background: "#0a0a0a",
            padding: "20px 24px",
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "rgba(244,243,238,0.5)",
              letterSpacing: "0.06em",
            }}
          >
            © ONUR ATA ASAR · MMXXVI
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "rgba(244,243,238,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            SET IN INTER &amp; JETBRAINS MONO
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "rgba(244,243,238,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            BUILT WITH REACT · NEXT · TS
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "rgba(244,243,238,0.5)",
              letterSpacing: "0.06em",
            }}
          >
            ANTALYA / TR / UTC+3
          </span>
        </div>
      </footer>
    </div>
  );
}
