"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { Section } from "@/components/Section";
import { ScrollReveal } from "@/components/motion";
import { Form, Input, Textarea } from "@/components/ui";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socials = [
  { href: "https://github.com/onurataasar", icon: FaGithub, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/onur-ata-asar/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://medium.com/@onurataasar",
    icon: FaMedium,
    label: "Medium",
  },
  {
    href: "mailto:onurataasar@gmail.com",
    icon: HiOutlineMail,
    label: "Email",
  },
];

export default function Footer() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Adınızı girin";
    if (!email) newErrors.email = "E-posta adresinizi girin";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }
    if (!message) newErrors.message = "Mesajınızı yazın";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("submitting");

    // TODO: Formspree, Getform veya server action ile backend entegrasyonu
    // Şimdilik simüle edilmiş başarı
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    form.reset();
  };

  return (
    <Section id="contact" colorToken="contact" grid>
      <div className="col-span-12 max-w-[1400px] mx-auto space-y-12">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-4">
              İletişim
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
              Bir sorun mu var? Ya da sadece{" "}
              <span className="text-[var(--color-highlight)]">merhaba</span>{" "}
              demek ister misin?
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-16 items-stretch w-full">
          <ScrollReveal delay={0.1} className="flex flex-col w-full">
            <div className="rounded-2xl border border-current/15 bg-white/5 backdrop-blur-sm p-6 lg:p-10 flex-1 flex flex-col">
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Ad"
                    name="name"
                    type="text"
                    placeholder="Adınız"
                    error={errors.name}
                    required
                    disabled={status === "submitting"}
                  />
                  <Input
                    label="E-posta"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    error={errors.email}
                    required
                    disabled={status === "submitting"}
                  />
                </div>
                <Textarea
                  label="Mesaj"
                  name="message"
                  placeholder="Merhaba, projem hakkında konuşmak istiyorum..."
                  rows={6}
                  maxLength={1000}
                  error={errors.message}
                  required
                  disabled={status === "submitting"}
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <MagneticButton
                    as="button"
                    type="submit"
                    strength={0.2}
                    disabled={status === "submitting"}
                    className="px-6 py-3 rounded-xl font-semibold bg-current/20 hover:bg-current/30 border border-current/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Gönderiliyor..." : "Gönder"}
                  </MagneticButton>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-medium opacity-90"
                    >
                      Mesajınız alındı, en kısa sürede dönüş yapacağım.
                    </motion.p>
                  )}
                </div>
              </Form>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={0.15}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="flex lg:flex-col gap-6 lg:gap-8">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith("mailto") ? undefined : "_blank"
                  }
                  rel={
                    social.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex items-center gap-4 text-xl lg:text-2xl font-medium hover:opacity-80 transition-opacity py-2 max-lg:justify-center"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={social.label}
                >
                  <social.icon size={64} className="shrink-0" />
                  <span className="text-2xl lg:text-3xl font-medium hidden lg:block">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <hr className="border-current/20" />
      </div>
    </Section>
  );
}
