"use client";

import { Moon, Sun } from "lucide-react";

import { usePreferences } from "@/components/providers/preferences-provider";
import type { Locale } from "@/lib/locale";

const LOCALES: Locale[] = ["es", "en"];

export function PreferenceDock() {
  const { theme, locale, copy, setLocale, toggleTheme } = usePreferences();
  const themeLabel = theme === "dark" ? copy.themeToLight : copy.themeToDark;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      <div
        className="nav-island pointer-events-auto flex h-11 items-center p-1"
        role="group"
        aria-label={copy.language}
      >
        {LOCALES.map((option) => {
          const active = option === locale;
          const label = option === "es" ? copy.spanish : copy.english;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setLocale(option)}
              className="h-9 rounded-full px-3 text-xs font-medium tracking-wide uppercase transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              <span className="sr-only">{label}</span>
              <span aria-hidden="true">{option}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        className="nav-island pointer-events-auto flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {theme === "dark" ? (
          <Sun className="size-4" strokeWidth={1.5} />
        ) : (
          <Moon className="size-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
