---
name: messages
summary: iMessage notifications pop in one after another, creamy glass with a soft glow, stacking upward
source: vibha-51
needs: []
duration: 3s
tags: [ui, social, glass]
---

## Inputs
- `[MESSAGES]` (e.g. `how did you edit this??|wait, which app is this|send me the effects pls`), `[TITLE]` (default `Messages`), stack bottom y (default 61%)

## Build
- iOS notification banners: creamy frosted glass (blur what's behind, warm white tint), soft outer glow, rounded corners, the green Messages app icon, bold title + `now`, the message text.
- The newest banner appears at the bottom slot. Older ones slide up one slot (~17% of frame height at 1080 width) each time a new one arrives.

## Timing
Pops spaced evenly over the first 75% of the window (max 12 frames apart). Each pop takes 5 frames (ease-out fade/rise). Fade all over the last 6.
