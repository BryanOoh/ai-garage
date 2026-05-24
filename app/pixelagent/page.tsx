import { redirect } from "next/navigation";
import SiteHeader from "../_components/SiteHeader";
import SidebarNav from "./_components/SidebarNav";
import MobileToc from "./_components/MobileToc";
import AnnotationSamples from "./_components/AnnotationSamples";
import SetupCodeBlocks from "./_components/SetupCodeBlocks";
import {
  GITHUB_PIXELAGENT_URL,
  PIXELAGENT_DOCS_URL,
  PIXELAGENT_PAGE_ENABLED,
} from "@/lib/site";

export default function PixelAgentPage() {
  if (!PIXELAGENT_PAGE_ENABLED) {
    redirect("/");
  }

  const docsReady = PIXELAGENT_DOCS_URL.length > 0;

  return (
    <>
      <SiteHeader homeHref="/" homeLabel="AI Garage" />

      <MobileToc />

      <div className="layout">
        <SidebarNav />

        <main id="main-content" className="main">
          <section id="overview" className="hero">
            <div className="status-badge" role="status">
              <span className="sbdot" aria-hidden="true" />
              Building · May 2026
            </div>
            <div className="hero-kicker">Side project — 01</div>

            <h1>
              I got tired of
              <br />
              <em>describing pixels</em>
              <br />
              to my AI agent.
            </h1>

            <div className="hero-body">
              <p>
                I vibe-code a lot. And somewhere between my fifth round-trip
                prompt and another 800-token description of a button that&apos;s two
                pixels off, I realized: I can <em>see</em> exactly what&apos;s
                wrong. Why am I narrating it?
              </p>
              <p>
                PixelAgent is my fix. Click the element, tweak it, hit apply. Done.
              </p>
            </div>

            <div className="actions">
              <a
                href={GITHUB_PIXELAGENT_URL}
                className="btn-p"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 1C3.69 1 1 3.69 1 7c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.29v-1.01c-1.67.36-2.02-.81-2.02-.81-.27-.69-.66-.87-.66-.87-.54-.37.04-.36.04-.36.6.04.91.61.91.61.53.91 1.39.65 1.73.49.05-.38.21-.65.38-.8-1.33-.15-2.73-.67-2.73-2.97 0-.66.23-1.19.62-1.61-.06-.15-.27-.76.06-1.58 0 0 .5-.16 1.65.61.48-.13.99-.2 1.5-.2.51 0 1.02.07 1.5.2 1.15-.77 1.65-.61 1.65-.61.33.82.12 1.43.06 1.58.38.42.62.95.62 1.61 0 2.31-1.4 2.82-2.74 2.97.22.18.41.55.41 1.12v1.66c0 .16.11.35.41.29C11.28 11.9 13 9.65 13 7c0-3.31-2.69-6-6-6z" />
                </svg>
                Follow on GitHub
              </a>
              <a href="#install" className="btn-g">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 1v7M3 5.5l3.5 3.5 3.5-3.5M2 11h9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Install (preview)
              </a>
            </div>
          </section>

          <section id="what">
            <div className="sec-lbl">The friction</div>
            <h2>
              Three things that kept <em>slowing me down</em>
            </h2>

            <ul className="friction-list">
              <li>
                Pasting screenshots into Claude and hoping it understood which
                component I meant
              </li>
              <li>
                Watching the token count climb as I re-explained the same layout
                three times
              </li>
              <li>
                Getting back a diff that touched half the file when I just
                wanted to nudge a padding value
              </li>
            </ul>

            <blockquote className="pullquote">
              &ldquo;I know what&apos;s wrong. I can see it. I just can&apos;t point at it.&rdquo;
            </blockquote>

            <p>
              So I built two things: a way to <strong>annotate</strong> the
              running app (not a screenshot), and a{" "}
              <strong>visual edit panel</strong> that talks directly to my
              agent. Both work on the live DOM — the actual element, with its
              actual class names and source location.
            </p>

            <div className="two-col utility-mt-lg">
              <div className="col-card">
                <div className="col-card-label">Mode A</div>
                <div className="col-card-title">Annotate</div>
                <p>
                  Click any element, write a note, copy structured markdown.
                  Paste into Claude Code, Cursor, anything. Zero tokens until
                  you paste.
                </p>
              </div>
              <div className="col-card">
                <div className="col-card-label">Mode B</div>
                <div className="col-card-title">Edit panel</div>
                <p>
                  Figma-like panel for spacing, color, type. Tweaks stay local
                  until you hit Apply — then one structured diff, one agent
                  call.
                </p>
              </div>
            </div>
          </section>

          <section id="install">
            <div className="sec-lbl">Setup</div>
            <h2>
              Two lines <em>to start</em>
            </h2>
            <p>
              No browser extension, no Web Store, no separate app. It ships
              with your project. Package is in active development — commands below
              reflect the planned API.
            </p>

            <SetupCodeBlocks />

            <p className="utility-text-sm utility-mt-xs">
              The <code>npx pixelagent setup</code> step detects Claude Code or
              Cursor and writes the MCP config automatically. Skip it and
              annotation mode still works — you just paste manually.
            </p>
          </section>

          <section id="output">
            <div className="sec-lbl">Annotation output</div>
            <h2>
              Choose how much <em>context to send</em>
            </h2>
            <p>
              Compact for a quick copy fix. Forensic when you&apos;re chasing a
              computed style bug.
            </p>

            <AnnotationSamples />

            <p className="utility-text-sm">Plain markdown. No API key. Paste anywhere.</p>
          </section>

          <section id="how">
            <div className="sec-lbl">Under the hood</div>
            <h2>
              Why <em>live DOM</em>, not screenshots
            </h2>

            <p className="disclaimer">
              Some tools annotate screenshots and ask a vision model what to
              change. That can work — but it infers structure from pixels.
              PixelAgent reads the live DOM so selectors, computed styles, and
              source hints are facts, not guesses.
            </p>

            <p>
              PixelAgent reads the actual DOM. The selector, computed styles,
              and source file are <strong>known facts</strong>, not inferences.
              The agent gets a surgical diff, not a full regen.
            </p>

            <div className="spec-row">
              <div className="spec-item">
                <span className="spec-key">agent lock-in</span>
                <span className="spec-val">
                  <span className="tag-w">none</span> — paste into Claude,
                  Cursor, Copilot
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">tokens per session</span>
                <span className="spec-val">
                  <strong>≤300</strong> vs ~2,500 for a prompt loop
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">source accuracy</span>
                <span className="spec-val">
                  <strong>≥95%</strong> with Babel plugin, ~80% fallback
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">panel latency</span>
                <span className="spec-val">
                  <strong>≤50ms</strong> live DOM override
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">animation states</span>
                <span className="spec-val">
                  pause CSS animations, annotate frozen frame
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">privacy</span>
                <span className="spec-val">
                  MCP runs locally — no source code leaves your machine
                </span>
              </div>
            </div>

            <p className="footnote" id="metrics-note">
              <sup>*</sup> Targets from internal dogfooding on a Next.js + Tailwind
              app (single-session edits, n≈20). Not a formal benchmark; numbers
              will change as the MVP ships.
            </p>
          </section>

          <section id="roadmap" aria-labelledby="roadmap-heading">
            <div className="sec-lbl">What&apos;s next</div>
            <h2 id="roadmap-heading">
              Still <em>building</em>
            </h2>

            <div className="rmap">
              <div className="ritem">
                <span className="rph rph-on">Now</span>
                <div>
                  <div className="rtitle">MVP — annotation + edit panel</div>
                  <p className="rdesc">
                    Click, text-select, area-select · 4 verbosity levels ·
                    spacing / color / border · Tailwind + inline · This / All
                    instances
                  </p>
                </div>
              </div>
              <div className="ritem">
                <span className="rph">Soon</span>
                <div>
                  <div className="rtitle">Typography + responsive viewport</div>
                  <p className="rdesc">
                    Font editing · 375px mobile toggle · CSS Modules · Undo
                    after Apply
                  </p>
                </div>
              </div>
              <div className="ritem">
                <span className="rph">Later</span>
                <div>
                  <div className="rtitle">
                    Vue / Svelte + propagation preview
                  </div>
                  <p className="rdesc">
                    Framework wrappers · see how &quot;All instances&quot; affects other
                    components before applying
                  </p>
                </div>
              </div>
              <div className="ritem">
                <span className="rph">Someday</span>
                <div>
                  <div className="rtitle">Designer handoff</div>
                  <p className="rdesc">
                    Shared annotation sessions so designers can point at the
                    running prototype without touching code
                  </p>
                </div>
              </div>
            </div>

            <div className="docs-callout">
              <div className="docs-callout-text">
                Want the full technical details?
                <br />
                <strong>Full docs are in progress</strong> — check back soon.
              </div>
              {docsReady ? (
                <a
                  href={PIXELAGENT_DOCS_URL}
                  className="docs-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pixelagent docs
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 9L9 2M9 2H4M9 2v5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <span className="docs-link docs-link--pending" aria-disabled="true">
                  docs coming soon
                </span>
              )}
            </div>
          </section>
        </main>
      </div>

      <footer>
        <span className="fl">PixelAgent · May 2026</span>
        <nav className="flinks" aria-label="Footer">
          <a
            href={GITHUB_PIXELAGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </footer>
    </>
  );
}
