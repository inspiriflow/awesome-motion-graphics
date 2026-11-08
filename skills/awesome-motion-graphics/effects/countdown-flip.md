---
name: countdown-flip
summary: A 3, 2, 1 split-flap clock above your head
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 3s
tags: [ui, text]
---

## Inputs
- `[FROM]` (default 3)

## Build
- One dark flap tile (~30% × 38% width, rounded), cream bold digit, black hinge line across the middle, big soft shadow.
- Flip: the top half of the old number folds down (height shrinks to 0), then the bottom half of the new number unfolds (0→full).
- Above the head, behind the mask, pulled 40% toward the face's x.

## Timing
Window split evenly per number. Each flip takes 9 frames. Tile pops in 0.7→1 (back) at start, fades at the end.
