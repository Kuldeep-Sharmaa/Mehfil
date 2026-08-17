## Structure

No backend - playback runs entirely on the YouTube IFrame Player API, state lives in a single `useYouTubePlayer` hook.

```text
App
├── MehfilScene        — background art
├── Clock               — time + greeting
├── MusicPlayer         — playback UI (talks to useYouTubePlayer)
├── ChangeVibe          — disabled placeholder for future scenes
└── AmbientParticles    — decorative, no state
```

Scene and player don't know about each other - kept separate so the art can change/animate later without touching player logic, and vice versa.
