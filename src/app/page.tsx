import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ScrollWords } from "@/components/portfolio/scroll-words";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { featuredProjects } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={featuredProjects} />
      <ScrollWords />
      <ContactSection />
    </>
  );
}
