---
name: shortcut-rain
summary: Keyboard keycaps rain down and tumble behind you
source: vibha-51
needs: [mask, behind-me]
duration: 3s
tags: [3d, environment]
---

## Inputs
- `[KEYS]` (default `cmd|/|C|V|Z|esc|tab|shift|enter|opt`), `[COUNT]` (default 26)

## Build
- Keycaps: grey base with a lighter top inset (two stacked rounded rects), mono label, soft shadow. Width fits the label, min ~10% frame width.
- Each cap gets a random x (4–96%), start time, fall speed (45–85% of frame height per second, so far caps are slower and smaller), start tilt ±25° and spin ±60°/s.
- All behind the mask.

## Timing
Caps start across the window (minus the last 0.8 s), fall continuously, and fade together over the last 6 frames.
