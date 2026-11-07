---
name: text-ring
summary: A ring of text spins around your head in 3D, passing in front and behind
source: frame-15
needs: [mask, head-track, behind-me]
duration: 3s
tags: [3d, text, orbit]
---

## Inputs
- `[TEXT]` (e.g. `EDITED BY CLAUDE • ONE PROMPT •`)

## Build
- True 3D circle, radius ~270 px, at forehead height, centred on the (smoothed) head track.
- Eye-level view, tilted ~15° front-down → ellipse.
- Glyphs face outward, bold sans white ~52 px, laid out by arc length so the phrase closes the loop exactly.
- Back half behind head (BehindMe), front half in front. Far-side letters ~35% opacity, slightly blurred, smaller via perspective. Soft shadow on hair where the front arc passes.
- Frames 0–18: eases up from still to 1 rev / 3 s, continues to end. Motion blur along each glyph's travel.
