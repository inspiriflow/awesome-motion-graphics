---
name: punch-in
summary: Camera pushes in on your face: a fast punch on one word, a slow cinematic push with the room going soft, or a punch with a two-line headline
source: vibha-51
needs: [head-track]
duration: 1–4s
tags: [camera, text]
---

## Inputs
- `[MODE]`: `lean-in` | `slow-push` | `headline`
- `[WORD_TIME]` (lean-in: the second the word is said, from a transcript)
- `headline`: two lines `[LINE_1]|[LINE_2]`

Never past 2× zoom.

## Build
- **lean-in**: zoom 1→1.45 in 5–6 frames (ease-out), face held at 42% height. Hold, then hard cut out (or end with the window).
- **slow-push**: zoom 1→1.6 over the whole window (ease-in-out), face at 40%. Background (outside the mask) blurs progressively, to σ ≈ 0.6% width. Vignette grows to 25%.
- **headline**: zoom 1→1.2 in 7 frames, face at 45%. Two lines above the head, fitted to 84% width, bold sans. Line 1 is white with a soft shadow. Line 2 is dark on a white box that wipes open left→right (ease-out). Each line rises in 0.92→1 scale and fades over 5 frames, 4 frames apart.

## Timing
| Mode | Length |
|---|---|
| lean-in | 1–1.5 s, starts on the word |
| slow-push | 3–4 s |
| headline | 2–3 s, fade last 6 frames |
