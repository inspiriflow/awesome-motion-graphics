---
name: freeze-frame
summary: Freezes on your gesture with a white flash, you pop forward as a white-outlined sticker and a name tag appears under your chin
source: brody-01
needs: [mask, head-track]
duration: 2s
tags: [cutout, text, camera]
---

## Inputs
- `[GESTURE]` (default thumbs up), `[NAME]`, `[ROLE]`

## Build
- Find the frame where the gesture peaks (hand-pose detection), and play the clip normally up to it.
- On that frame: a short white flash, then freeze.
- Background (outside the mask): greyscale + blur.
- Sticker: your cutout from the mask with a ~14 px white outline (dilate the mask), a soft drop shadow, tilted −2.5°, scaled forward slightly (pop).
- Name tag: coral rounded pill under the chin with name + role. Never over the face or the gesturing hand.

## Timing
| When | What |
|---|---|
| peak frame | White flash (2–3 frames), freeze |
| +0–8 frames | Background greys/blurs, sticker pops forward (back ease), tag slides in |
| hold 1.3 s | Still |
| end | Sticker and tag fade, clip resumes from the frozen frame |
