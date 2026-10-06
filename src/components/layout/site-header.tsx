"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/content/site";

const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

export function SiteHeader() {
  const { copy } = usePreferences();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Hysteresis: without the two thresholds the island flickers open and shut
  // when the user stops scrolling right at the boundary.
  useMotionValueEvent(scrollY, "change", (y) => {
    setCompact((previous) => (previous ? y > 60 : y > 140));
  });

  const activeHref = copy.nav.find(
    (item) => !item.href.includes("#") && pathname.startsWith(item.href),
  )?.href;
  const highlighted = hovered ?? activeHref;
  const transition = reduceMotion ? { duration: 0 } : SPRING;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="container-narrow flex items-center justify-between gap-3">
        <motion.div layout transition={transition} className="pointer-events-auto">
          <Link
            href="/"
            className="nav-island flex h-12 items-center gap-2.5 pr-1 pl-1 transition-colors hover:text-primary"
          >
            <Image
              src="/images/LogoZuri.jpg"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <AnimatePresence initial={false}>
              {compact ? null : (
                <motion.span
                  key="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="pr-4 font-heading text-sm font-semibold tracking-tight whitespace-nowrap sm:text-base"
                >
                  {siteConfig.name}
                </motion.span>
              )}
            </AnimatePresence>
            <span className="sr-only">{copy.home}</span>
          </Link>
        </motion.div>

        <motion.nav
          layout
          transition={transition}
          onMouseLeave={() => setHovered(null)}
          className="nav-island pointer-events-auto hidden h-12 items-center gap-0.5 px-1.5 md:flex"
          aria-label={copy.navLabel}
        >
          {copy.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              aria-current={item.href === activeHref ? "page" : undefined}
              className="relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-[current=page]:text-foreground"
            >
              {highlighted === item.href ? (
                <motion.span
                  layoutId="nav-island-pill"
                  transition={transition}
                  className="absolute inset-0 -z-10 rounded-full bg-muted"
                />
              ) : null}
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-1.5 h-9 rounded-full px-4">
            <Link href="/contact">{copy.talk}</Link>
          </Button>
        </motion.nav>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={copy.openMenu}
              className="nav-island pointer-events-auto flex size-12 items-center justify-center text-foreground md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card">
            <SheetHeader>
              <SheetTitle className="text-left font-heading">
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1" aria-label={copy.mobileNav}>
              {copy.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link href="/contact">{copy.talk}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
