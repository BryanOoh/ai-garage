const clipboard = `# PixelAgent Annotations (1)
---
### 1. \`button.hero-cta\`
- **note:** Increase font size to 16px
- **text:** Get started
- **source:** \`components/Hero.tsx:42\``;

const oneLine =
  'button.hero-cta | text:"Get started" | src:Hero.tsx:42 | "Increase font size"';

export default function AnnotationSamples() {
  return (
    <div className="out">
      <figure className="out-card">
        <figcaption className="out-card-hdr">copied to clipboard</figcaption>
        <pre className="out-body">{clipboard}</pre>
      </figure>
      <figure className="out-card">
        <figcaption className="out-card-hdr">or, in one line</figcaption>
        <pre className="out-body">{oneLine}</pre>
      </figure>
    </div>
  );
}
