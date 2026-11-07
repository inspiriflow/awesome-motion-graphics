---
name: zoom-grid
summary: Camera pulls back to a wall of your own moments, glides one tile across and dives into another
source: frame-15
needs: []
duration: 3s
tags: [camera, layout, transition]
---

## Build
- Grid: 5×5 vertical 9:16 tiles, 16 px gaps, near-black background. Each tile plays talking.mp4 from a different start time spread across the clip.
- Use pre-shrunk copies of the clip for tiles (prevents shimmer). Motion blur on every move.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–12 | Full screen |
| 12–40 | Pull back (in-out) until it's one tile; corners round to 28 px; ends with ~3.3 tiles across |
| 40–60 | Wall glides exactly one tile sideways on a gentle arc, ≤8° perspective turn that straightens on landing |
| 60–80 | Push into the neighbour tile until it fills the frame; keeps playing to end |
