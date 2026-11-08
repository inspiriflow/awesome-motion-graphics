---
name: wave-trim
summary: A dark panel above your head shows your voice waveform; the red dotted silence on both sides collapses until only your words are left
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 2s
tags: [ui, data]
---

## Inputs
None. (Optional: use your real waveform for the middle block.)

## Build
- A near-black panel above the head, behind the mask. Full width 84%, height 20% of width.
- Centre: ~60 cream waveform bars (block 30% width).
- Either side: red dots spaced ~1.6% width, standing for silence.
- The panel width shrinks from 84%→44%, so the dotted silence is trimmed away and the waveform stays centred.

## Timing (60 frames)
| Frames | What |
|---|---|
| 0–6 | Panel pops (back) |
| 7–22 | Trim (ease-in-out) |
| 54–60 | Fade |
