import "./AmbientParticles.css";

/**
 * AmbientParticles - Faint warm embers drifting upward, echoing the
 * lantern/bulb light in the scene. Pure CSS animation (no JS ticking),
 * kept very sparse and low-opacity so it reads as "alive", not "busy".
 */
const PARTICLE_COUNT = 6;

export function AmbientParticles() {
  return (
    <div className="ambient-particles" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <span key={i} className={`ember ember-${i + 1}`} />
      ))}
    </div>
  );
}
