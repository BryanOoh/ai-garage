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

/** Set to "true" to allow /pixelagent; otherwise redirects home */
export const PIXELAGENT_PAGE_ENABLED =
  env("NEXT_PUBLIC_PIXELAGENT_PAGE_ENABLED", "false") === "true";

export const pixelagentSections = [
  { id: "overview", label: "The problem" },
  { id: "what", label: "What it does" },
  { id: "install", label: "Install" },
  { id: "output", label: "Output format" },
  { id: "how", label: "How it works" },
  { id: "roadmap", label: "What's next" },
] as const;
