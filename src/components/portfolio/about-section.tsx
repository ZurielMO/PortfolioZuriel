"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AvatarFigure } from "@/components/portfolio/avatar-figure";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { TrebleClef3D } from "@/components/portfolio/treble-clef-3d";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const { copy } = usePreferences();

  return (
    <section
      id="about"
      className="section-pad scroll-mt-(--header-height)"
      aria-labelledby="about-heading"
    >
      <div className="container-narrow grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <AnimatedContent distance={60} duration={0.9} threshold={0.25}>
          <h2
            id="about-heading"
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {copy.aboutTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.bio}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/about">
              {copy.moreAbout}
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </AnimatedContent>

        <AnimatedContent
          distance={70}
          duration={1}
          delay={0.1}
          threshold={0.2}
          className="order-first lg:order-0"
        >
          <div className="relative mx-auto flex max-w-md items-end justify-center lg:max-w-none">
            <div className="pointer-events-none absolute -top-6 right-0 w-[42%] opacity-70 sm:right-4">
              <TrebleClef3D />
            </div>
            <AvatarFigure
              pose="brazos-cruzados"
              sizes="(min-width: 1024px) 360px, 280px"
              className="relative z-10 h-[clamp(18rem,48vw,28rem)] w-auto mask-[linear-gradient(to_bottom,#000_84%,transparent_100%)]"
            />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
