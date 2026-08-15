# Mehfil

## Overview

Mehfil is an experimental frontend project centered on illustrated scenes, ambient audio, and restrained motion design. The goal is an interface that feels alive without becoming decorative — the artwork drives the experience, and the UI is kept deliberately thin.

The first scene, **महफ़िल**, depicts a group of friends on a rooftop at night, styled with a nostalgic, 90s-inspired visual language.

## Scope — V1

- Single scene: **महफ़िल**
- Single audio track, custom playback controls (play/pause, progress, mute)
- Local time display
- Gated entry interaction to satisfy browser autoplay restrictions and reinforce the "arriving into the scene" feel
- Ambient motion (light, atmosphere, minor environmental movement) — no character animation
- Responsive layout across desktop, tablet, and mobile (portrait + landscape)
- `Change Vibe` present in UI as a disabled/future affordance only — not wired to any real switching logic yet

## Explicitly Out of Scope

These are deferred, not forgotten — flagging them now avoids scope creep and half-built features:

- Additional scenes / vibe switching
- Backend, auth, or persistence layer
- Real-time presence or user counts
- Playlist or multi-track playback
- Any placeholder data presented as if it were live (e.g. fake "active users")

## Stack

React, Vite, vanilla CSS, HTML5 Audio API. No animation or state-management libraries unless a concrete requirement can't be met natively — this gets reassessed per feature, not assumed upfront.
