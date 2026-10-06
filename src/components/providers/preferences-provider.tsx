"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { messages, type Messages } from "@/content/messages";
import {
  LOCALE_COOKIE,
  THEME_COOKIE,
  type Locale,
  type Theme,
} from "@/lib/locale";

type Preferences = {
  theme: Theme;
  locale: Locale;
  copy: Messages;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

function persist(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
  try {
    localStorage.setItem(name, value);
  } catch {
    // El modo privado puede bloquear localStorage. La cookie basta.
  }
}

export function PreferencesProvider({
  initialTheme,
  initialLocale,
  children,
}: {
  initialTheme: Theme;
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = locale;
    document.documentElement.style.colorScheme = theme;
    persist(THEME_COOKIE, theme);
    persist(LOCALE_COOKIE, locale);
  }, [theme, locale]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo<Preferences>(
    () => ({
      theme,
      locale,
      copy: messages[locale],
      setTheme,
      setLocale,
      toggleTheme,
    }),
    [theme, locale, setTheme, setLocale, toggleTheme],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) {
    throw new Error("usePreferences debe usarse dentro de PreferencesProvider");
  }
  return value;
}
