---
name: face-cam
summary: Clip settles into a creator panel at the bottom, head breaks out over the edge, headline rises above
source: frame-15
needs: [mask, head-track]
duration: 3s
tags: [layout, title]
---

## Inputs
- `[LINE_1]` with `[ACCENT_WORD]` in `#F69963`; `[LINE_2]`

## Build
- **Move 0–24** (one in-out ease, motion blur): full frame shrinks into a panel x 72–1008, top y 1190, radius 40, white edge line 15%, soft shadow. Frame so hands stay in shot.
- **Break-out**: head-only cut-out drawn over the panel edge, head top ~40 px above the panel. Temporally smoothed.
- Above: `#121213` + subtle grain.
- **Headline** centred, y 520–800: line 1 bold sans (Bricolage Grotesque 750, ~98 px, −3 tracking), accent word orange; line 2 italic serif (Newsreader Italic 470, ~110 px) white. Words rise out of an invisible mask one at a time from frame 14, fast ease-out, 4-frame stagger, slight motion blur.
- **Hold**: slow 1.8% push on the panel anchored at the head top so the break-out stays put.
