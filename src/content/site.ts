export const siteConfig = {
  name: "Erik Zuriel Mora Nicasio",
  role: "Developer",
  tagline:
    "Creo interfaces rápidas, accesibles y con gran usabilidad. Con una orientación al desarrollo de aplicaciones web o móviles.",
  bio: "Soy un desarrollador de software enfocado en proyectos web y móviles en Angular, Next.js, React, TypeScript. Tengo un manejo considerable de Backend, teniendo conocimientos en TypeScript, JavaScript, Python y Java. En bases de datos manejo Firebase (Firestore), MySQL y Express como ORM",
  location: "León Guanajuato, México",
  email: "zurielmora3@gmail.com",
  social: {
    github: "https://github.com/ZurielMO",
    linkedin: "https://www.linkedin.com/in/erik-zuriel-mora-nicasio-055b6a370/",
  },
  nav: [
    { href: "/#projects", label: "Proyectos" },
    { href: "/skills", label: "Skills" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
