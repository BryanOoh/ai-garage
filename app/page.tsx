import { DM_Mono, Instrument_Serif } from "next/font/google";
import GarageIntro from "./_components/GarageIntro";
import GarageProjectCell from "./_components/GarageProjectCell";
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
    tags: ["React", "TypeScript", "MCP", "Live DOM"],
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
            <GarageProjectCell key={p.slug} project={p} />
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
