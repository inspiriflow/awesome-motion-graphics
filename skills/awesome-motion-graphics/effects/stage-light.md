---
name: stage-light
summary: Room goes dark, a spotlight lands on you, a word is projected on the wall and cut by your head's shadow
source: frame-15
needs: [mask]
duration: 3s
tags: [light, text, environment]
---

## Inputs
- `[WORD]` (name, brand, a word you say)

All lighting in linear light. Warm white only.

## Build & timing (90 frames)
1. **Lights down, 1–15** (in-out): background (outside mask) −~3 stops, slight cool shift; person keeps their own light. Clean the mask edge first so no bright rim of the old room remains.
2. **Spot lands, 14–20** (quick ease-out, tiny settle, warms slightly like a real lamp):
   - soft oval pool on the wall behind head and shoulders;
   - person's soft shadow cast down-right inside it;
   - faint beam from above through drifting haze (6–10%, moving soft noise);
   - gentle top light on hair/shoulders + thin wrap light from the lit wall.
3. **Projected word, 21–37**: bold sans thrown onto the wall above the head by a second, lower projector front-left.
   - Keystoned to lie flat on the wall.
   - Additive light (takes the wall's texture/colour), not a sticker.
   - Cut by the head's shadow: project the mask from the projector's direction, blur the edge, subtract light.
   - Fades up while racking from blurred to sharp.
4. **Throughout**: push 1.0→1.04, soft highlights, fine grain on the darkened room.

No outline, glow, neon.
