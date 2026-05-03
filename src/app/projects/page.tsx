import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div
      style={{
        background: "#f4f3ee",
        minHeight: "100vh",
        padding: "64px 32px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          borderBottom: "1px solid #0a0a0a",
          paddingBottom: 16,
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#ff5b1f",
          }}
        >
          04 / PROJELER
        </span>
        <h1
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "#0a0a0a",
          }}
        >
          ÇALIŞMALAR .
        </h1>
      </div>

      {/* 2-column project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
          gap: "1px",
          background: "#0a0a0a",
          border: "1px solid #0a0a0a",
        }}
      >
        {projects.map((project, index) => (
          <article
            key={project.title}
            style={{
              background: "#f4f3ee",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
                color: "#ff5b1f",
                letterSpacing: "0.08em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Project name */}
            <h2
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#0a0a0a",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h2>

            {/* Subtitle + description */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0a0a0a",
                  margin: "0 0 4px 0",
                }}
              >
                {project.subtitle}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 13,
                  color: "rgba(10,10,10,0.5)",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Tech stack tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "#0a0a0a",
                    border: "1px solid #0a0a0a",
                    padding: "4px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bullets */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {project.bullets.map((bullet, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 13,
                    color: "rgba(10,10,10,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "#ff5b1f", flexShrink: 0 }}>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#ff5b1f",
                }}
              >
                DETAYLAR ↗
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
