import type { ReactNode } from "react";

const lockIcon = (
  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path
      d="M2.5 4.5V3a2.5 2.5 0 0 1 5 0v1.5M2 4.5h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SectionLock({
  id,
  kicker,
  title,
  unlocked,
  children,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  unlocked: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={unlocked ? undefined : "pa-section pa-section--locked"}
      aria-labelledby={`${id}-heading`}
    >
      <div className="sec-lbl">{kicker}</div>
      <h2 id={`${id}-heading`}>{title}</h2>
      {unlocked ? (
        children
      ) : (
        <div className="pa-lock-panel" role="status">
          <span className="pa-lock-chip">
            {lockIcon}
            Coming soon
          </span>
          <p className="pa-lock-text">
            This section is still in progress. Follow on GitHub for updates.
          </p>
        </div>
      )}
    </section>
  );
}
