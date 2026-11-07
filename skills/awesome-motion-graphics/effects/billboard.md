---
name: billboard
summary: Camera pulls back from your clip to reveal it on a giant LED billboard on a tower in a night city
source: frame-15
needs: []
duration: 2.8s
tags: [camera, 3d, environment]
---

## Inputs
- `[CITY]` (e.g. dense glass/metal financial district) — or `[LANDMARK]`
- `[ACCENT]` optional

Use the first 84 frames of a stretch with no jump cuts, looking into camera.

## Pipeline
Bake every frame in Python (numpy + OpenCV) in linear light, write JPEG q95 (folder <40 MB), play back in Remotion as an image sequence.

## Scene (metres)
- **Billboard**: 9:16 LED, 8.1 × 14.4 m, bottom edge 72 m up, 16 cm black bezel, 55 cm proud of facade. Steel catwalk + railing 1.95 m below.
- **Host tower**: ~12 m wide, 95 m tall; dark graphite fins and floor bands 42 cm proud of glass. Rooms behind glass via interior mapping (ceiling, floor, back wall, lamp, furniture, blinds); most dark. Cladding variation: ~10% panel tone shifts, soft mottle, faint vertical streaks, glossier fins catching screen light. Calm at small size.
- **City**: towers on a street grid with setback crowns. Lit windows grouped by floor/tenant in runs of 2–4 sharing a temperature (2700 K / 3500 K / 5000 K), dark floors, a few dim blue TV rooms. No tiling.
- **Atmosphere**: dark blue-grey sky, faint cloud lit warm from below, haze thin high / dense low, warm street glow at the bottom when looking down.

## Camera
- Pinhole, 66° vertical FOV. Start 11.1 m from screen (screen exactly fills frame).
- Frames 1–3 = raw clip; 3–8 smoothstep cross-fade into render.
- **Pull back 4–42**: dolly to 26.6 m, interpolating log(distance). Velocity profile `t^1.45 · (1−t)^2.7`, normalised. Arc 16° right and 12° down (ends looking slightly up). 180° shutter, 4–14 jittered sub-samples by pixel speed.
- Reveal order: LED emitters (270×480 rounded dots on black, visible while >2.7 px, gone by 1.45 px, mip-mapped — no moiré) → bezel + catwalk → facade → neighbours + sky. Must read as "billboard on a building" by frames 25–33 even at 0.65 scale.
- **Hold 42–84**: keep drifting ~4.5% further back and 2.6° further round. Last frame: screen ≈41% of frame height (~790 px), centred near x 530, inside x 120–960, face recognisable.

## Light & lens
- Screen lights the world: grazing falloff `z / d³` on its own facade plus broad haze bounce, strongest within one screen width, tinted by the frame's colours (pulses with the clip). Catches fins, frames, nearby glass, catwalk from above. Faint glow in air.
- LED character: blacks lifted +0.0075 linear, gentle gain, 0.9 m cabinets with ~2.4% mismatch + hairline seams, off-axis dimming, 2–6 px bloom over bezel.
- Lens: bloom only above ~0.16 linear, 0.6% veiling glare, 0.4 px softness, gentle vignette, soft highlight shoulder, grain ~2.3/255 (stronger in darks).

No flares, streaks, neon, text or ads besides the clip. At most one dim red aviation light, blinking once.
