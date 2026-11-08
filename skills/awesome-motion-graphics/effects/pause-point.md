---
name: pause-point
summary: The frame freezes, a pause icon appears and a hand-drawn arrow points at you with a label
source: vibha-51
needs: [head-track]
duration: 2s
tags: [hand-drawn, camera]
---

## Inputs
- `[LABEL]` (default `look here`), `[COLOR]` (default marker yellow `#FFD60A`), label x position

## Build
- Freeze on the first frame of the window. Slow push 1→1.06 toward the face, and desaturate 8%.
- A pause icon top-left (dark translucent rounded square with two white bars).
- Label in a marker/handwritten font, tilted −6°, upper right above the head.
- A curved marker arrow (quadratic bend) from under the label to just above/beside the face. It draws itself, and the arrowhead appears when the stroke completes.

## Timing (60 frames)
| Frames | What |
|---|---|
| 0–9 | Label pops (0.7→1, back) |
| 5–17 | Arrow draws (ease-out), then the head appears |
