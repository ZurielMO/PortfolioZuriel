export type Locale = "es" | "en";
export type Theme = "light" | "dark";

export const THEME_COOKIE = "portfolio-theme";
export const LOCALE_COOKIE = "portfolio-locale";

export function parseTheme(value: string | undefined): Theme {
  return value === "dark" ? "dark" : "light";
}

export function parseLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : "es";
}
