---
name: grade
summary: A colour grade fades in, or a before/after slider sweeps across you to reveal it
source: vibha-51
needs: []
duration: 2–4s
tags: [color]
---

## Inputs
- `[GRADE]`: `moody` (darker, softer, teal shadows) | `bw` | `warm` | `cool` | `pop`
- `[MODE]`: `fade` | `swipe`

## Build
- **fade**: crossfade original→graded over 10 frames, plus a 40% vignette. Hold.
- **swipe**: a slightly slanted vertical divider (tilt ≈ 0.22 px per px of height). Right of it is the graded look, left is the original. 3 px bright white edge. A white round handle with `< >` at 62% height. `before` / `after` serif labels in white pills at the bottom corners (y 88%).

## Timing (swipe, 90 frames)
| Frames | What |
|---|---|
| 0–45 | Divider sweeps from right edge to x 10% (ease-in-out) |
| 45–81 | Settles back to x 50% |
