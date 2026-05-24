"use client";

import { useEffect, useState } from "react";

type StampParts = { time: string; place: string; iso: string };

function formatParts(date: Date): StampParts {
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const place = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.replace(/_/g, " ");
  return { time, place, iso: date.toISOString() };
}

function msUntilNextMinute(from: Date) {
  return (60 - from.getSeconds()) * 1000 - from.getMilliseconds();
}

export default function IntroStamp() {
  const [parts, setParts] = useState<StampParts | null>(null);
  const [timeTick, setTimeTick] = useState(0);

  useEffect(() => {
    const tick = () => {
      setParts(formatParts(new Date()));
      setTimeTick((n) => n + 1);
    };

    tick();

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      tick();
      intervalId = setInterval(tick, 60_000);
    }, msUntilNextMinute(new Date()));

    return () => {
      clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="garage-intro-meta" aria-live="polite">
      {parts ? (
        <time dateTime={parts.iso} className="intro-stamp">
          <span key={timeTick} className="intro-stamp-time">
            {parts.time}
          </span>
          <span className="intro-stamp-sep" aria-hidden="true">
            ·
          </span>
          <span className="intro-stamp-place">{parts.place}</span>
        </time>
      ) : (
        <span className="intro-stamp-placeholder" aria-hidden="true">
          ···
        </span>
      )}
    </p>
  );
}
