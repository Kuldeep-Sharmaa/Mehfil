# Mehfil — Design

## Visual Direction

The experience should read as a quiet, nostalgic night shared with friends — not a polished commercial product. The artwork is the primary visual element; every UI decision is subordinate to it.

If a design choice makes the page feel more like a website and less like a scene, it's the wrong choice.

## Style

- Illustrated / painterly, not photorealistic
- Desi rooftop at night — deep blue tones against warm ambient light sources
- Slight 90s-inspired nostalgia
- Casual and imperfect over polished — hand-drawn feel, not vector-clean
- Atmospheric without becoming busy

Avoid: photorealism, decorative excess, generic AI-art aesthetics (over-saturated, over-detailed, symmetry-obsessed), poster-style composition.

## Typography

Primary heading: **महफ़िल** — visually prominent but not dominant; it should sit as part of the scene composition, not float above it as a website title.

Typeface direction: expressive, slightly imperfect — a brush/hand feel rather than a corporate sans. UI text (time, labels) is the opposite: small, quiet, functional. The contrast between expressive heading and quiet UI text is intentional — it reinforces that the heading belongs to the artwork and the UI doesn't.

## UI

Controls, in order of visual priority:

1. Entry interaction
2. Play / pause
3. Progress
4. Mute / sound
5. Local time
6. `Change Vibe` (future affordance, not yet functional)

Controls sit on top of the artwork, not beside it in a bar/dashboard/panel. No navigation, cards, menus, badges, or ornamental UI chrome — if it doesn't map to a listed control, it doesn't belong on the page.

## Motion

Motion supports atmosphere; it is never the subject.

**Preferred:** slow glow/light shifts, minimal environmental movement (e.g. plant sway), small atmospheric particles, light parallax where appropriate.

**Avoid:** character animation, large-amplitude movement, dense particle effects, fast transitions, motion that runs constantly instead of subtly.

Working heuristic: motion should be felt before it is noticed. If a first-time viewer can identify exactly what's animating within a few seconds of looking, scale it back.

## Responsive Design

The artwork stays the visual priority at every breakpoint — this is not negotiable across screen sizes, only the presentation strategy changes.

- Desktop/tablet: preserve the full composition where possible; use cover-cropping only when it does not remove important elements from the focal area.
- Mobile portrait: if a straight crop of the landscape artwork loses the friend group or the heading, that's a signal for a dedicated portrait composition — not a CSS problem to force through.
- No distortion (stretching/squashing) of the artwork under any circumstance.
- UI controls must never sit over character faces or the heading, at any breakpoint. Reserve safe zones rather than positioning controls ad hoc per screen size.

## Design Principle

The page should feel like entering a scene, not visiting a website.

Every element — visual or interactive — must earn its place. If removing it doesn't hurt the experience, it doesn't belong in the experience.
