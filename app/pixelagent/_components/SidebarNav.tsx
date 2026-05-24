"use client";

import { useEffect, useState } from "react";
import { pixelagentSections } from "@/lib/site";

const SCROLL_OFFSET = 120;

export default function SidebarNav() {
  const [active, setActive] = useState<string>(pixelagentSections[0].id);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (!sections.length) return;

    const updateActive = () => {
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = section.id;
        }
      }
      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <aside className="sidebar" aria-label="Documentation">
      <div className="sb-group">
        <div className="sb-lbl">PixelAgent</div>
        {pixelagentSections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`sb-link${active === id ? " active" : ""}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="sb-group">
        <div className="sb-lbl">All Projects</div>
        <span className="sb-proj current" aria-current="page">
          <span className="pdot pdot-on" aria-hidden="true" />
          PixelAgent
        </span>
        <span className="sb-proj sb-proj--muted">
          <span className="pdot pdot-off" aria-hidden="true" />
          Coming soon
        </span>
      </div>
    </aside>
  );
}
