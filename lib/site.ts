/** Central site URLs — override via NEXT_PUBLIC_* in .env.local */

const env = (key: string, fallback: string) =>
  process.env[key]?.trim() || fallback;

export const SITE_URL = env("NEXT_PUBLIC_SITE_URL", "https://bryangarage.dev");

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

export type PixelagentSection = {
  id: string;
  label: string;
};

export const pixelagentSections = [
  { id: "overview", label: "Why I made it" },
  { id: "try", label: "Try it" },
  { id: "what", label: "What I built" },
  { id: "how", label: "Under the hood" },
  { id: "output", label: "What it sends" },
  { id: "install", label: "Run it yourself" },
  { id: "closing", label: "Closing thoughts" },
] as const satisfies readonly PixelagentSection[];
