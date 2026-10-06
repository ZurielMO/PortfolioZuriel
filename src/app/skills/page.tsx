import type { Metadata } from "next";

import { SkillsSection } from "@/components/portfolio/skills-section";

export const metadata: Metadata = {
  title: "Skills",
  description: "Stack y tecnologías que utilizo.",
};

export default function SkillsPage() {
  return <SkillsSection showViewAll={false} />;
}
