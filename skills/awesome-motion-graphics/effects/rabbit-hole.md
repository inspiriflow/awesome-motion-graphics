---
name: rabbit-hole
summary: The room tunnels into itself, frame inside frame, spinning, while you stay in front
source: vibha-51
needs: [mask, head-track]
duration: 3s
tags: [camera, depth, transition]
---

## Inputs
- `[RATIO]` (each frame's scale, default 0.62), `[SPEED]` (default 0.8 loops/s), `[SPIN]` (deg per level, default 10)

## Build
- Droste: draw up to 6 nested copies of the frame, each scaled by `RATIO^level` and rotated `level × SPIN` around the face centre. Each copy has a thin white border (~0.8% width).
- Animate the level offset continuously (`level − z`, z = time·speed mod 1) so it endlessly zooms inward.
- Composite the original person (via mask) on top so you stay in front of the tunnel.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–12 | Effect strength 0→1 (ease-out) |
| 81–90 | Back to 0 |
