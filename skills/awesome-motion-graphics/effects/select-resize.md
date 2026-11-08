---
name: select-resize
summary: A blue design-tool selection box grabs your number above your head and a cursor drags it bigger
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 2s
tags: [ui, text]
---

## Inputs
- `[TEXT]` (default `2X`, a real number)

## Build
- Cream high-contrast serif (Didone-style) text above the head, behind the mask.
- A selection box around it: translucent blue `#0A84FF` fill, dashed blue outline, white square handles with blue borders at the 4 corners.
- An arrow cursor sits on the bottom-right handle and moves with it as the box grows.

## Timing (60 frames)
| Frames | What |
|---|---|
| 0–2 | Fade in |
| 7–29 | Text size grows 55%→100% (ease-in-out); box and cursor follow |
| 27–36 | Blue fill fades to 30% |
| 54–60 | Fade |
