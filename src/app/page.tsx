"use client";

import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from "@/components/home";
import Footer from "@/components/Footer";
import { SectionStepper } from "@/components/SectionStepper";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
      <SectionStepper />
    </>
  );
}
