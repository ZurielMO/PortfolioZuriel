"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectsSectionProps = {
  projects: Project[];
  showViewAll?: boolean;
};

const SPOTLIGHT = "rgba(163, 131, 104, 0.38)" as const;

// Los proyectos sin liga todavía guardan "#" en el contenido, que como enlace
// real no lleva a ningún lado.
const realUrl = (url?: string) => (url && url !== "#" ? url : undefined);

const externalProps = (url: string) =>
  url.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

function ProjectActions({ project }: { project: Project }) {
  const { copy } = usePreferences();
  const demo = realUrl(project.demoUrl);
  const repo = realUrl(project.repoUrl);
  const caseHref = project.caseStudySlug
    ? `/proyectos/${project.caseStudySlug}`
    : undefined;

  if (!demo && !repo && !caseHref) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {caseHref ? (
        <Button asChild size="sm">
          <Link href={caseHref}>
            {copy.viewCase}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      ) : null}
      {demo ? (
        <Button asChild size="sm" variant={caseHref ? "outline" : "default"}>
          <Link href={demo} {...externalProps(demo)}>
            {copy.visitProject}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      ) : null}
      {repo ? (
        <Button asChild variant="outline" size="sm">
          <Link href={repo} {...externalProps(repo)}>
            <Github data-icon="inline-start" />
            {copy.code}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// Las imágenes de los proyectos son logotipos y una fotografía, así que se
// encuadran con object-contain: recortarlas partía los logos por la mitad.
function ProjectMedia({
  project,
  alt,
  className,
  sizes,
  padding,
}: {
  project: Project;
  alt: string;
  className?: string;
  sizes: string;
  padding: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-background ring-1 ring-border/60",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-contain transition-transform duration-700 ease-out group-hover/spotlight:scale-[1.05] motion-reduce:transition-none",
            padding,
          )}
        />
      ) : null}
    </div>
  );
}

export function ProjectsSection({
  projects,
  showViewAll = true,
}: ProjectsSectionProps) {
  const { copy, locale } = usePreferences();
  const title = showViewAll ? copy.projectsTitle : copy.projectsFullTitle;
  const description = showViewAll
    ? copy.projectsDescription
    : copy.projectsFullDescription;
  const [featured, ...rest] = projects;

  if (!featured) return null;

  return (
    <section
      id="projects"
      className="section-pad scroll-mt-(--header-height)"
      aria-labelledby="projects-heading"
    >
      <div className="container-narrow">
        <AnimatedContent
          distance={50}
          duration={0.8}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <h2
              id="projects-heading"
              className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>
          {showViewAll ? (
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                {copy.viewAll}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          ) : null}
        </AnimatedContent>

        <div className="grid gap-5 lg:grid-cols-12">
          <AnimatedContent
            distance={70}
            duration={0.9}
            threshold={0.15}
            className="lg:col-span-7"
          >
            <SpotlightCard
              spotlightColor={SPOTLIGHT}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50 sm:p-6"
            >
              <ProjectMedia
                project={featured}
                alt={featured.title[locale]}
                className="aspect-[16/9]"
                sizes="(min-width: 1024px) 58vw, 100vw"
                padding="p-6 sm:p-10"
              />
              <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
                {featured.title[locale]}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {featured.description[locale]}
              </p>
              <ProjectTags tags={featured.tags} />
              <ProjectActions project={featured} />
            </SpotlightCard>
          </AnimatedContent>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((project, index) => (
              <AnimatedContent
                key={project.id}
                distance={70}
                duration={0.9}
                delay={0.1 + index * 0.08}
                threshold={0.15}
                className="flex-1"
              >
                <SpotlightCard
                  spotlightColor={SPOTLIGHT}
                  className="flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:border-accent/50"
                >
                  <div className="flex gap-4">
                    {project.image ? (
                      <ProjectMedia
                        project={project}
                        alt={project.title[locale]}
                        className="aspect-square w-24 shrink-0 sm:w-28"
                        sizes="140px"
                        padding="p-2.5"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-semibold tracking-tight">
                        {project.title[locale]}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {project.description[locale]}
                      </p>
                    </div>
                  </div>
                  <ProjectTags tags={project.tags} />
                  <ProjectActions project={project} />
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
