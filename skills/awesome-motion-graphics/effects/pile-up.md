---
name: pile-up
summary: Cards pile up behind your head one by one (your reels, or your headlines), then an optional total pops in front
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 3s
tags: [cards, depth, data]
---

## Inputs
- `[CARDS]`: reel covers/screenshots (folder), **or** headlines as `headline::meta` (e.g. `Scrape LinkedIn automatically::38K views`)
- `[TOTAL]` + `[TOTAL_LABEL]` (optional, real number only, e.g. `672K` / `views from 7 reels`)

## Build
- **Reel cards**: 9:16 rounded cards, ~34% frame width, soft shadow.
- **Headline cards**: ~50% width. Bold sans title wrapped to 84% of the card, a small red play triangle, and `@handle · meta` underneath. Cycle 4 looks: white/ink, ink/white, cream/brown, yellow/ink.
- Random but fixed positions in x 14–86%, y 7–52%, tilt ±7–9°. All behind the mask.
- Total: accent-orange pill (`#D97757`), a big condensed number + bold label. Sits in front, below the chin (y ≥ 60%), tilted −3°.

## Timing (90 frames)
| Frames | What |
|---|---|
| every 3–7 | Next card: scale 0.6→1 with a small back-overshoot over 7 frames, fades in over 2 |
| after last card +3 | Total pill pops in (back ease, 9 frames) |
| 84–90 | Everything fades |
