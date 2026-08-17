import { useState, useEffect } from "react";
import "./Clock.css";

/**
 * Clock - Displays the local device time, with a quiet time-of-day
 * greeting underneath. Purely informational, updates every minute.
 */
export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const greeting = getGreeting(time.getHours());

  return (
    <div className="clock">
      <time dateTime={time.toISOString()}>{formattedTime}</time>
      <span className="clock-greeting">{greeting}</span>
    </div>
  );
}

function getGreeting(hour) {
  if (hour < 5) return "Late night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}
