---
name: scribble
summary: Marker doodles draw themselves around you: a loop round your head, an arrow, a label and sparkle crosses
source: vibha-51
needs: [head-track]
duration: 2.5s
tags: [hand-drawn]
---

## Inputs
- `[LABEL]` (default `me!`), `[COLOR]` (default marker yellow `#FFD60A`)

## Build
- Marker stroke ~0.8% width, round joints.
- A wobbly ellipse loop around the head (rx 1.0, ry 1.3 face widths, slight sine wobble) that overshoots its start by 8%, like a real hand.
- A curved arrow from the label (upper right of the head) to the loop.
- Three small `+` sparkles around the head.
- The label in a handwritten font, tilted 8°.

## Timing (75 frames)
| Frames | What |
|---|---|
| 0–15 | Loop draws (ease-in-out) |
| 13–24 | Arrow draws, then the head |
| 21–30 | Label pops (back) |
| 24–33 | Sparkles pop, 3 frames apart |
| 69–75 | Fade |
