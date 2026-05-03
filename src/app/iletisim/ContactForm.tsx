"use client";

import { useState } from "react";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<Field | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    setStatus("sending");

    // Build a mailto link as a reliable fallback — opens mail client with prefilled content.
    const subject = encodeURIComponent(`onurataasar.dev — ${values.name}`);
    const body = encodeURIComponent(
      `İsim: ${values.name}\nE-posta: ${values.email}\n\n${values.message}`
    );
    const mailtoHref = `mailto:onurataasar@gmail.com?subject=${subject}&body=${body}`;

    // Attempt to open mail client
    try {
      window.location.href = mailtoHref;
      // Brief delay so the browser can launch the client, then show success
      await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const fieldStyle = (field: Field): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${focused === field ? "#ff5b1f" : "#0a0a0a"}`,
    outline: "none",
    padding: "16px 0",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: 500,
    color: "#0a0a0a",
    transition: "border-color 0.2s",
    resize: "none",
    display: "block",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono), monospace",
    fontSize: 11,
    letterSpacing: "0.12em",
    color: "#ff5b1f",
    display: "block",
    marginBottom: 4,
  };

  if (status === "sent") {
    return (
      <div style={{
        padding: "64px 0",
        borderTop: "1px solid #0a0a0a",
      }}>
        <div style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(32px, 5vw, 72px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#0a0a0a",
          marginBottom: 24,
        }}>
          TEŞEKKÜRLER<span style={{ color: "#ff5b1f" }}>.</span>
        </div>
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: 16,
          color: "rgba(10,10,10,0.55)",
          lineHeight: 1.6,
          marginBottom: 32,
        }}>
          Mail uygulamanız açıldı. Göndermeden önce kontrol edebilirsiniz.
        </p>
        <button
          onClick={() => { setStatus("idle"); setValues({ name: "", email: "", message: "" }); }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "#ff5b1f",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          ← YENİ MESAJ
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        paddingTop: 48,
        borderTop: "1px solid #0a0a0a",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
        {/* Name */}
        <div style={{ marginBottom: 40 }}>
          <label htmlFor="name" style={labelStyle}>İSİM</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Adın Soyadın"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={{ ...fieldStyle("name"), "::placeholder": { color: "rgba(10,10,10,0.25)" } } as React.CSSProperties}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 40 }}>
          <label htmlFor="email" style={labelStyle}>E-POSTA</label>
          <input
            id="email"
            type="email"
            required
            placeholder="mail@domain.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={fieldStyle("email")}
          />
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 56 }}>
        <label htmlFor="message" style={labelStyle}>MESAJ</label>
        <textarea
          id="message"
          required
          rows={6}
          placeholder="Projen, fikrin ya da sadece merhaba..."
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          style={fieldStyle("message")}
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.04em",
            color: "#f4f3ee",
            background: status === "sending" ? "rgba(10,10,10,0.5)" : "#0a0a0a",
            border: "1px solid #0a0a0a",
            padding: "16px 40px",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {status === "sending" ? "GÖNDERİLİYOR…" : "GÖNDER ↗"}
        </button>

        {status === "error" && (
          <span style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            color: "#ff5b1f",
            letterSpacing: "0.06em",
          }}>
            Bir hata oluştu. Direkt mail gönderebilirsin.
          </span>
        )}

        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10,
          color: "rgba(10,10,10,0.35)",
          letterSpacing: "0.06em",
          marginLeft: "auto",
        }}>
          onurataasar@gmail.com
        </span>
      </div>
    </form>
  );
}
