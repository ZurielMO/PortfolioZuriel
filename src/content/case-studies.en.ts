export const caseStudiesEn = {
  "tienda-la-guarida": {
    title: "La Guarida store",
    kicker: "Official Club León ecommerce",
    summary:
      "Catalog, checkout, and day-to-day operation of the official store. The site shows prices and the server confirms the charge.",
    scope:
      "Interface in TiendaFrontCL. Shared API in BackendCL, the same one the official app uses.",
    about: [
      "La Guarida is Club León's online store. Fans browse jerseys, accessories, and launches, save favorites, build a cart, and pay with Stripe or Aplazo. They can pick up in store or request home delivery.",
      "On the inside, the team manages products, sizes, lines, categories, inventory, orders, banners, suppliers, and the points program. An assistant answers product questions and helps review operations.",
      "The screen does not decide the money. Checkout sends what the customer expects to pay, and the backend confirms subtotal, discount, shipping, and total before creating the charge.",
    ],
    technologies: [
      {
        group: "Interface",
        items: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Tailwind CSS 4",
          "Radix",
          "Firebase",
          "Stripe Embedded Checkout",
          "Aplazo",
          "Genkit and Gemini",
          "Sentry",
          "Playwright",
        ],
      },
      {
        group: "Server",
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
          "If the total is calculated only in the browser, an offer or a code can be changed before payment.",
        resolution:
          "Checkout sends an expected subtotal. The server recalculates products, discount, shipping, and total, and only then opens payment.",
      },
      {
        problem:
          "Some orders were already paid in Stripe while the order stayed half-finished, and pickups expired without being closed.",
        resolution:
          "Those paid orders were repaired, expired pickups were closed, and a payment-health audit was left in place.",
      },
      {
        problem:
          "Store loyalty and the partner API shared a route. Partner access control answered 401 before it recognized the customer session.",
        resolution:
          "The store session moved to /loyalty/internal/v1 and partners stayed on /loyalty/v1, so one login does not block the other.",
      },
      {
        problem:
          "Store pickup and home delivery do not cost the same, and a pending shipping label cannot stop a payment that is already valid.",
        resolution:
          "Pickup stays at zero. Home delivery distinguishes León from outside León. FedEx is resolved afterward, without blocking the charge.",
      },
    ],
  },
  "app-club-leon": {
    title: "Official Club León app",
    kicker: "iOS and Android",
    summary:
      "The fans' app: matches, squad, news, benefits, points, and the store, on the club's same API.",
    scope:
      "App in FrontClubLeon, built with Flutter. Data comes from BackendCL, the same service as the store.",
    about: [
      "This is the official Club León app. From there you read news, the squad, the calendar, a match detail, and the standings. The gallery, fan benefits, points, and the fan QR code are there too.",
      "The store and tickets open inside the app flow, without asking for another account. Notifications announce matches and content even when the app is closed, and the streak can sit on a home-screen widget.",
      "The app does not keep the club's source of truth on the phone. It calls the API, respects the Firebase session, and shows clear states when there is no network or the match has no data yet.",
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
        group: "Shared server",
        items: [
          "Node.js 22",
          "Express",
          "Cloud Functions",
          "Firestore",
          "Notifications",
          "Liga MX",
          "Squad",
          "Benefits",
          "Loyalty",
        ],
      },
    ],
    problems: [
      {
        problem:
          "The store inside the app is a WebView. If that view invents its own session, the fan is disconnected from the account they signed in with.",
        resolution:
          "The session travels from Firebase into the store and its integrity is checked, so the WebView is not what decides whether the user is authenticated.",
      },
      {
        problem:
          "A notice that exists only while the app is open gets lost, and one that exists only as a push leaves no history.",
        resolution:
          "Notifications arrive with the app closed, they are stored in an inbox, and the fan chooses what to receive.",
      },
      {
        problem:
          "The calendar and the match day shift if they are calculated with the phone's time zone, or if competitions get mixed.",
        resolution:
          "Matches are filtered by the active tournament and shown in Mexico time, with the same context the rest of the club uses.",
      },
    ],
  },
  "punto-venta-concesiones": {
    title: "Concession management",
    kicker: "Stadium operations",
    summary:
      "Console to manage concessions, branches, products, match-day inventory, cash closings, and users. It does not include suite ordering.",
    scope:
      "Interface in PuntoVentaConcesion. API in PuntoVentaConcesionBackend. Scope is defined by the role on the server.",
    about: [
      "This is the console used to run match day across the stadium concessions. A super administrator sees concessions, branches, zones, products, combos, discounts, inventory, closings, tickets, and users. A concession administrator works only their own. A seller stays tied to their branch.",
      "Each match day has inventory, sales, and a closing. The screen shows the scope of whoever signed in and lets you move from a figure to the detail: what sold, at which branch, and with which stock movement.",
      "This page covers administrator and resource management. Suite ordering is a different product and is not part of this case.",
    ],
    technologies: [
      {
        group: "Interface",
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
        group: "Server",
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
          "Assigning an administrator to a concession only updated the concession. The user never received concesionId, the token came out empty, and they could not create products.",
        resolution:
          "The assignment writes both documents. Only a super administrator can do it, and the administrator has to exist with the right role.",
      },
      {
        problem:
          "Old records used different field names and inventory was split by branch, so two registers of the same concession did not share stock.",
        resolution:
          "Fields became concesionId and sucursalId. Match-day inventory is one per concession and date, with load, adjustment, and sale movements.",
      },
      {
        problem:
          "If the screen hid buttons but the API did not check the role, an administrator could read or write another concession's data.",
        resolution:
          "The server requires the role. The super administrator manages branches and inventory. The administrator and the seller only reach what belongs to them.",
      },
    ],
  },
};
