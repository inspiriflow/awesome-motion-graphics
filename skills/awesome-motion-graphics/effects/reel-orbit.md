---
name: reel-orbit
summary: Your top reel covers orbit your head in 3D, each with its real view count
source: frame-15
needs: [mask, head-track, behind-me, reels]
duration: 3s
tags: [3d, orbit]
---

## Inputs
- `[REEL_COUNT]` covers in `public/covers/1.jpg…` (1 = best), `[VIEW_COUNTS]` (real)

## Build
- Cards: vertical rounded covers, small dark views pill.
- Orbit: true 3D ellipse at eye line, perspective camera, front tilted down; follows smoothed head track.
- Cards face camera, lean ≤7° into the turn, ~1.5× at front, smaller at back.
- Layers: background → back half → person (mask) → front half. Switch layers only beside the head. Never cross the face; inside x 120–960.
- Back cards defocus ≤2.6 px, ~64% brightness; front sharp. Motion blur along travel by speed.
- Integration: person's soft shadow on cards just behind; front cards shadow onto shirt; a glint slides across each card as it passes the front.

## Motion
Cards resolve one after another (fast ease-out, slight scale-up, focus pull) while the ring spins up, softly overshoots and settles to a steady turn — still moving at the end. Slow 3.5% push underneath. Best reel crosses the chest around the midpoint.
