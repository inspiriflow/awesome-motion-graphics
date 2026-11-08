---
name: follow-tap
summary: A Follow button pops up beside you and flips to Following with a ring burst
source: vibha-51
needs: [head-track]
duration: 2.5s
tags: [ui, social]
---

## Inputs
- `[TAP_TIME]` (default 45% in), `[COLOR]` for Following (default purple `#7C5CFF`), optional position.

## Build
- Rounded button (~30% × 9% width): blue `#0095F6` with `+ Follow`, white bold sans. Placed beside and below the face (~1.9 face widths right, 1.6 down), clamped inside the frame. Never on the face.
- On tap: the colour switches to `[COLOR]` and the label to `Following`. The button squashes to 0.88 and back (sine, 9 frames). A white ring expands from 0.3→1.2 × button height and fades over 12 frames.
- Variant (pastel-word): a lavender room plus a giant word behind you (see text-behind), with a profile card whose button gets followed.

## Timing (75 frames)
| Frames | What |
|---|---|
| 0–9 | Pops in 0.6→1 (back) |
| tap | Flip + squash + ring |
| 69–75 | Fade |
