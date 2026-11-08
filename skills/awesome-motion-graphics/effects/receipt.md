---
name: receipt
summary: Your instructions print out of a slot in the wall above your head like a receipt
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 3s
tags: [ui, text]
---

## Inputs
- `[LINES]`: e.g. `ORDER #1021|1x orbit|1x spotlight|cut the dead air|TOTAL: 1 prompt`

## Build
- Paper: cream (`#F7F1E3`-ish), ~50% width, mono ink text. The last line sits below a dashed rule. The bottom edge is a zig-zag tear and the paper has a soft shadow.
- Slot: a dark rounded bar (~62% width, 3% height) at y ≈ 7.5%, centred. The paper hangs from it.
- Everything is behind the mask. Scale the paper so its bottom stays above the head (≥ 1.3 face widths above the face centre).

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–5 | Slot fades in |
| 0–68 | Paper feeds down out of the slot, revealing line by line (ease-in-out on length) |
| 82–90 | Fade |
