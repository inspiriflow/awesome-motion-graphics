---
name: checklist
summary: A list ticks itself off as you talk: a to-do card beside your head, a Claude task list under your chin, or iPhone toggles flipping on
source: vibha-51
needs: [head-track, mask]
duration: 3–5s
tags: [ui, list]
---

## Inputs
- `[LOOK]`: `todo` | `tasks` | `toggles`
- `[ITEMS]` (tasks: `step::meta`, e.g. `Cut you out of the room::AI mask`), `[TITLE]`
- `[TICK_TIMES]` (optional: the second each item is said; default evenly spaced)

## Build
- **todo**: cream card (~50% width) beside the head on the emptier side, behind the mask. Amber uppercase title, `n of N` counter in grey. Each item has a checkbox. On tick: the box goes green (`#34C759`) with a white check, and a strike-through line draws across the text.
- **tasks**: dark smoked glass card (~90% width) under the chin (y ≥ 42%), in front. Orange asterisk spark + bold title, `n of N` top right. Each row has a status circle (dim ring = waiting, ring + spinning orange arc = working, green disc + check = done), bold text, and mono meta right-aligned (green when done).
- **toggles**: iOS settings card (white, ~72% width, hairline dividers). Each row has a label left and a switch right that slides its knob and fades grey→green. Default placement is above the head, tucked behind so the hair overlaps the bottom edge, with a gentle 1.12 push. Optional `below` puts it under the chin.

## Timing
| When | What |
|---|---|
| 0–9 | Card pops/slides in (back ease) |
| each tick | Box/disc pops 0.6→1 (back, 7 frames); strike or knob slides (ease-out, 6–7 frames) |
| last 6 frames | Fade |
