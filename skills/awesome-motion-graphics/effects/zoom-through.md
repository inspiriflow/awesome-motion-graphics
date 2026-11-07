---
name: zoom-through
summary: A giant word fills the screen and the camera flies through the hole in its O into your shot
source: frame-15
needs: []
duration: 3s
tags: [text, camera, transition]
---

## Inputs
- `[LINE_1]`, `[LINE_2]` — one must contain an O (e.g. ONE / PROMPT, GO, NOW, BOOM, a name)

## Build
- Two-line heavy bold sans, white, as wide as the safe area (x 120–960). Place it so the O's counter sits over the face.
- Behind: clip frosted (~30 px blur, ~45% brightness). Inside the O's counter: clip clear and sharp (a window).

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–10 | Hold, tiny push 1.0→1.03 |
| 10–46 | Fly into the O: scale word layer about the O's centre exponentially, e.g. `1.03 · 60^t` with eased t (feels constant-speed). Zoom blur grows with speed; O edges defocus as they near camera; frost fades so clip is fully clear when the O leaves frame |
| 46–90 | Clear clip, gentle push 1.0→1.05 easing out |
