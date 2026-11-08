---
name: stamp
summary: A big red rubber stamp slams onto the screen and shakes the frame
source: vibha-51
needs: [head-track]
duration: 2s
tags: [text, impact]
---

## Inputs
- `[WORD]` (default `REJECTED`), `[COLOR]` (default `#D62828`), `[ANGLE]` (default 12°)

## Build
- Heavy sans uppercase word, fitted to 62% width, inside a thick rounded border in the same red.
- Ink texture: multiply the alpha by random noise (0.55–1.6, clamped) so it looks stamped, not printed.
- Placed below the face (~2.7 face widths down), max y 85%. Never on the face.

## Timing (60 frames)
| Frames | What |
|---|---|
| 0–5 | Scale 2.3→1 (accelerating) while fading in |
| 5–14 | Camera shake, decaying from ±1.2% width |
| 54–60 | Fade |
