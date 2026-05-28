"use client";

import { useEffect, useState } from "react";
import { pixelagentSections } from "@/lib/site";

const SCROLL_OFFSET = 120;

export default function MobileToc() {
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
    <nav className="mobile-toc" aria-label="Page sections">
      {pixelagentSections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`mobile-toc-link${active === id ? " active" : ""}`}
          aria-current={active === id ? "location" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
