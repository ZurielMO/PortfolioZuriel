import { caseStudiesEn } from "@/content/case-studies.en";
import type { Locale } from "@/lib/locale";

export type CaseProblem = {
  problem: string;
  resolution: string;
};

export type CaseTechnologyGroup = {
  group: string;
  items: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  liveUrl?: string;
  scope: string;
  about: string[];
  technologies: CaseTechnologyGroup[];
  problems: CaseProblem[];
  /** Nombre de archivo dentro de public/images/projects/{slug}/ */
  galleryAlts: Record<string, { es: string; en: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tienda-la-guarida",
    title: "Tienda La Guarida",
    kicker: "Ecommerce oficial de Club León",
    summary:
      "Catálogo, checkout y operación de la tienda oficial. El sitio muestra precios y el servidor confirma el cobro.",
    liveUrl: "https://tiendalaguarida.com/",
    scope:
      "Interfaz en TiendaFrontCL. API compartida en BackendCL, la misma que consume la app oficial.",
    about: [
      "La Guarida es la tienda en línea de Club León. El aficionado recorre jerseys, accesorios y lanzamientos, guarda favoritos, arma el carrito y paga con Stripe o Aplazo. Puede recoger en sucursal o pedir envío a domicilio.",
      "Del lado interno se administran productos, tallas, líneas, categorías, inventario, órdenes, banners, proveedores y el programa de puntos. Un asistente responde dudas de producto y ayuda a revisar la operación.",
      "La pantalla no decide el dinero. El checkout envía lo que el cliente cree que va a pagar y el backend confirma subtotal, descuento, envío y total antes de crear el cobro.",
    ],
    technologies: [
      {
        group: "Interfaz",
        items: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Tailwind CSS 4",
          "Radix",
          "Firebase",
          "Stripe Embedded Checkout",
          "Aplazo",
          "Genkit y Gemini",
          "Sentry",
          "Playwright",
        ],
      },
      {
        group: "Servidor",
        items: [
          "Node.js 22",
          "Express",
          "Cloud Functions",
          "Firestore",
          "Firebase Auth",
          "Stripe",
          "Zod",
          "Swagger",
          "Jest",
        ],
      },
    ],
    problems: [
      {
        problem:
          "Si el total se calcula solo en el navegador, una oferta o un código se pueden alterar antes de pagar.",
        resolution:
          "El checkout manda un subtotal esperado. El servidor recalcula productos, descuento, envío y total, y solo entonces abre el pago.",
      },
      {
        problem:
          "Había órdenes que Stripe ya tenía como pagadas y el pedido seguía a medias, y recolecciones que vencían sin cerrarse.",
        resolution:
          "Se reparó el estado de esas órdenes pagadas, se cerraron los pickups vencidos y quedó una auditoría de la salud de los pagos.",
      },
      {
        problem:
          "La lealtad de la tienda y la API de socios compartían ruta. El control de acceso de socios respondía 401 antes de reconocer la sesión del cliente.",
        resolution:
          "La sesión de la tienda quedó en /loyalty/internal/v1 y la de socios en /loyalty/v1, para que un login no bloquee al otro.",
      },
      {
        problem:
          "Recoger en tienda y enviar a domicilio no cuestan lo mismo, y una guía de paquetería pendiente no puede frenar un pago ya válido.",
        resolution:
          "La recolección queda en cero. El domicilio distingue León y fuera de León. FedEx se resuelve después, sin bloquear el cobro.",
      },
    ],
    galleryAlts: {
      "home-la-guarida.png": {
        es: "Inicio de La Guarida con las jerseys locales y de visita 26/27",
        en: "La Guarida home with the 26/27 home and away jerseys",
      },
    },
  },
  {
    slug: "app-club-leon",
    title: "App oficial Club León",
    kicker: "iOS y Android",
    summary:
      "La app de la afición: partidos, plantilla, noticias, beneficios, puntos y la tienda, con la misma API del club.",
    liveUrl: "https://clubleon.mx/app-oficial/",
    scope:
      "App en FrontClubLeon, hecha con Flutter. Los datos salen de BackendCL, el mismo servicio de la tienda.",
    about: [
      "Es la aplicación oficial de Club León. Desde ahí se leen noticias, la plantilla, el calendario, el detalle de un partido y la clasificación. También están la galería, los beneficios de la afición, los puntos y el código QR del aficionado.",
      "La tienda y los boletos se abren dentro del flujo de la app, sin pedir otra cuenta. Las notificaciones avisan de partidos y contenido aunque la aplicación esté cerrada, y la racha se puede ver en un widget de la pantalla de inicio.",
      "La app no guarda la verdad del club en el teléfono. Consulta el API, respeta la sesión de Firebase y muestra estados claros cuando no hay red o el partido todavía no tiene datos.",
    ],
    technologies: [
      {
        group: "App",
        items: [
          "Flutter",
          "Dart",
          "Provider",
          "Dio",
          "Firebase Auth",
          "Cloud Firestore",
          "Cloud Messaging",
          "Firebase Storage",
          "Google Sign-In",
          "Sign in with Apple",
        ],
      },
      {
        group: "Servidor compartido",
        items: [
          "Node.js 22",
          "Express",
          "Cloud Functions",
          "Firestore",
          "Notificaciones",
          "Liga MX",
          "Plantilla",
          "Beneficios",
          "Lealtad",
        ],
      },
    ],
    problems: [
      {
        problem:
          "La tienda dentro de la app se ve en un WebView. Si esa vista inventa su propia sesión, el aficionado queda desconectado de la cuenta con la que entró.",
        resolution:
          "La sesión viaja desde Firebase hacia la tienda y se revisa su integridad, para que el WebView no sea quien decide si el usuario está autenticado.",
      },
      {
        problem:
          "Un aviso que solo existe mientras la app está abierta se pierde, y uno que solo existe como push no deja historial.",
        resolution:
          "Las notificaciones llegan con la app cerrada, se guardan en una bandeja y el aficionado elige qué quiere recibir.",
      },
      {
        problem:
          "El calendario y la jornada se corren si se calculan con la zona del teléfono o si se mezclan competencias.",
        resolution:
          "Los partidos se filtran por el torneo activo y se muestran en horario de México, con el mismo contexto que usa el resto del club.",
      },
    ],
    galleryAlts: {
      "ficha-play-store.png": {
        es: "Ficha de Club León FC en la tienda de aplicaciones, con pantallas de la app",
        en: "Club León FC store listing, with screenshots of the app",
      },
    },
  },
  {
    slug: "punto-venta-concesiones",
    title: "Gestión de concesiones",
    kicker: "Operación del estadio",
    summary:
      "Consola para administrar concesiones, sucursales, productos, inventario de jornada, cortes y usuarios. No incluye el pedido a palco.",
    scope:
      "Interfaz en PuntoVentaConcesion. API en PuntoVentaConcesionBackend. El alcance lo define el rol en el servidor.",
    about: [
      "Es la consola con la que se opera el día de partido en las concesiones del estadio. Un superadministrador ve concesiones, sucursales, zonas, productos, combos, descuentos, inventarios, cortes, tickets y usuarios. Un administrador de concesión trabaja solo la suya. Un vendedor queda atado a su sucursal.",
      "Cada jornada tiene inventario, ventas y corte. La pantalla muestra el alcance de quien entró y deja pasar de una cifra al detalle: qué se vendió, en qué sucursal y con qué movimiento de stock.",
      "Esta página cubre la gestión de administradores y recursos. El flujo de pedido a palco es otro producto y no forma parte de este caso.",
    ],
    technologies: [
      {
        group: "Interfaz",
        items: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Tailwind CSS 4",
          "Firebase",
          "React Hook Form",
          "Zod",
          "Recharts",
          "jsPDF",
        ],
      },
      {
        group: "Servidor",
        items: [
          "Node.js",
          "TypeScript",
          "Cloud Functions",
          "Express",
          "Firestore",
          "Firebase Admin",
          "Zod",
          "JWT",
          "Swagger",
          "Jest",
        ],
      },
    ],
    problems: [
      {
        problem:
          "Al asignar un administrador a una concesión solo se actualizaba la concesión. El usuario no recibía su concesionId, el token salía vacío y no podía crear productos.",
        resolution:
          "La asignación escribe los dos documentos. Solo un superadministrador puede hacerlo, y el administrador tiene que existir y tener el rol correcto.",
      },
      {
        problem:
          "Los registros viejos usaban otros nombres de campo y el inventario estaba partido por sucursal, así que dos cajas de la misma concesión no compartían stock.",
        resolution:
          "Los campos quedaron como concesionId y sucursalId. El inventario de jornada es uno por concesión y fecha, con movimientos de carga, ajuste y venta.",
      },
      {
        problem:
          "Si la pantalla escondía botones pero el API no revisaba el rol, un administrador podía leer o escribir datos de otra concesión.",
        resolution:
          "El servidor exige el rol. El superadministrador administra sucursales e inventarios. El administrador y el vendedor solo alcanzan lo que les corresponde.",
      },
    ],
    galleryAlts: {},
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export type LocalizedCaseStudy = Omit<CaseStudy, "galleryAlts"> & {
  galleryAlts: Record<string, string>;
};

export function localizeCaseStudy(
  study: CaseStudy,
  locale: Locale,
): LocalizedCaseStudy {
  const galleryAlts = Object.fromEntries(
    Object.entries(study.galleryAlts).map(([file, alt]) => [file, alt[locale]]),
  );
  if (locale === "es") return { ...study, galleryAlts };
  const english = caseStudiesEn[study.slug as keyof typeof caseStudiesEn];
  return english ? { ...study, ...english, galleryAlts } : { ...study, galleryAlts };
}
