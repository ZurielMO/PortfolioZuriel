import type { Metadata } from "next";

import { AboutPage } from "@/components/portfolio/about-page";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Sobre ${siteConfig.name}`,
};

export default function AboutRoute() {
  return <AboutPage />;
}
