import type { ReactNode } from "react";

export default function SectionLock({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="sec-lbl">{kicker}</div>
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}
