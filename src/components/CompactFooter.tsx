const socials = [
  { href: "https://github.com/onurataasar", label: "GitHub" },
  { href: "https://www.linkedin.com/in/onur-ata-asar/", label: "LinkedIn" },
  { href: "https://medium.com/@onurataasar", label: "Medium" },
  { href: "mailto:onurataasar@gmail.com", label: "E-Posta" },
];

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projeler" },
  { href: "/notes", label: "Notlar" },
  { href: "/cv", label: "CV" },
];

export default function CompactFooter() {
  return (
    <footer style={{
      background: "#0a0a0a",
      color: "#f4f3ee",
      borderTop: "1px solid rgba(244,243,238,0.1)",
    }}>
      {/* Main footer row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "24px 32px",
        gap: 32,
        borderBottom: "1px solid rgba(244,243,238,0.08)",
      }}>
        {/* Left — logo */}
        <div>
          <div style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 18, fontWeight: 900,
            letterSpacing: "-0.02em", color: "#f4f3ee",
          }}>OAA</div>
          <div style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 9, letterSpacing: "0.1em",
            color: "rgba(244,243,238,0.4)", marginTop: 2,
          }}>FRONTEND DEVELOPER · 2026</div>
        </div>

        {/* Center — nav links */}
        <nav style={{ display: "flex", gap: 0 }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, letterSpacing: "0.06em",
                color: "rgba(244,243,238,0.6)",
                textDecoration: "none",
                padding: "6px 14px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(244,243,238,0.1)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ff5b1f"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(244,243,238,0.6)"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — socials */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 0 }}>
          {socials.map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, letterSpacing: "0.06em",
                color: "rgba(244,243,238,0.6)",
                textDecoration: "none",
                padding: "6px 14px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(244,243,238,0.1)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ff5b1f"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(244,243,238,0.6)"; }}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 32px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 10, letterSpacing: "0.08em",
        color: "rgba(244,243,238,0.3)",
      }}>
        <span>© ONUR ATA ASAR · MMXXVI</span>
        <span>ANTALYA / TR / UTC+3</span>
      </div>
    </footer>
  );
}
