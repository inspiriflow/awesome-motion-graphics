---
name: dot-reveal
summary: Your shot builds itself out of glowing dots, then snaps into the full picture
source: vibha-51
needs: []
duration: 2.5s
tags: [transition, intro]
---

## Inputs
- `[COLOR]` dot tint (default `#FF8050`), `[CELL]` (dot grid, default 1.7% width), background (default near-black)

## Build
- Halftone: downsample the frame to a grid of cells. Each cell is a dot whose radius grows with brightness (18–50% of the cell).
- Each dot switches on at a random threshold as progress rises, so the image assembles from scattered dots. Dots twinkle ±25%.
- Dot colour: first the tint (scaled by brightness), then it crossfades to the real pixel colour (from 30% to 65% progress).
- From 60% to 100%: crossfade the dot image into the real video (ease-in-out).

## Timing (75 frames)
Progress runs linearly across the window, and every phase above is a fraction of it.
