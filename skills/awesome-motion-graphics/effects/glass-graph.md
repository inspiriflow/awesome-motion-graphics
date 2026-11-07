---
name: glass-graph
summary: A frosted glass card rises at chest height, the number counts up and the line graph draws itself
source: frame-15
needs: []
duration: 3s
tags: [glass, data]
---

## Inputs
- `[METRIC]`, `[START_NUMBER]`, `[END_NUMBER]` (real)

## Build
- Card ~760×520, centred, chest height, never over the face, inside x 120–960.
- Glass: white ~10%, strong backdrop blur, radius 36, thin light border, soft shadow below, faint top highlight.
- Content: small grey title → big bold white counter (tabular figures, ease-out) → line graph drawing left→right, rising with a couple of small dips, line `#D97757`, gradient fill fading to transparent, tip dot that pulses once at the end.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–8 | Card slides up ~60 px, fades in |
| 8–60 | Count-up and line draw in sync |
| 60–80 | Hold, dot pulses |
| 80–90 | Fade out, slight drop |
