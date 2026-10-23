"use client";

import { useEffect, useState } from "react";

export function AnimatedNumber({
  value,
  suffix = "",
  shouldReduceMotion,
}: {
  value: number;
  suffix?: string;
  shouldReduceMotion: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let frame = 0;
    const duration = 800;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.round(progress * value));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion, value]);

  const shownValue = shouldReduceMotion ? value : displayValue;

  return (
    <span aria-label={`${value}${suffix}`} className="text-4xl font-semibold text-zinc-900">
      {shownValue}
      {suffix}
    </span>
  );
}
