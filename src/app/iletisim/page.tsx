import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "İletişim — Onur Ata Asar",
  description: "Bir projen mi var? Konuşalım.",
};

const channels = [
  { num: "01", label: "GITHUB",   value: "@onurataasar",       href: "https://github.com/onurataasar" },
  { num: "02", label: "LINKEDIN", value: "onur-ata-asar",      href: "https://www.linkedin.com/in/onur-ata-asar/" },
  { num: "03", label: "MEDIUM",   value: "@onurataasar",       href: "https://medium.com/@onurataasar" },
  { num: "04", label: "CV",       value: "cv-2026.pdf",        href: "/cv" },
];

export default function IletisimPage() {
  return (
    <div style={{ background: "#f4f3ee", minHeight: "100vh", padding: "64px 32px" }}>
      <style>{`
        .ch-row { transition: background 0.15s; }
        .ch-row:hover { background: #ede9df; }
        .ch-row:hover .ch-value { color: #ff5b1f !important; }
        .ch-row:hover .ch-arrow { color: #ff5b1f !important; }
        input::placeholder, textarea::placeholder { color: rgba(10,10,10,0.25); }
      `}</style>

      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        borderBottom: "1px solid #0a0a0a", paddingBottom: 16, marginBottom: 80,
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.1em", color: "#ff5b1f",
        }}>05 / İLETİŞİM</span>
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900,
          letterSpacing: "-0.03em", margin: 0, color: "#0a0a0a",
        }}>KONUŞALIM .</h1>
      </div>

      {/* Two-column layout: form left, channels right */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: 80,
        alignItems: "start",
      }}>
        {/* LEFT — Contact form */}
        <div>
          <div style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.1em",
            color: "rgba(10,10,10,0.4)", marginBottom: 32,
          }}>
            — MESAJ GÖNDER
          </div>
          <ContactForm />
        </div>

        {/* RIGHT — Channels */}
        <div>
          <div style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.1em",
            color: "rgba(10,10,10,0.4)", marginBottom: 32,
          }}>
            — VEYA ULAŞ
          </div>

          <div style={{ borderTop: "1px solid rgba(10,10,10,0.15)" }}>
            {channels.map((ch) => (
              <a
                key={ch.num}
                href={ch.href}
                target={ch.href.startsWith("/") ? undefined : "_blank"}
                rel={ch.href.startsWith("/") ? undefined : "noopener noreferrer"}
                className="ch-row"
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "20px 8px",
                  borderBottom: "1px solid rgba(10,10,10,0.15)",
                  textDecoration: "none",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10, color: "#ff5b1f", letterSpacing: "0.08em",
                  minWidth: 24, flexShrink: 0,
                }}>{ch.num}</span>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10, letterSpacing: "0.08em",
                  color: "rgba(10,10,10,0.4)", minWidth: 72, flexShrink: 0,
                }}>{ch.label}</span>
                <span className="ch-value" style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14, fontWeight: 700, color: "#0a0a0a",
                  letterSpacing: "-0.01em", flex: 1, transition: "color 0.15s",
                }}>{ch.value}</span>
                <span className="ch-arrow" style={{
                  fontSize: 14, color: "rgba(10,10,10,0.25)",
                  transition: "color 0.15s", flexShrink: 0,
                }}>↗</span>
              </a>
            ))}
          </div>

          {/* Availability note */}
          <div style={{
            marginTop: 40,
            padding: "20px",
            border: "1px solid rgba(10,10,10,0.15)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
            }}>
              <span style={{ color: "#ff5b1f", fontSize: 10 }}>●</span>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 10, letterSpacing: "0.1em", color: "#0a0a0a",
              }}>MÜSAİT</span>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 13, color: "rgba(10,10,10,0.55)",
              lineHeight: 1.6, margin: 0,
            }}>
              Freelance ve full-time fırsatlara açığım. Antalya / Remote.
              Genellikle 24 saat içinde dönüş yaparım.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
