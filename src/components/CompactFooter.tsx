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

export default function CompactFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[var(--color-text-muted)] text-sm">
            <span className="font-semibold text-[var(--color-text)]">
              Onur Ata Asar
            </span>{" "}
            © {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
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
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
