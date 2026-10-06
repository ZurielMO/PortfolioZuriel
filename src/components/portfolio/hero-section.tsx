"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDownRight } from "lucide-react";

import { AvatarFigure } from "@/components/portfolio/avatar-figure";
import SplitText from "@/components/react-bits/SplitText";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

const Aurora = dynamic(() => import("@/components/react-bits/Aurora"), {
  ssr: false,
});

export function HeroSection() {
  const { copy } = usePreferences();

  return (
    <section
      className="relative isolate -mt-(--header-height) overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <Aurora
          colorStops={["#A38368", "#CFB59C", "#E7D8C9"]}
          amplitude={0.7}
          blend={0.4}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/25 to-background" />
      </div>

      <div className="container-narrow relative grid min-h-dvh items-center gap-8 pt-[calc(var(--header-height)+1.5rem)] pb-28 sm:pb-16 md:grid-cols-[1.05fr_0.95fr] md:gap-6">
        <div className="flex flex-col gap-8">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            {copy.portfolio} · {siteConfig.location}
          </p>

          <div className="max-w-3xl">
            <SplitText
              text={siteConfig.name}
              tag="h1"
              className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl"
              textAlign="left"
              delay={40}
              duration={0.9}
              splitType="chars"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="-20px"
            />
            <p
              id="hero-heading"
              className="mt-4 font-heading text-xl text-muted-foreground sm:text-2xl"
            >
              {siteConfig.role}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/#projects">
                {copy.viewProjects}
                <ArrowDownRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">{copy.contact}</Link>
            </Button>
          </div>
        </div>

        {/* En móvil el avatar asoma desde abajo para no empujar los botones
            fuera de la primera pantalla. Desde md ocupa su propia columna. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end pr-2 sm:pr-6 md:static md:justify-end md:pr-0">
          <AvatarFigure
            pose="senalando"
            priority
            sizes="(min-width: 1280px) 420px, (min-width: 768px) 340px, 200px"
            className="h-[min(38vh,15.5rem)] w-auto translate-y-5 mask-[linear-gradient(to_bottom,#000_70%,transparent_100%)] md:h-[clamp(22rem,56vh,34rem)] md:translate-y-0 md:mask-[linear-gradient(to_bottom,#000_86%,transparent_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
