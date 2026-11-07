---
name: text-3d
summary: A solid 3D word stands on the desk in front of you like a real object
source: frame-15
needs: []
duration: 3s
tags: [3d, text]
---

## Inputs
- `[WORD]`

## Build
- Placed at chest height below the face, inside x 120–960, on an invisible desk.
- Prefer `@remotion/three` with extruded text; fallback: ~56 stacked copies stepping back/up toward a vanishing point above frame.
- Camera looks slightly down: letter tops visible, sides converge.
- Fronts matte warm off-white `#F2EEE6` — no gradients, bevels, outlines, shine. Sides same hue, 30–60% darker toward the back. Must read as an object, never WordArt.
- Soft blurred contact shadow ~35%. Grain matched to the clip.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–30 | Letters rise from below, 3 frames apart, ~2.5% overshoot on landing |
| 30–90 | Hold with dolly 1.0→1.04; word moves slightly more than background (parallax) |
