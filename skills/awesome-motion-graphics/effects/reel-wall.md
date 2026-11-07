---
name: reel-wall
summary: The wall behind you becomes a grid of screens playing your real top reels, you stay in front
source: frame-15
needs: [mask, behind-me, reels]
duration: 3s
tags: [camera, layout, depth]
---

## Inputs
- `[REEL_COUNT]` reels in `public/reels/1.mp4…` (1 = best) with `[VIEW_COUNTS]` (real, rounded down)
- `[COLUMNS]`: 3 or 4

## Build
- Pre-cut ~4 s of action from each reel, downscaled to on-screen size, as frame sequences (so many play at once).
- Solve the back wall's perspective (its corners on screen); everything lies flat on the wall, below the ceiling line.
- Grid of 9:16 screens with small gaps showing real wall. Thin dark bezel, tiny radius, small dark pill with play icon + views. Only the best reel gets accent `#F69963` (pill + hairline edge).
- Person and foreground objects (lamp, chair) stay in front via mask. No hair halo.
- Screens light the room: soft spill on gaps/ceiling/furniture, faint rim on hair and shoulders. Match black level, mild bloom on highlights, same grain.
- Hide any view pill that is partly occluded.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–6 | Screens are dark glass |
| 6–18 | Switch on in a wave radiating from behind the head, each with a short bloom |
| 6→end | Columns scroll like a feed, alternating up/down, slightly different speeds |
| 0→end | Push: wall 1.0→1.03, person 1.0→1.05 (parallax) + slight lateral drift, never stops |
| 44–60 | Best reel comes forward slightly and brightens |
