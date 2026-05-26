import SiteHeader from "../_components/SiteHeader";
import SidebarNav from "./_components/SidebarNav";
import MobileToc from "./_components/MobileToc";
import AnnotationSamples from "./_components/AnnotationSamples";
import SectionLock from "./_components/SectionLock";
import SetupCodeBlocks from "./_components/SetupCodeBlocks";
import TryItPixelAgent from "./_components/TryItPixelAgent";
import { hasPixelagentFullAccess } from "@/lib/pixelagent-access";
import {
  GITHUB_PIXELAGENT_URL,
  PIXELAGENT_DOCS_URL,
} from "@/lib/site";

export default async function PixelAgentPage() {
  const fullAccess = await hasPixelagentFullAccess();
  const docsReady = PIXELAGENT_DOCS_URL.length > 0;

  return (
    <>
      <SiteHeader homeHref="/" homeLabel="AI Garage" />

      <MobileToc fullAccess={fullAccess} />

      <div className="layout">
        <SidebarNav fullAccess={fullAccess} />

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
                Most of my vibe coding edits are small. Move a button
                4px. Tighten one padding. Change one color. But to
                make that one small edit, I have to describe the
                whole component it lives in, and then we go back and
                forth three rounds deep before the agent touches the
                right line. I spend more breath narrating the change
                than it would take to point at it.
              </p>
              <p>
                Worse, half the time the diff bleeds outside my
                actual ask. Adjacent margins shift. A sibling
                component reflows. One tiny <em>visual</em> tweak
                turns into a layout regression I have to chase down.
              </p>
              <p>
                PixelAgent is my fix. Click the element, tweak it, hit apply. Done.
              </p>
            </div>

            <div className="actions">
              <TryItPixelAgent />
              <a
                href="#install"
                className={`btn-g${fullAccess ? "" : " btn-g--locked"}`}
                aria-disabled={fullAccess ? undefined : true}
              >
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
                {fullAccess ? "Install (preview)" : "Install (coming soon)"}
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

          <SectionLock
            id="install"
            kicker="Setup"
            title={
              <>
                Two lines <em>to start</em>
              </>
            }
            unlocked={fullAccess}
          >
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
          </SectionLock>

          <SectionLock
            id="output"
            kicker="Annotation output"
            title={
              <>
                Choose how much <em>context to send</em>
              </>
            }
            unlocked={fullAccess}
          >
            <p>
              Compact for a quick copy fix. Forensic when you&apos;re chasing a
              computed style bug.
            </p>

            <AnnotationSamples />

            <p className="utility-text-sm">Plain markdown. No API key. Paste anywhere.</p>
          </SectionLock>

          <SectionLock
            id="how"
            kicker="Under the hood"
            title={
              <>
                Why <em>live DOM</em>, not screenshots
              </>
            }
            unlocked={fullAccess}
          >
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
          </SectionLock>

          <SectionLock
            id="roadmap"
            kicker="What's next"
            title={
              <>
                Still <em>building</em>
              </>
            }
            unlocked={fullAccess}
          >
            <div className="rmap">
              <div className="ritem">
                <span className="rph rph-on">Now</span>
                <div>
                  <div className="rtitle">MVP — annotation</div>
                  <p className="rdesc">
                    Click, text-select, area-select · 4 verbosity levels
                  </p>
                </div>
              </div>
              <div className="ritem">
                <span className="rph">Soon</span>
                <div>
                  <div className="rtitle">Edit panel</div>
                  <p className="rdesc">
                    Spacing / color / border · Tailwind + inline · This / All
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
          </SectionLock>
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
