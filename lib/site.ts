/** Central site URLs — override via NEXT_PUBLIC_* in .env.local */

const env = (key: string, fallback: string) =>
  process.env[key]?.trim() || fallback;

export const SITE_URL = env("NEXT_PUBLIC_SITE_URL", "https://ai-garage.dev");

export const PORTFOLIO_URL = "https://bryanohdesign.com/";

/** Monorepo / garage landing repo */
export const GITHUB_AI_GARAGE_URL = env(
  "NEXT_PUBLIC_GITHUB_AI_GARAGE_URL",
  "https://github.com/bryanoh/ai-garage",
);

/** PixelAgent package source */
export const GITHUB_PIXELAGENT_URL = env(
  "NEXT_PUBLIC_GITHUB_PIXELAGENT_URL",
  "https://github.com/bryanoh/pixelagent",
);

/** Set when docs are live; empty string hides the docs link */
export const PIXELAGENT_DOCS_URL = env("NEXT_PUBLIC_PIXELAGENT_DOCS_URL", "");

/** Set to "true" to unlock Install+ sections on /pixelagent */
export const PIXELAGENT_PAGE_ENABLED =
  env("NEXT_PUBLIC_PIXELAGENT_PAGE_ENABLED", "false") === "true";

export type PixelagentSection = {
  id: string;
  label: string;
  /** Locked until NEXT_PUBLIC_PIXELAGENT_PAGE_ENABLED or preview cookie */
  locked?: boolean;
};

export const pixelagentSections = [
  { id: "overview", label: "Why I made it" },
  { id: "try", label: "Try it" },
  { id: "what", label: "What I built" },
  { id: "how", label: "Under the hood", locked: true },
  { id: "output", label: "What it sends", locked: true },
  { id: "install", label: "Run it yourself", locked: true },
  { id: "closing", label: "Closing thoughts" },
] as const satisfies readonly PixelagentSection[];

export function isPixelagentSectionLocked(id: string): boolean {
  return pixelagentSections.some(
    (s) => s.id === id && Boolean((s as PixelagentSection).locked),
  );
}
