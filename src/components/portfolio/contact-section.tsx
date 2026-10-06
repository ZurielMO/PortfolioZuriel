"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { AvatarFigure } from "@/components/portfolio/avatar-figure";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

const Particles = dynamic(() => import("@/components/react-bits/Particles"), {
  ssr: false,
});

const OUTLINE_ON_INK =
  "border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground";

export function ContactSection() {
  const { copy } = usePreferences();

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-(--header-height) overflow-hidden bg-ink text-ink-foreground"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <Particles
          particleCount={160}
          particleColors={["#F7F0E7", "#CFB59C", "#A38368"]}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={70}
          alphaParticles
          disableRotation
          moveParticlesOnHover={false}
        />
      </div>

      <div className="container-narrow grid gap-8 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-end md:gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <div className="order-last flex justify-center self-end md:order-0 md:justify-start">
          <AvatarFigure
            pose="senalando"
            decorative
            sizes="(min-width: 1024px) 288px, 220px"
            className="h-[clamp(14rem,28vw,22rem)] w-auto mask-[linear-gradient(to_bottom,#000_88%,transparent_100%)]"
          />
        </div>

        <div className="py-(--section-space) text-center md:text-left">
          <p className="font-mono text-xs tracking-[0.2em] text-ink-foreground/60 uppercase">
            {copy.contactKicker}
          </p>
          <h2
            id="contact-heading"
            className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {copy.contactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-foreground/70 md:mx-0">
            {copy.contactBody}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-ink-foreground text-ink hover:bg-ink-foreground/85"
            >
              <Link href={`mailto:${siteConfig.email}`}>
                <Mail data-icon="inline-start" />
                {siteConfig.email}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className={OUTLINE_ON_INK}>
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github data-icon="inline-start" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className={OUTLINE_ON_INK}>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin data-icon="inline-start" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
