---
name: uninstall
summary: An Uninstalling... progress bar fills while the frame glitches, splits and pixelates away
source: vibha-51
needs: []
duration: 2.5s
tags: [ui, transition]
---

> Breaks the house-style "no glitch" rule on purpose. Use only as an ending/transition.

## Inputs
- `[TEXT]` (default `Uninstalling...`)

## Build
- macOS-style light dialog (~70% width, top, y 16%): the text, a grey track with a blue `#007AFF` fill, and a `%` readout.
- Glitch strength g = progress^1.6:
  - RGB split of up to 2.5% width (red right, blue left);
  - 2–12 random horizontal slices per frame, each shifted by up to ±8% width.
- The last 18%: pixelate (block size up to 40 px) and darken 60%.

## Timing (75 frames)
| Frames | What |
|---|---|
| 0–9 | Dialog pops (back) |
| 0–75 | Bar fills (ease-in-out), glitch ramps |
| 62–75 | Pixelate out |
