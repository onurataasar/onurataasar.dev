"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/blog", label: "Blog", num: "01" },
  { href: "/projects", label: "Çalışmalar", num: "02" },
  { href: "/notes", label: "Notlar", num: "03" },
  { href: "/cv", label: "CV", num: "04" },
  { href: "/iletisim", label: "İletişim", num: "05" },
];

/** Format current Antalya local time as HH:MM:SS */
function useAntalyaTime(): string {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("tr-TR", {
      timeZone: "Europe/Istanbul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Navigation() {
  const pathname = usePathname();
  const time = useAntalyaTime();
  const [isOpen, setIsOpen] = useState(false);
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#f4f3ee",
          borderBottom: "1px solid #0a0a0a",
        }}
      >
        {/* Top info bar */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f3ee",
            fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.08em",
            padding: "6px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>ASAR/PORTFOLIO/MMXXVI</span>
          <span style={{ opacity: 0.5 }}>v.04 — REDESIGN — RC.1</span>
          <span className="hidden md:block">ANTALYA · 36.8969°N · 30.7133°E</span>
          <span>
            <span style={{ color: "#ff5b1f" }}>● </span>
            MÜSAİT · UTC+3 · {time}
          </span>
        </div>

        {/* Main nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: "64px",
          }}
        >
          {/* Logo mark */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#0a0a0a",
                  letterSpacing: "-0.02em",
                }}
              >
                OAA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "9px",
                  color: "#0a0a0a",
                  opacity: 0.5,
                  letterSpacing: "0.1em",
                }}
              >
                WEB DEVELOPER /2026
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex" style={{ gap: "0" }}>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={`${link.num}-${link.href}`}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    padding: "8px 16px",
                    textDecoration: "none",
                    borderLeft: "1px solid rgba(10,10,10,0.1)",
                    transition: "background 0.15s",
                    background: isActive ? "#0a0a0a" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(10,10,10,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "9px",
                      color: isActive ? "#ff5b1f" : "rgba(10,10,10,0.4)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {link.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isActive ? "#f4f3ee" : "#0a0a0a",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#0a0a0a",
                transition: "transform 0.2s",
                transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#0a0a0a",
                opacity: isOpen ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#0a0a0a",
                transition: "transform 0.2s",
                transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Menüyü kapat"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f4f3ee",
              fontSize: "32px",
              lineHeight: 1,
            }}
          >
            ×
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%", maxWidth: "320px" }}>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={`mob-${link.num}`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                    padding: "16px 24px",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(244,243,238,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "11px",
                      color: "#ff5b1f",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {link.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "32px",
                      fontWeight: 900,
                      color: isActive ? "#ff5b1f" : "#f4f3ee",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
