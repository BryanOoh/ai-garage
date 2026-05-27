'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'pixelagent/style.css';

// PixelAgent uses window/document on mount, so it must be client-only.
const PixelAgent = dynamic(
  () => import('pixelagent').then((m) => m.PixelAgent),
  { ssr: false }
);

export default function TryItPixelAgent() {
  const [on, setOn] = useState(false);

  return (
    <div className="try-it-wrap">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="btn-glass"
        aria-pressed={on}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 1c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7z" />
        </svg>
        {on ? 'Close toolbar' : 'Play with it'}
      </button>
      {on && (
        <p className="try-it-hint" role="status">
          Tip: switch to Edit mode, click any element, tweak styles, hit Apply
        </p>
      )}
      {/* runtimeStateStyles: there's no Vite dev server in production, so
          Apply lives in the DOM (inline + injected <style>) instead of
          patching source. Edits reset on reload — that's the trade-off. */}
      {on && <PixelAgent runtimeStateStyles />}
    </div>
  );
}
