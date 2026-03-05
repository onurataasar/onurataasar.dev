import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Onur Ata Asar",
  description:
    "Production applications built by Onur Ata Asar as a frontend developer.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
