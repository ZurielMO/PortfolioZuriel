import type { Metadata } from "next";

import { ContactSection } from "@/components/portfolio/contact-section";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta para proyectos o colaboraciones.",
};

export default function ContactPage() {
  return <ContactSection />;
}
