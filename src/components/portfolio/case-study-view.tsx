"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizeCaseStudy, type CaseStudy } from "@/content/case-studies";
import { type ProjectImage } from "@/lib/project-images";

type CaseStudyViewProps = {
  study: CaseStudy;
  images: ProjectImage[];
};

export function CaseStudyView({ study, images }: CaseStudyViewProps) {
  const { copy, locale } = usePreferences();
  const localized = localizeCaseStudy(study, locale);

  return (
    <article className="section-pad">
      <div className="container-narrow">
        <Button asChild variant="ghost" className="-ml-2 mb-8">
          <Link href="/#projects">
            <ArrowLeft data-icon="inline-start" />
            {copy.caseBack}
          </Link>
        </Button>

        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              {localized.kicker}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {localized.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {localized.summary}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm leading-relaxed">{localized.scope}</p>
            {localized.liveUrl ? (
              <Button asChild className="mt-4">
                <Link href={localized.liveUrl} target="_blank" rel="noopener noreferrer">
                  {copy.live}
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            ) : null}
          </div>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[12rem_minmax(0,1fr)]" aria-labelledby="about-heading">
          <h2 id="about-heading" className="font-heading text-2xl font-semibold tracking-tight">
            {copy.aboutProject}
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed">
            {localized.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="font-heading text-2xl font-semibold tracking-tight">
            {copy.technologies}
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {localized.technologies.map((group) => (
              <div key={group.group}>
                <h3 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12" aria-labelledby="gallery-heading">
          <div className="mb-8 max-w-2xl">
            <h2 id="gallery-heading" className="font-heading text-2xl font-semibold tracking-tight">
              {copy.gallery}
            </h2>
          </div>
          <ProjectGallery
            folder={study.slug}
            items={images.map((image) => ({
              id: image.id,
              img: image.src,
              alt:
                localized.galleryAlts[image.file] ??
                image.file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
              height: image.height,
            }))}
          />
        </section>

        <section className="border-t border-border pt-12" aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="font-heading text-2xl font-semibold tracking-tight">
            {copy.problems}
          </h2>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {localized.problems.map((item, index) => (
              <li
                key={item.problem}
                className="grid gap-4 py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
              >
                <span className="font-mono text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {copy.whatHappened}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.problem}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {copy.whatWeDid}
                  </h3>
                  <p className="mt-2 leading-relaxed">{item.resolution}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
