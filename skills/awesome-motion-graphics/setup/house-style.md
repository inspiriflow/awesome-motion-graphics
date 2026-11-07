# Setup 1: project + house style

Run once per project.

1. Scaffold a Remotion project (default folder `claude-edits`), install deps.
2. Copy the user's clip to `public/talking.mp4`. Composition default: 1080x1920, 30 fps.
3. Write `HOUSE_STYLE.md` in the project with these rules, and follow it for every effect:

## HOUSE_STYLE.md

- **Easing**: nothing moves linearly. Camera moves: cubic/sine in-out. Entrances: expo/quint out. Springs only with <4% overshoot.
- **Motion blur** on fast movers: average sub-frames across half a frame, or a directional blur along the motion.
- **Face is sacred**: no graphic over it. Readable text inside x 120–960, y 260–1700 (clears Instagram UI).
- **Type**: max two fonts per effect. Bold modern sans, slightly tight tracking, for headlines. Nothing readable under 34 px. Free pairing used by many recipes: Bricolage Grotesque 750 + Newsreader Italic 470 (Google Fonts).
- **Colour**: white/off-white plus one accent, orange `#D97757` (some recipes use `#F69963`).
- **Integration**: soft shadows, body in front of graphics where it makes sense, film grain matched to the footage.
- **Stability**: smooth all tracking over time, no jitter or flicker.
- **Banned**: neon, glowing outlines, colour blobs/orbs, stickers, emoji, glitch.
