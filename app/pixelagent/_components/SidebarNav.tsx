"use client";

import { useEffect, useState } from "react";
import LockIcon from "./LockIcon";
import PixelAgentLogo from "./PixelAgentLogo";
import { isPixelagentSectionLocked, pixelagentSections } from "@/lib/site";

const SCROLL_OFFSET = 120;

export default function SidebarNav({ fullAccess }: { fullAccess: boolean }) {
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
        {pixelagentSections.map(({ id, label }) => {
          const locked = !fullAccess && isPixelagentSectionLocked(id);
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`sb-link${active === id ? " active" : ""}${locked ? " sb-link--locked" : ""}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
              {locked && <LockIcon size={9} />}
            </a>
          );
        })}
      </div>

      <div className="sb-group">
        <div className="sb-lbl">All Projects</div>
        <span className="sb-proj current" aria-current="page">
          <PixelAgentLogo size={14} className="sb-brand-mark" />
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
