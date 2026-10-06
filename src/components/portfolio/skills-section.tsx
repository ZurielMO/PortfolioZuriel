"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import LogoLoop from "@/components/react-bits/LogoLoop";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { allSkills, skillGroups, type Skill } from "@/content/skills";
import { cn } from "@/lib/utils";

type SkillsSectionProps = {
  showViewAll?: boolean;
};

const loopItems = allSkills.map((skill) => ({
  node: (
    <span className="flex items-center gap-3 whitespace-nowrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skill.logo}
        alt=""
        width={28}
        height={28}
        loading="eager"
        decoding="async"
        draggable={false}
        className="size-7 shrink-0 object-contain opacity-80 dark:invert"
      />
      <span className="font-heading text-2xl font-medium tracking-tight text-foreground/70 sm:text-3xl">
        {skill.name}
      </span>
    </span>
  ),
  title: skill.name,
  ariaLabel: skill.name,
}));

function SkillChip({ skill, onInk }: { skill: Skill; onInk?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm",
        onInk
          ? "border-ink-foreground/20 text-ink-foreground"
          : "border-border bg-background/60 text-foreground",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skill.logo}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        draggable={false}
        // Los logos son SVG monocromos negros, así que sobre el bloque
        // oscuro se invierten para seguir siendo legibles.
        className={cn(
          "size-4 shrink-0 object-contain",
          onInk ? "invert" : "dark:invert",
        )}
      />
      {skill.name}
    </span>
  );
}

export function SkillsSection({
  showViewAll = true,
}: SkillsSectionProps = {}) {
  const { copy } = usePreferences();
  const title = showViewAll ? copy.skillsTitle : copy.skillsFullTitle;
  const description = showViewAll
    ? copy.skillsDescription
    : copy.skillsFullDescription;
  const [frontend, backend, tooling] = skillGroups;

  return (
    <section
      id="skills"
      className="section-pad scroll-mt-(--header-height)"
      aria-labelledby="skills-heading"
    >
      <div className="container-narrow">
        <AnimatedContent
          distance={50}
          duration={0.8}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <h2
              id="skills-heading"
              className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>
          {showViewAll ? (
            <Button asChild variant="outline" size="lg">
              <Link href="/skills">
                {copy.viewStack}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          ) : null}
        </AnimatedContent>
      </div>

      <div className="mt-10">
        <LogoLoop
          logos={loopItems}
          speed={64}
          direction="left"
          logoHeight={48}
          gap={56}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel={copy.skillsLoopLabel}
        />
      </div>

      <AnimatedContent
        distance={60}
        duration={0.9}
        threshold={0.15}
        className="container-narrow mt-14"
      >
        {/* Los anchos siguen la cantidad de tecnologías de cada grupo, para que
            ninguna tarjeta quede con filas vacías. */}
        <div className="grid gap-4 md:grid-cols-12">
          <div className="rounded-2xl bg-card p-6 md:col-span-5">
            <h3 className="font-heading text-lg font-medium">{copy.skillGroups[0]}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {frontend.items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-ink p-6 text-ink-foreground md:col-span-4">
            <h3 className="font-heading text-lg font-medium">{copy.skillGroups[1]}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {backend.items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} onInk />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border p-6 md:col-span-3">
            <h3 className="font-heading text-lg font-medium">{copy.skillGroups[2]}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {tooling.items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
