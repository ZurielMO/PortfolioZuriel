import type { Locale } from "@/lib/locale";

export type Localized = Record<Locale, string>;

export type Project = {
  id: string;
  title: Localized;
  description: Localized;
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  caseStudySlug?: string;
  featured?: boolean;
};

/**
 * Edita este archivo para agregar tus proyectos reales.
 * Deja `demoUrl` / `repoUrl` vacíos o elimínalos si aún no tienes links.
 */
export const projects: Project[] = [
  {
    id: "proyecto-1",
    title: {
      es: "Proyecto APP MOVIL - CLUB LEON",
      en: "Club León mobile app",
    },
    description: {
      es: "Aplicación móvil para el Club León, permite acceder a contenido oficial del club, noticias, videos, plantilla, partidos, calendario,etc.",
      en: "Mobile app for Club León. It opens official news, videos, the squad, matches, and the calendar.",
    },
    tags: ["Flutter", "Firebase", "Dart"],
    image: "/images/APP_ICON.jpg",
    demoUrl: "https://clubleon.mx/app-oficial/",
    caseStudySlug: "app-club-leon",
    featured: true,
  },
  {
    id: "proyecto-2",
    title: {
      es: "Proyecto Tienda Online - CLUB LEON",
      en: "Club León online store",
    },
    description: {
      es: "Tienda online de 'La Guarida'. Permite acceder a la marca oficial de Club León, lanzamientos de jerseys, acesorios y ropa deportiva. También es posible hacer compras en linea, además de tener un asistente de Inteligencia Artificial para responder preguntas y dar recomendaciones de productos.",
      en: "La Guarida online store. It carries the official Club León brand, jersey launches, accessories, and sportswear, with online checkout and an assistant that answers questions and recommends products.",
    },
    tags: ["Next.js", "Stripe", "Firebase"],
    image: "/images/LOGOGRD.png",
    demoUrl: "https://tiendalaguarida.com/",
    caseStudySlug: "tienda-la-guarida",
    featured: true,
  },
  {
    id: "proyecto-3",
    title: {
      es: "Sistema de Acreditación",
      en: "Accreditation system",
    },
    description: {
      es: "Sistema interno de acreditaciones para personal operativo, prensa y vendedores dentro del Club León",
      en: "Internal accreditation system for operations staff, press, and vendors at Club León.",
    },
    tags: ["Angular", "Tailwind"],
    image: "/images/ACREDITACIONES_ICON.jpg",
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    id: "proyecto-4",
    title: {
      es: "Gestión de concesiones",
      en: "Concession management",
    },
    description: {
      es: "Consola para administrar concesiones, sucursales, productos, inventario de jornada, cortes y usuarios del estadio.",
      en: "Console to manage stadium concessions, branches, products, match-day inventory, cash closings, and users.",
    },
    tags: ["Next.js", "Firebase", "Express"],
    caseStudySlug: "punto-venta-concesiones",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
