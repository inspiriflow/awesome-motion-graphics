---
name: text-path
summary: A line of text flows along the outline of your head and shoulders, behind you
source: frame-15
needs: [mask, behind-me]
duration: 3s
tags: [text, tracking]
---

## Inputs
- `[TEXT]`, repeated with ` • ` separators

## Path
- Per frame, trace the silhouette's outer edge from the mask: left shoulder → over head → right shoulder.
- Offset ~65 px outward. Smooth spatially (neighbour averaging) and temporally (±5 frames) so it moves ≤1–2 px/frame. Hold steady across jump cuts.

## Text
- Medium-bold sans, white 90%, ~46 px, even spacing, each glyph rotated to the tangent.
- Scrolls ~150 px/s along the path. Frames 0–20: writes on from the left end, each letter fading and sliding in.
- Both ends fade over the last 80 px. Drawn behind the person.
