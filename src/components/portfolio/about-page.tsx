"use client";

import Link from "next/link";

import { AvatarFigure } from "@/components/portfolio/avatar-figure";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function AboutPage() {
  const { copy } = usePreferences();

  return (
    <section className="section-pad">
      <div className="container-narrow grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {copy.hello} {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {copy.bio}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {copy.aboutExtra}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#projects">{copy.viewProjects}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">{copy.contact}</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <AvatarFigure
            pose="de-pie"
            sizes="(min-width: 768px) 380px, 260px"
            className="h-[clamp(16rem,40vw,26rem)] w-auto mask-[linear-gradient(to_bottom,#000_86%,transparent_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
