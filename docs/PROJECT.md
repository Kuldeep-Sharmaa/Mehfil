# Mehfil

## Overview

Mehfil is an experimental frontend project centered on illustrated scenes, ambient audio, and restrained motion design. The goal is an interface that feels alive without becoming decorative — the artwork drives the experience, and the UI is kept deliberately thin.

The first scene, **महफ़िल**, depicts a group of friends on a rooftop at night, styled with a nostalgic, 90s-inspired visual language.

## Scope — V1

- Single scene: **महफ़िल**
- Playlist-based playback (YouTube), custom controls (play/pause, progress, mute, next/prev)
- Local time display with a quiet time-of-day greeting
- Ambient motion (light, atmosphere, minor environmental movement, faint particles) — no character animation
- Responsive layout across desktop, tablet, and mobile (portrait + landscape)
- `Change Vibe` present in UI as a disabled/future affordance only — not wired to any real switching logic yet

## Explicitly Out of Scope

These are deferred, not forgotten — flagging them now avoids scope creep and half-built features:

- Additional scenes / vibe switching
- Backend, auth, or persistence layer
- Real-time presence or user counts
- Liked tracks, saved queues, or any user-specific persistence
- Any placeholder data presented as if it were live (e.g. fake "active users")

## Stack

React, Vite, YouTube IFrame Player API, vanilla CSS. No animation or state-management libraries unless a concrete requirement can't be met natively — this gets reassessed per feature, not assumed upfront.
