export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

export function readThemeFromDom(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private browsing */
  }
}

/** Inline script for <head> — prevents theme flash (FOUC) */
export const themeInitScript = `
(function () {
  var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
  try {
    var stored = localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') {
      if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
      return;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`.trim();
