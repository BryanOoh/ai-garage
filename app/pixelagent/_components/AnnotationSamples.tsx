const samples: { level: string; active?: boolean; code: string }[] = [
  {
    level: "Compact",
    active: true,
    code: 'button.hero-cta | "Increase font size to 16px"',
  },
  {
    level: "Standard",
    code: 'button.hero-cta | pos:240,580 | text:"Get started" | "Increase font size"',
  },
  {
    level: "Detailed",
    code: 'button.hero-cta | pos:240,580 | bbox:120×40 | parent:section.hero | "Increase font size"',
  },
  {
    level: "Forensic",
    code: 'button.hero-cta | font-size:14px | padding:8px 20px | src:Hero.tsx:42 | "Increase font size"',
  },
];

export default function AnnotationSamples() {
  return (
    <div className="vlist">
      {samples.map((sample) => (
        <div key={sample.level} className="vitem">
          <span className={`vtag${sample.active ? " vtag-on" : ""}`}>
            {sample.level}
          </span>
          <code className="vcode">{sample.code}</code>
        </div>
      ))}
    </div>
  );
}
