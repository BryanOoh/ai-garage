import SiteHeader from "../_components/SiteHeader";
import SidebarNav from "./_components/SidebarNav";
import MobileToc from "./_components/MobileToc";
import AnnotationSamples from "./_components/AnnotationSamples";
import SectionLock from "./_components/SectionLock";
import SetupCodeBlocks from "./_components/SetupCodeBlocks";
import TryItPixelAgent from "./_components/TryItPixelAgent";
import { hasPixelagentFullAccess } from "@/lib/pixelagent-access";

export default async function PixelAgentPage() {
  const fullAccess = await hasPixelagentFullAccess();

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
                I&apos;ll notice when padding is off by 2px, or when
                a button sits just a little too far to the right.
                But actually fixing it still means describing the
                entire component to the model, then cleaning up all
                the parts of the diff that shifted when they
                weren&apos;t supposed to.
              </p>
              <p>
                After a while I started wondering what it would feel
                like to just <em>point</em> at the thing. No setup,
                no back-and-forth, nothing breaking around it.
              </p>
              <p>
                PixelAgent is my fix. Click the element, tweak it, hit apply. Done.
              </p>
            </div>

            <figure className="hero-demo">
              <video
                className="hero-demo-video"
                src="/pixelagent-demo.mp4"
                poster="/pixelagent-demo-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="PixelAgent demo: clicking an element, tweaking it in a side panel, and applying the change."
              />
            </figure>
          </section>

          <section id="try" className="try-demo-wrap">
            <div className="try-demo">
              <TryItPixelAgent />
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
                  Figma-like panel for spacing, color, type, border, opacity.
                  Preview hover/focus/active states. Tweaks stay local until
                  you hit Apply — then one structured diff, one agent call.
                </p>
              </div>
            </div>
          </section>

          <SectionLock
            id="how"
            kicker="Under the hood"
            title={
              <>
                Why <em>live DOM</em>, not screenshots
              </>
            }
            unlocked
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
                <span className="spec-key">source mapping</span>
                <span className="spec-val">
                  <strong>exact file:line</strong> with the dev plugin — a good
                  guess without it
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-key">local</span>
                <span className="spec-val">
                  runs on your machine — nothing leaves it
                </span>
              </div>
            </div>
          </SectionLock>

          <SectionLock
            id="output"
            kicker="Annotation output"
            title={
              <>
                What it actually <em>sends</em>
              </>
            }
            unlocked
          >
            <p>
              It captures the context for you — selector, visible text, source
              line — as one block of plain markdown.
            </p>

            <AnnotationSamples />

            <p className="utility-text-sm">Plain markdown. No API key. Paste anywhere.</p>
          </SectionLock>

          <SectionLock
            id="install"
            kicker="Setup"
            title={
              <>
                One line <em>to start</em>
              </>
            }
            unlocked
          >
            <p>
              No browser extension, no Web Store, no separate app. It ships
              with your project. It&apos;s in beta and still moving fast — but
              the commands below work today.
            </p>

            <SetupCodeBlocks />

            <p className="utility-text-sm utility-mt-xs">
              The <code>npx pixelagent setup</code> step detects Claude Code or
              Cursor and writes the MCP config automatically. Skip it and
              annotation mode still works — you just paste manually.
            </p>
          </SectionLock>

          <section id="closing">
            <div className="sec-lbl">Closing thoughts</div>
            <h2>
              With an agent, pointing <em>says more</em> than words.
            </h2>

            <p>
              &ldquo;The button on the right.&rdquo; &ldquo;A little more
              padding.&rdquo; Words like these make the agent guess — and guess
              wrong. But hand it the actual element, selector and source line
              attached, and the conversation changes. Less back-and-forth. Less
              talking past each other.
            </p>
            <p>
              Once I could point instead of narrate, things just worked.
            </p>
            <p>
              If you&apos;d rather tweak your own UI than prompt your way through
              it — this might be the thing that makes that feel possible.
            </p>
          </section>
        </main>
      </div>

      <footer>
        <span className="fl">PixelAgent · May 2026</span>
      </footer>
    </>
  );
}
