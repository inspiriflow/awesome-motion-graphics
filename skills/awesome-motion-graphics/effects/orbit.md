---
name: orbit
summary: Thick glass like/comment/share/save/follow tiles orbit your head in 3D; the heart gets liked as it passes in front
source: frame-15
needs: [mask, head-track, behind-me]
duration: 3s
tags: [3d, glass, orbit]
---

## Inputs
- `[SYMBOLS]` — five, e.g. heart, comment, paper plane, bookmark, plus (or your own logos)
- `[LIT_TILE]` — which one gets "liked" (e.g. heart)
- `[ACCENT]` (e.g. `#F69963`) — only on the lit tile
- `[ROOM_ACCENT_LIGHT]` — e.g. red lamps on the right wall

## Tiles
Thick square glass blocks, app-icon squircle: radius ~30% of width, depth ~22%, rounded rim ~10%. Symbols drawn as clean white shapes, ~50% of tile, stroke ~7%. No text or numbers.

## Glass (ray-traced, linear light)
- Refract into front face (IOR 1.5), through block, out back; sample video where it lands. Strong at rim, ~none in the flat middle.
- Face frosted ~2 px; rim stays sharp. Smoke tint ~60% transmission, darker toward the rim.
- Chromatic split at rim (R/B ±1.5% vs G). Fresnel reflections.
- Lighting from the room: key soft-box camera-left high → crisp top-left rim highlight; ceiling strip → top-edge streak; room accent light on right edges. Bright line where face meets rim, faint inner bottom shadow, soft top sheen.
- Symbols: raised frosted white layer, slightly sunk, lit top-left with a small glint; soft contact shade beneath.

## Orbit
- True 3D ellipse at eye line, perspective camera, front tilted down. Follows ~50% of head motion, smoothed.
- Back half wider and lifted, so back tiles pass beside/above the head, not across it.
- Sizes: ~232 px front, ~153 sides, ~129 back. Tiles face camera but swing ≤17°, lean ≤7° into the turn.
- Layers: clean plate → back half → person (mask) → front half. Front tiles refract the person. Layer switch only beside the head.
- Integration: person shadow on tiles just behind; front tiles cast soft shadow down-right onto the person only; back tiles defocus ≤2.6 px at ~64% brightness; motion blur 0.4× per-frame screen velocity; grain measured from a still patch of the clip.

## Timing (90 frames)
| Frames | What |
|---|---|
| 1–20 | Tiles appear ~2 frames apart, expo-out, 86%→100%, focus pull |
| 1–30 | Ring spins up, soft overshoot to ~2× cruise near frame 13, settles to 1 rev / 6 s |
| ~44 | Lit tile crosses chest: fills with accent over 5 frames, one damped pop (≤5–6%, settles ~12 frames), stays filled |
| 0→end | Push 1.0→1.035, eases in over 1 s; ring + camera still moving at end |

Never cross the face; keep within x 120–960. No glow, sparkles, emoji, bokeh, shake.
