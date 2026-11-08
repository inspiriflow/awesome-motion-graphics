---
name: comment-box
summary: An Instagram comments sheet above your head types your word, posts it, gets a heart and your own reply
source: vibha-51
needs: [mask, behind-me, head-track]
duration: 3.5s
tags: [ui, social]
---

## Inputs
- `[WORD]` (what the viewer comments, e.g. `EFFECTS`), `[HANDLE]`, `[REPLY]` (your reply), `[CHIP]` (optional link chip text)

## Build
- Dark IG comments sheet (rounded, grey `Comments` header). It sits above the head with its bottom just above the eyebrows, behind the mask, tilted ~1°, bobbing ±3 px.
- Bottom of the sheet: the emoji reaction row, then the input row (avatar, rounded field `Add a comment for [HANDLE]`, blue `Post`).
- The posted comment appears as a row with avatar, handle and text. A red heart pops on it.
- Your reply below it: a circular avatar cut from your own face, the handle + `Author` tag, the reply text, and an optional yellow link chip.
- Alt `bar` look: a white pill comment bar near the bottom (y 80%) with a typed word and a speech-bubble above it.

## Timing (105 frames)
| Frames | What |
|---|---|
| 0–9 | Sheet pops in (0.85→1, back) |
| 9–~30 | Word types in, ~2 frames per letter, with a blinking blue caret |
| post | `Post` flashes, the comment row appears |
| +9 | Heart pops |
| +6 | Reply slides up 16 px and fades in, chip pops |
| last 6 | Fade |
