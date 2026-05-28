'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// PixelAgent uses window/document on mount, so it must be client-only.
// Styles auto-inject on import (pixelagent 0.1.22+) — no CSS import needed.
const PixelAgent = dynamic(
  () => import('pixelagent').then((m) => m.PixelAgent),
  { ssr: false }
);

export default function TryItPixelAgent() {
  const [on, setOn] = useState(false);

  return (
    <>
      <div className="try-demo-label">
        <span className="sbdot" aria-hidden="true" />
        Live demo · right here
      </div>

      <p className="try-demo-copy">
        Hit <strong>Play</strong> and PixelAgent drops onto the page. Switch to{' '}
        <strong>Edit</strong>, click anything, and tweak it — spacing, color,
        type. Then hit <strong>Apply</strong> and watch the change land.
      </p>

      <div className="try-demo-actions">
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
          <span className="try-demo-note" role="status">
            Tip: go wild — it&apos;s just a preview, so reload to reset.
          </span>
        )}
      </div>

      {/* runtimeStateStyles: there's no Vite dev server in production, so
          Apply lives in the DOM (inline + injected <style>) instead of
          patching source. */}
      {on && <PixelAgent runtimeStateStyles />}
    </>
  );
}
