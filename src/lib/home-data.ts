import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const socials = [
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

export const skillCategories = [
  {
    label: "Frontend",
    description: "Bileşen tabanlı UI, hooks ve modern web standartları.",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS"],
  },
  {
    label: "State & Data",
    description: "Global state, sunucu verisi ve API entegrasyonu.",
    skills: [
      "Redux Toolkit",
      "Context API",
      "React Query",
      "Axios",
      "REST APIs",
    ],
  },
  {
    label: "Styling",
    description: "Utility-first CSS, animasyon ve component kütüphaneleri.",
    skills: [
      "Tailwind CSS",
      "Styled Components",
      "Sass",
      "Framer Motion",
      "Material UI",
    ],
  },
  {
    label: "Testing & DevOps",
    description: "E2E test, CI/CD ve hata takibi.",
    skills: ["Playwright", "Jest", "Azure Pipelines", "Sentry", "Vercel"],
  },
  {
    label: "Tools",
    description: "Versiyon kontrolü, linting ve tasarım araçları.",
    skills: ["Git", "GitHub", "ESLint", "Prettier", "Figma"],
  },
];

export const aboutText = `Deneyimli bir Frontend Developer olarak ağırlıklı olarak React, Next.js ve TypeScript ile çalışıyorum. Production ortamında kullanılan web uygulamalarını geliştirme ve sürdürme konusunda deneyimliyim. Ölçeklenebilir component yapıları kurmaya, karmaşık API entegrasyonlarını yönetmeye ve performanslı kullanıcı deneyimleri sunmaya odaklanıyorum. \n\nFrontend tarafındaki özelliklerin geliştirilmesinde sorumluluk almayı seviyorum ve Agile çalışma ortamlarında backend ve tasarım ekipleriyle yakın iş birliği içinde çalışıyorum. Kod kalitesi, sürdürülebilir mimari ve uzun vadede kolay bakım yapılabilir projeler oluşturmak benim için her zaman öncelikli..`;
