import { DM_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import GarageIntro from "./_components/GarageIntro";
import SiteHeader from "./_components/SiteHeader";
import { PORTFOLIO_URL } from "@/lib/site";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const projects = [
  {
    slug: "pixelagent",
    num: "01",
    type: "TOOL · NPM PACKAGE",
    name: "PixelAgent",
    desc: "The live DOM layer for vibe coders — click what's running, annotate or tweak it visually, and hand your agent a surgical diff instead of another screenshot.",
    tags: ["React", "TypeScript", "MCP", "Tailwind"],
    wip: true,
  },
];

const coming = [{ num: "02" }, { num: "03" }];

export default function HomePage() {
  return (
    <div
      className={`garage-body ${instrumentSerif.variable} ${dmMono.variable}`}
    >
      <SiteHeader
        homeHref={PORTFOLIO_URL}
        homeLabel="bryan's portfolio website"
        external
      />

      <div className="garage-shell">
        <GarageIntro />

        <main id="main-content" className="garage-grid">
          {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="garage-cell garage-cell--active"
          >
            <span className="garage-kicker">
              {p.num} {p.type}
            </span>

            <div className="garage-title-row">
              <h2 className="garage-title">{p.name}</h2>
              {p.wip && (
                <span className="wip-chip">
                  <span className="wip-dot" aria-hidden="true" />
                  WIP
                </span>
              )}
            </div>

            <p className="garage-desc">{p.desc}</p>

            <div className="garage-cell-foot">
              <div className="garage-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="garage-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="garage-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
          ))}

          {coming.map((slot) => (
            <div key={slot.num} className="garage-cell garage-cell--soon">
              <span className="garage-slot-num">{slot.num} ·</span>
              <span className="garage-slot-rule" aria-hidden="true" />
              <p className="garage-slot-text">
                next project
                <br />
                coming soon
              </p>
            </div>
          ))}

          <div className="garage-cell garage-cell--void" aria-hidden="true" />
        </main>
      </div>
    </div>
  );
}
