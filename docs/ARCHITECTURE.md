# Mehfil — Architecture

## Overview

Mehfil is a client-side React application. V1 has no backend, authentication, database, or external API — all state is transient and lives in memory for the session.

The architecture keeps scene rendering, UI controls, and audio state as separate concerns. This is deliberate: scene animation (layering, motion, future audio-reactivity) is expected to change independently of player UI, and coupling them early would make that work more invasive than it needs to be.

## Application Structure

```text
App
├── Scene
│   └── MehfilScene
│
├── UI Overlay
│   ├── EntryGate
│   ├── Clock
│   ├── MusicPlayer
│   └── ChangeVibe
│
└── Audio State
    └── useAudio
```

### `App`

Owns page composition and wires the scene to the UI overlay. No scene or audio logic lives here — if `App` starts accumulating either, that's a signal something needs to move down a level.

### `MehfilScene`

Renders the current artwork and its visual layers. V1 ships as a single flat image; the component boundary is designed so layered/animated assets can be introduced later without touching the page-level structure.

### `EntryGate`

Captures the first user interaction, which is required to unlock audio playback under browser autoplay policy. Doubles as the "entering the scene" moment from a UX standpoint.

### `MusicPlayer`

Minimal playback surface: play/pause, progress, mute. Controls audio state; has no reference to or awareness of the scene.

### `Clock`

Local device time display. Purely informational, no dependency on audio state.

### `ChangeVibe`

Placeholder for future scene-switching. In V1 it renders as a disabled/future affordance with no switching logic behind it — not wired to `MehfilScene` in any way yet.

### `useAudio`

Single source of truth for audio state and browser audio interaction.

```text
playing
currentTime
duration
muted
```

Exposes only what UI and (eventually) scene effects need — not a raw wrapper around the `<audio>` element.

## Data Flow

```text
User interaction → UI component → Audio state → HTML5 Audio
```

Scene rendering is independent of this path:

```text
Scene data → MehfilScene → Visual output
```

Future audio-reactive effects extend the existing state rather than introducing a new channel:

```text
Audio state → Scene animation state → Visual effect
```

UI components do not reach into scene elements directly, and the scene does not read audio state directly in V1 — any future coupling goes through explicit shared state, not direct references.

## Asset Structure

```text
public/
├── images/
│   └── mehfil/
│       └── mehfil-main.png
└── music/
```

Current artwork is a single flat asset. If future animation requires isolated layers (glow sources, foreground elements, etc.), add them as separate image assets rather than restructuring around per-character decomposition — the people in the scene are not expected to be individually animated.

## Implementation Principles

- One responsibility per component.
- Scene rendering stays decoupled from player controls.
- Audio state lives in one hook, not scattered across components.
- Native React state and browser APIs over state-management libraries, until there's a concrete reason otherwise.
- CSS/native JS animation before reaching for an animation library.
- No backend infrastructure in V1.
- No speculative abstraction — build for the requirement in front of you, not the one you're imagining.
