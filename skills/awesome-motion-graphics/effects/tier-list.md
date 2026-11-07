---
name: tier-list
summary: A tier list builds itself below your face, item by item, then flips to "Ranked"
source: frame-15
needs: []
duration: 3s
tags: [data, ui, layout]
---

## Inputs
- `[TOPIC]`
- Items per tier: S `[ITEM]`, A `[ITEM]×3`, B `[ITEM]×2`, C `[ITEM]×2`, D `[ITEM]` (any counts)
- Optional logos in `public/logos/` named after items

Exception to house style: the five tier colours are allowed.

## Build
- Dark rounded panel below the face, inside x 120–960.
- Rows S/A/B/C/D: coloured label squares (red, orange, yellow, green, blue), dark grey row bg.
- Status pill at top: "Ranking [TOPIC]…" + spinner → crossfades to "Ranked ✓" when the last item lands. Never both visible.
- Items: logo on small rounded tile if available, else clean text chip.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–8 | Panel slides up + fades in |
| 10→ | Items drop into rows ~every 4 frames, small bounce |
| after last | Hold |
| last 10 | Panel fades out |
