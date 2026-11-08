---
name: cover-star
summary: You become a magazine cover, masthead behind your head, cover lines beside you and a barcode
source: vibha-51
needs: [mask, behind-me]
duration: 3s
tags: [text, layout, editorial]
---

## Inputs
- `[TITLE]` (masthead), `[ISSUE]` (e.g. `THE AI ISSUE · 2026`), `[LINES]` (first one is the hero line), `[COLOR]` (default red `#E82434`)
- `[LOOK]`: `pop` | `editorial`

## Build
- **pop**:
  - 60% "pop" grade.
  - A huge bold masthead fitted to 92% width, top 24% of the frame, behind the mask so your head overlaps it. The small mono issue line sits above it.
  - Cover lines left (x 5%, from y 50%): the hero line in large yellow serif, the rest in white bold sans.
  - A barcode bottom right.
- **editorial**: a soft warm film look, a classic serif masthead behind the head, an issue line, and elegant serif cover lines left and right.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–10 | Grade in; masthead slides down from above, fades in |
| 5–… | Cover lines slide in from the left, 60 px, 2–3 frames apart |
| 84–90 | Fade |
