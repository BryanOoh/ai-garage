import CopyButton from "./CopyButton";

const INSTALL_CMD = `npm install pixelagent`;
const LAYOUT_CMD = `import { PixelAgent } from "pixelagent"\n\n// add anywhere in your layout — auto-excluded from prod\n{process.env.NODE_ENV !== "production" && <PixelAgent />}`;

export default function SetupCodeBlocks() {
  return (
    <>
      <p className="utility-text-sm">Install the package</p>
      <div className="cb">
        <div className="cb-hdr">
          <span className="cb-lbl">terminal</span>
          <CopyButton text={INSTALL_CMD} label="install" />
        </div>
        <div className="cb-body">
          <span className="kw">npm</span>{" "}
          <span className="cmd">install</span>{" "}
          <span className="cmd">pixelagent</span>
        </div>
      </div>

      <p className="utility-text-sm utility-mt-lg">Add to your app</p>
      <div className="cb">
        <div className="cb-hdr">
          <span className="cb-lbl">layout.tsx</span>
          <CopyButton text={LAYOUT_CMD} label="layout snippet" />
        </div>
        <div className="cb-body">
          <span className="kw">import</span>{" "}
          <span className="op">{"{"}</span>{" "}
          <span className="comp">PixelAgent</span>{" "}
          <span className="op">{"}"}</span>{" "}
          <span className="kw">from</span>{" "}
          <span className="st">&quot;pixelagent&quot;</span>
          <br />
          <br />
          <span className="cm">
            {"// add anywhere in your layout — auto-excluded from prod"}
          </span>
          <br />
          <span className="op">{"{"}</span>
          <span className="plain">process.env.</span>
          <span className="prop">NODE_ENV</span>{" "}
          <span className="op">!==</span>{" "}
          <span className="st">&quot;production&quot;</span>{" "}
          <span className="kw">&amp;&amp;</span>{" "}
          <span className="op">&lt;</span>
          <span className="comp">PixelAgent</span>{" "}
          <span className="op">/&gt;</span>
          <span className="op">{"}"}</span>
        </div>
      </div>

      <p className="utility-text-sm utility-mt-xs">
        Styles inject automatically — no{" "}
        <code>import &quot;pixelagent/style.css&quot;</code> needed.
      </p>
    </>
  );
}
