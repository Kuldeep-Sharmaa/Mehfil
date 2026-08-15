# Mehfil — Roadmap

## Build Order

### Phase 1 — Static Scene

- Strip the Vite starter boilerplate
- Integrate the Mehfil artwork as the full-screen scene
- Build the minimal UI overlay (structure only, no interaction wired yet)
- Add local time display
- Get the composition responsive across desktop and mobile, including focal-zone integrity on narrow viewports

**Exit criteria:** the scene reads correctly at every breakpoint with no audio or animation in place. Visual composition is validated before any interaction logic is introduced.

### Phase 2 — Music

- Add the Mehfil track
- Implement the entry gate (first interaction unlocks playback, per browser autoplay policy)
- Wire play/pause, progress, mute/unmute to `useAudio`
- Handle playback failure states (blocked autoplay, load errors, missing source)

**Exit criteria:** scene and audio function as a single experience — not two features bolted together.

### Phase 3 — Ambient Motion

- Light/glow animation on discrete sources (bulb, lantern)
- Minimal atmospheric particles
- Subtle environmental movement (e.g. plant sway)
- Parallax on desktop only, treated as optional
- Characters remain fully static — no exceptions here

**Exit criteria:** motion is felt, not noticed. If a first-time viewer can immediately point to what's animating, it's overtuned — dial it back.

### Phase 4 — Polish & QA

- UI placement, typography, spacing pass
- Animation timing tuned against Phase 3 exit criteria
- Cross-device testing: desktop, mobile portrait, mobile landscape
- Audio behavior verified on mobile Safari and Chrome specifically (autoplay/gate edge cases live here)
- Performance and overflow check under real conditions, not just dev viewport

**Exit criteria:** nothing in the experience feels unfinished, delayed, or accidental.

## Deferred (Not Committed)

Explicitly out of the build order above. Each of these implies its own design and architecture work and should not be started opportunistically mid-phase:

- Multiple scenes / vibes
- `Change Vibe` real switching logic
- Per-scene music
- Layered/decomposed artwork for deeper animation
- Audio-reactive visual effects
- Real-time presence
- Additional interactive elements

Anything from this list only gets picked up once it has a clear rationale tied to the experience — not because it's technically interesting to build.
