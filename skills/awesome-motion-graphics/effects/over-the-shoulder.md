---
name: over-the-shoulder
summary: Camera pushes over one shoulder for a BEFORE card, swings to the other for AFTER, settles back
source: frame-15
needs: [mask, behind-me]
duration: 3s
tags: [camera, data]
---

## Inputs
- `[BEFORE_NUMBER]`, `[AFTER_NUMBER]` (real)

## Build
- Two cards just above shoulder line, one per side, drawn behind the person. Small label (BEFORE / AFTER), big bold white number.
- Card: dark glass, rounded, white border ~20%, backdrop blur, soft shadow. Pop in: scale 0.8→1 + fade.
- Cards are attached to the footage; the camera scales/slides the whole shot and must always cover the frame (no black edges).
- Motion blur proportional to camera speed, zero on holds. Focused card stays inside x 120–960.

## Timing (90 frames)
| Frames | Camera | Cards |
|---|---|---|
| 0–5 | Centred, 1.0× | |
| 5–20 | Slide left, push to 1.3× over left shoulder | BEFORE pops at 10 |
| 20–27 | Hold with tiny drift | |
| 27–36 | Out to 1.12×, slide back across | |
| 36–46 | Push to 1.3× over right shoulder | AFTER pops at 40 |
| 46–55 | Hold | |
| 55–70 | Settle to centre, 1.0× | |
