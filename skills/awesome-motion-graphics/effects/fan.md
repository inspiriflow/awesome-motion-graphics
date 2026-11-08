---
name: fan
summary: Cards fan out in an arc: numbered tiles above your head, a hand of phones under a headline, or covers dealt behind your head
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 2.5s
tags: [cards, layout]
---

## Inputs
- `[LOOK]`: `lineup` | `phones` | `deal`
- `lineup`: `[ITEMS]` tile names. `phones`: `[REELS]` + two-line `[HEADLINE]`. `deal`: `[REELS]` covers, `[COUNT]` (default 13).

## Build
- **lineup**: dark rounded tiles (~10% width, 4:5), cream serif number `01…`, the name in small white sans underneath. Two concentric arcs above the head (outer radius 47% width, inner 33%), with tiles tilted along the arc. Behind the mask.
- **phones**: four phones (~23% width, 1:2, black bezel, notch) with reels on the screens. They fan from the centre below the chin: offsets −1.5…1.5 × 19% width, a slight parabola drop, tilt −11°·offset. In front. Above them goes a two-line headline in bold sans, line 1 white with a shadow, line 2 dark on a white box.
- **deal**: n 9:16 covers (~15% width) on a radius ≈ 2.15 × face width, pivoting from the face centre, spread −62°…+62°. Each card rotates to stay tangent. Behind the mask.

## Timing (75 frames)
| Frames | What |
|---|---|
| 0–9 | Headline lines (phones) drop in, 3 frames apart |
| stagger 1–2 per card | Each tile/phone/card flies out from the pile (deal: from −95°) to its slot, ease-out/back over 9–12 frames |
| 69–75 | Fade |
