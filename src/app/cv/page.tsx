import {
  FadeIn,
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import {
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlineDownload,
} from "react-icons/hi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV - Onur Ata Asar",
  description:
    "Frontend Web Developer - Computer Science Engineer. Experience, education, and background.",
};

const experiences = [
  {
    role: "Frontend Developer",
    company: "Ledbim",
    period: "12/2022 – Present",
    location: "Antalya, Türkiye",
    bullets: [
      "Designed and implemented scalable, reusable React component libraries leveraged across multiple internal tools and customer-facing applications.",
      "Built, optimized, and maintained SSR pages using Next.js, significantly improving SEO, accessibility, and initial page load performance.",
      "Integrated and managed complex RESTful API responses, handling data normalization, error states, and frontend state management.",
      "Worked closely with backend engineers and designers throughout Agile sprints to deliver features efficiently and with high quality.",
      "Applied frontend performance optimization techniques including code splitting, memoization strategies, and optimized image loading.",
      "Led and contributed to frontend code reviews, mentoring team members and helping establish best practices and consistent coding standards.",
      "Implemented and maintained automated testing strategies using Playwright and Jest to ensure application reliability and prevent regressions.",
      "Collaborated on DevOps workflows by contributing to CI/CD pipelines in Azure DevOps, supporting build, test, and deployment processes.",
    ],
  },
  {
    role: "Intern",
    company: "Ledbim",
    period: "08/2022 – 11/2022",
    location: "Antalya, Türkiye",
    bullets: [
      'Designed and implemented a production ready web application "Beagle" for tracking service cars in hotels.',
      "Integrated REST APIs using Axios and managed global state with Redux.",
      "Gained hands-on experience with component architecture, routing, and reusable hooks.",
      "Worked with UI libraries such as Ant Design and Material UI.",
    ],
  },
];

const education = {
  institution: "Akdeniz Üniversitesi",
  degree: "Computer Science Engineering (English)",
  period: "09/2016 – 06/2022",
  location: "Antalya, Turkey",
};

const languages = [
  { name: "English", level: "B2 – Upper Intermediate" },
  { name: "German", level: "A1 – Beginner" },
  { name: "Turkish", level: "Native" },
];

export default function CVPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <PageTransition className="space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <FadeIn>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-[var(--font-size-h1)] font-bold">
                <span className="gradient-text">CV</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mt-1">
                Frontend Web Developer — Computer Science Engineer
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <a
              href="/Onur-Ata-Asar-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity shrink-0"
            >
              <HiOutlineDownload size={18} />
              Download PDF
            </a>
          </FadeIn>
        </div>

        {/* Work Experience — Timeline */}
        <section className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]" />
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold flex items-center gap-3 mb-8">
                <span className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <HiOutlineBriefcase size={22} />
                </span>
                Work Experience
              </h2>
            </FadeIn>

            <StaggerContainer className="space-y-8" delay={0.3} staggerDelay={0.15}>
              {experiences.map((exp) => (
                <StaggerItem key={exp.period}>
                  <article className="relative pl-12 group">
                    <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-bg)]" />
                    <div className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/50 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)]">
                            {exp.role}
                          </h3>
                          <p className="text-[var(--color-accent)] font-medium mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-sm text-[var(--color-text-muted)] sm:text-right mt-1 sm:mt-0">
                          <p>{exp.period}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>

                      <ul className="space-y-2 text-[var(--color-text-muted)] mt-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-[var(--color-accent)] mt-1.5 shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <FadeIn delay={0.2}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <HiOutlineAcademicCap size={22} />
              </span>
              Education
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <article className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">
                    {education.institution}
                  </h3>
                  <p className="text-[var(--color-accent)] font-medium mt-0.5">
                    {education.degree}
                  </p>
                </div>
                <div className="text-sm text-[var(--color-text-muted)] sm:text-right mt-1 sm:mt-0">
                  <p>{education.period}</p>
                  <p>{education.location}</p>
                </div>
              </div>
            </article>
          </FadeIn>
        </section>

        {/* Languages */}
        <section className="space-y-4">
          <FadeIn delay={0.2}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <HiOutlineGlobeAlt size={22} />
              </span>
              Languages
            </h2>
          </FadeIn>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            delay={0.3}
            staggerDelay={0.1}
          >
            {languages.map((lang) => (
              <StaggerItem key={lang.name}>
                <div className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)]/50 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                  <p className="font-semibold font-[family-name:var(--font-display)]">
                    {lang.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {lang.level}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </PageTransition>
    </div>
  );
}
