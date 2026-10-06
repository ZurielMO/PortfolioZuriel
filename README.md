# Portfolio Zuriel

Portafolio personal en Next.js 15 con arquitectura similar a TiendaFrontCL (App Router + `src/` + Tailwind 4 + shadcn/ui) y soporte para [React Bits](https://reactbits.dev/).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + tokens CSS
- shadcn/ui
- React Bits (registry `@react-bits`)
- Motion / GSAP / OGL (según componentes instalados)

## Empezar

```bash
cd C:\Users\zurie\OneDrive\Escritorio\portfolio-zuriel
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar tu contenido

| Qué | Archivo |
|-----|---------|
| Nombre, rol, bio, email, redes | `src/content/site.ts` |
| Proyectos | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |

Los proyectos en home usan `featured: true`. La ruta `/projects` muestra todos.

## Instalar más React Bits

El registry ya está en `components.json`:

```bash
npx shadcn@latest add @react-bits/NombreComponente-TS-TW
```

Ejemplos:

```bash
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @react-bits/Magnet-TS-TW
```

Mueve los archivos generados a `src/components/react-bits/` si el CLI los deja en `src/components/`, y agrega `"use client"` si usan hooks o WebGL.

Ya instalados en el hero:

- `Aurora` — fondo
- `SplitText` — título animado

## Scripts

```bash
npm run dev      # desarrollo (Turbopack)
npm run build    # build de producción
npm run start    # servir build
npm run lint     # ESLint
```

## Estructura

```text
src/
  app/                 # rutas
  components/
    ui/                # shadcn
    react-bits/        # React Bits
    layout/            # header, footer, shell
    portfolio/         # secciones
  content/             # datos editables
  lib/utils.ts         # cn()
```

## Notas

- Tema oscuro tecnológico por defecto (`html.dark`).
- Tipografía: Space Grotesk (display) + IBM Plex Sans/Mono.
- No incluye Firebase, Stripe ni lógica de ecommerce.
