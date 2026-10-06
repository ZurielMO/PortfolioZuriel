"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { usePreferences } from "@/components/providers/preferences-provider";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const { copy } = usePreferences();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container-narrow flex flex-col gap-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">
              {siteConfig.name}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {siteConfig.role} · {siteConfig.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </Link>
          </div>
        </div>

        <p className="pr-36 pb-32 text-sm text-muted-foreground sm:pb-4">
          © {year} {siteConfig.name}. {copy.footerNote}
        </p>
      </div>
    </footer>
  );
}
