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
    <PageTransition className="space-y-10 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <FadeIn>
          <div>
            <h1 className="text-4xl font-bold">
              <span className="gradient-text">CV</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1">
              Frontend Web Developer — Computer Science Engineer
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <a
            href="/Onur-Ata-Asar-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg gradient-bg text-white hover:opacity-90 transition-opacity shrink-0"
          >
            <HiOutlineDownload size={18} />
            Download PDF
          </a>
        </FadeIn>
      </div>

      {/* Work Experience */}
      <section className="space-y-4">
        <FadeIn delay={0.2}>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400">
              <HiOutlineBriefcase size={20} />
            </span>
            Work Experience
          </h2>
        </FadeIn>

        <StaggerContainer className="space-y-4" delay={0.3} staggerDelay={0.15}>
          {experiences.map((exp) => (
            <StaggerItem key={exp.period}>
              <article className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-6 hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-violet-500 dark:text-violet-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-right">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-violet-400 mt-1.5 shrink-0">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <FadeIn delay={0.2}>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400">
              <HiOutlineAcademicCap size={20} />
            </span>
            Education
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <article className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-6 hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h3 className="text-lg font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {education.institution}
                </h3>
                <p className="text-sm text-violet-500 dark:text-violet-400 font-medium">
                  {education.degree}
                </p>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-right">
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
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400">
              <HiOutlineGlobeAlt size={20} />
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
              <div className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-4 hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 text-center">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {lang.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {lang.level}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </PageTransition>
  );
}
