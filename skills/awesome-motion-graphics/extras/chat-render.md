---
name: chat-render
summary: Reusable chat-style intro (slash command typed, edit renders in a card, grows to full screen) and ending
source: frame-15
needs: []
duration: 1.2s intro / 6s ending
tags: [ui, intro, outro]
---

Design an original dark mobile chat UI — do not copy any real app's screenshots. Make command, description and the following edit props.

## ChatRender (~1.2 s, before each edit)
1. Dark phone chat: message box (+ button, mic, round orange send) above a dark keyboard; talking.mp4 thumbnail already attached.
2. "/" typed → command list pops up, narrows to /edit, autocompletes. Edit name typed → suggestion card with one-line description, autocompletes. Keys light up as pressed.
3. Send: thumbnail moves top-right as a sent message, orange pill with the full command, "Editing with [edit]…" with a small spinning star.
4. A card below made of a tiny-dot grid lights up and resolves into the playing edit.
5. After ~1 s the card grows to full screen (corners square off, chat sinks back), edit plays until a hard cut.

## ChatEnding (~6 s)
Home screen with italic-serif greeting + orange star. `[KEYWORD]` typed and sent; reply streams word by word ("Comment [KEYWORD] and I'll send you…"); a card renders the end board and grows to full screen.
