---
name: locked-on
summary: Corner brackets snap onto your face, a LOCKED ON tag appears and the camera follows you
source: vibha-51
needs: [head-track]
duration: 2.5s
tags: [camera, ui]
---

## Inputs
- `[TAG]` (default `LOCKED ON`), `[ZOOM]` (default 1.35, max 2)

## Build
- The camera follows the face: zoom toward the head and keep it at ~40% frame height, smoothed track.
- Four white L-brackets (arm = 32% of box, ~5 px stroke, soft shadow) around a box ~1.7 × face width, 1.25:1 tall.
- Mono uppercase tag in a white pill, centred under the box.

## Timing (75 frames)
| Frames | What |
|---|---|
| 0–18 | Zoom 1→`[ZOOM]` (ease-out) |
| 0–7 | Brackets snap in from 1.6× size to fit (ease-out), fade in over 4 |
| 5–9 | Tag fades in |
| 69–75 | Brackets + tag fade |
