"use client";

import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from "@/components/home";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
    </>
  );
}
