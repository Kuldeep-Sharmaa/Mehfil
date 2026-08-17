import { useState, useEffect, useRef } from "react";
import "./Presenceindicator.css";

const MIN_COUNT = 4;
const MAX_COUNT = 97;

// 1–10 minutes between updates, randomized each time — never a fixed
// tick, so it doesn't read as mechanical.
const MIN_DELAY_MS = 60 * 1000;
const MAX_DELAY_MS = 10 * 60 * 1000;

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value) {
  return Math.min(MAX_COUNT, Math.max(MIN_COUNT, value));
}

function nextDelta() {
  const roll = Math.random();
  if (roll < 0.25) return 0;
  if (roll < 0.85) return randomBetween(-1, 1) || 1; // ±1, never 0 here
  return randomBetween(-2, 2); // occasional slightly bigger nudge
}

export function PresenceIndicator() {
  const [count, setCount] = useState(() => randomBetween(14, 38));
  const timeoutRef = useRef(null);

  useEffect(() => {
    function scheduleNext() {
      const delay = randomBetween(MIN_DELAY_MS, MAX_DELAY_MS);
      timeoutRef.current = setTimeout(() => {
        setCount((prev) => clamp(prev + nextDelta()));
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="presence-indicator">
      <span className="presence-dot" aria-hidden="true" />
      <span className="presence-text">
        <strong>{count}</strong> in the mehfil
      </span>
    </div>
  );
}
