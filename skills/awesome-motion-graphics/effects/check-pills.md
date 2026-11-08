---
name: check-pills
summary: Grid-paper room, two boards of your reels pinned behind you, and a cursor clicking blue pills that tick on
source: vibha-51
needs: [mask, behind-me, head-track, reels]
duration: 3s
tags: [ui, environment]
---

## Inputs
- `[PILLS]` (default `Hook|Captions|Cuts|B-roll`), `[HANDLE]`, `[BOARD_TITLE]`, `[REELS]`

## Build
- Replace the room (outside the mask) with light grid paper: pale blue-grey, faint lines every ~5% width.
- Two white boards (~44% width, rounded, shadow) behind the head, left and right, tilted +8° / −8°. Each has a coral avatar dot + bold title and a 3×3 grid of reel thumbnails.
- Blue `#0A84FF` pills in front around the shoulders/chest, at scattered fixed spots below the face. White bold label. On click a white tick is added and the pill widens.
- An arrow cursor glides (ease-in-out) from pill to pill and clicks each one.

## Timing (90 frames)
| Frames | What |
|---|---|
| 0–5 | Room swaps to grid paper |
| 0–9 / 3–12 | Boards pop |
| from 7, every 6 | Pill pops (back), cursor arrives, click at +4: tick + squash 0.9 |
| 84–90 | Fade |
