'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'pixelagent/style.css';
import PixelAgentLogo from './PixelAgentLogo';

// PixelAgent uses window/document on mount, so it must be client-only.
const PixelAgent = dynamic(
  () => import('pixelagent').then((m) => m.PixelAgent),
  { ssr: false }
);

export default function TryItPixelAgent() {
  const [on, setOn] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="btn-glass"
        aria-pressed={on}
      >
        <PixelAgentLogo size={14} />
        {on ? 'Close toolbar' : 'Try it'}
      </button>
      {on && <PixelAgent />}
    </>
  );
}
