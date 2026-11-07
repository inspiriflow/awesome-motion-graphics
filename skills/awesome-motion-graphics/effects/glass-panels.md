---
name: glass-panels
summary: Smoked-glass panels float behind you showing the edit itself — prompt, cuts, mask, export
source: frame-15
needs: [mask, behind-me]
duration: 3s
tags: [glass, ui, depth]
---

## Inputs
- `[COMMAND]` (e.g. `/edit glass-panels`)
- `[JUMP_CUT_COUNT]` — real number of cuts in the clip

## Build
Four panels BEHIND the person at three depths, never over the face, inside x 120–960.

Glass: near-black ~55% tint, strong backdrop blur, radius 28, thin light border ~14%, faint top highlight, soft shadow. Bold sans for numbers/labels, italic serif for 1–2 words.

| Panel | Placement | Content |
|---|---|---|
| Prompt bar | Wide, top, y ~226–376 | Orange star, command types out ("/edit" dimmed); star spins while working → orange tick + "Done" |
| Cuts | High left, nearest | Counter climbing to the real cut count, italic "jump cuts", thin filmstrip of the clip with a mark per real cut, orange playhead on current frame, real timecode |
| Export | Lower right | 9:16 outline draws itself, "1080 × 1920", "30 fps", tick |
| Person mask | Low left, furthest, softer/dimmer, tucked behind shoulder | "Person mask" + italic "every frame", live white silhouette from the current mask frame, frame counter |

## Timing (90 frames)
| Frames | What |
|---|---|
| 3–15 | Command types |
| 7–33 | Panels arrive back→front, slight slide + fade |
| 15–37 | Cuts land, counter climbs |
| 33–44 | Export tick, then "Done" |
| 46–72 | One soft light sweep across all glass |
| 0→end | Per-panel parallax drift; gentle push, still moving at end |

Only true numbers.
