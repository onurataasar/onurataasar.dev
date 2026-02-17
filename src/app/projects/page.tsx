import {
  FadeIn,
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { HiOutlineCode } from "react-icons/hi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Onur Ata Asar",
  description:
    "Production applications built by Onur Ata Asar as a frontend developer.",
};

const projects = [
  {
    title: "Ördek B2B",
    subtitle: "VIP Vehicle Transfer Platform",
    description: "Admin Panel & Web Application",
    tech: ["React", "Next.js", "TypeScript"],
    bullets: [
      "Took ownership of frontend development from initial setup to production deployment.",
      "Collaborated with backend developers to define API contracts and data models.",
      "Ensured maintainable code structure by following best practices and frontend architecture patterns.",
    ],
  },
  {
    title: "Lokman E-Commerce",
    subtitle: "B2B Platform for Pharmacies",
    description: "Web Application",
    tech: ["React", "Next.js", "TypeScript"],
    bullets: [
      "Collaborated with backend teams to align frontend requirements with business rules specific to pharmacy workflows.",
      "Handled edge cases such as stock changes, pricing updates, and order validation on the frontend layer.",
    ],
  },
  {
    title: "Farmaborsa",
    subtitle: "B2B E-Commerce Marketplace for Pharmacies",
    description: "Frontend Application",
    tech: ["Next.js", "TypeScript"],
    bullets: [
      "Developed the entire frontend of a B2B e-commerce platform where pharmacies compete by offering the same products at different prices.",
      "Built dynamic product listing and comparison screens allowing users to evaluate multiple offers for a single product.",
      "Implemented price-driven UI flows reflecting a competitive, marketplace-like structure rather than a fixed-price catalog.",
      "Integrated REST APIs and handled complex state related to pricing, offers, and product availability.",
      "Focused on performance, maintainability, and scalable frontend architecture using Next.js and TypeScript.",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <PageTransition className="space-y-8 py-8">
      <FadeIn>
        <h1 className="text-4xl font-bold">
          <span className="gradient-text">Projects</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Production applications I&apos;ve built and contributed to as a
          frontend developer.
        </p>
      </FadeIn>

      <StaggerContainer className="grid gap-6" delay={0.2} staggerDelay={0.15}>
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <article className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-6 hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5">
                  <HiOutlineCode size={20} />
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {project.subtitle} — {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-violet-400 mt-1.5 shrink-0">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageTransition>
  );
}
