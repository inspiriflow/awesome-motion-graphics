---
name: match-cut
summary: Newspaper pages cut fast behind you, each with the same word locked in a red box at the same spot
source: vibha-51
needs: [mask, head-track]
duration: 2s
tags: [text, editorial, cuts]
---

## Inputs
- `[WORD]` (default `Claude`), `[COLOR]` box red

## Build
- Generate 8 different news/article page backgrounds (headline, columns of body text, different fonts and layouts). Each contains `[WORD]` set in white on a red box.
- The word is anchored at exactly the same screen position on every page: centred, above the head (≥ 1.55 face widths above the face centre). Lay the page text out around that anchor.
- The page replaces the background outside the mask. You stay in front.
- Pages darken slightly in an elliptical falloff toward the edges.
- Slow push 1→1.06 toward the face.

## Timing (60 frames)
Page durations accelerate down then settle: ~4.5, 4.5, 5, 5.5, 6.5, 8, 9, 13.5 frames. Hard cuts. Fade in over 2 frames, out over 4.
