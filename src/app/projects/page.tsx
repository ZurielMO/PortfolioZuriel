import type { Metadata } from "next";

import { ProjectsSection } from "@/components/portfolio/projects-section";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Todos los proyectos del portafolio.",
};

export default function ProjectsPage() {
  return (
    <ProjectsSection projects={projects} showViewAll={false} />
  );
}
