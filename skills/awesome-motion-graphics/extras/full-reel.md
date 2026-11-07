---
name: full-reel
summary: Stitch five edits with chat intros, music and an end board into one reel
source: frame-15
needs: [music]
tags: [assembly]
---

## Inputs
- `[EDIT_1..5]` in order, `[CALL_TO_ACTION]` with `[KEYWORD]`

## Build `FullReel`
1. For each edit: ChatRender (with that edit's command + description) → the edit.
2. Hard cuts only.
3. `public/music.mp3` at normal speed; mute the talking clip; music fades over the last 0.5 s.
4. End with ChatEnding. End board: `#121213`, big bold CTA with keyword orange, short italic line, 3×2 grid of rounded tiles — the five edits in their finished state with name labels, plus a sixth "+N more" tile over a darkened mosaic.
5. Render `out/full-reel.mp4`, 1080x1920, 30 fps; verify key elements stay within x 120–960.
