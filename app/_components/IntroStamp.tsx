"use client";

import { useEffect, useState } from "react";

function formatStamp() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const place = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
  return `${time} · ${place}`;
}

export default function IntroStamp() {
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    setStamp(formatStamp());
  }, []);

  return (
    <p className="garage-intro-meta" aria-live="polite">
      {stamp ?? "…"}
    </p>
  );
}
