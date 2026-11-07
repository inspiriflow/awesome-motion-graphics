# Setup 2: person mask, head track, layer components

Run once per clip. Most recipes need it.

1. **Mask** → `public/mask/####.png`, one per frame, same size/fps as the clip, person white on black.
   - macOS: Apple Vision person segmentation (accurate quality) via a small Swift script.
   - Windows/Linux: rembg or MediaPipe selfie segmentation.
   - Feather 1–2 px, temporal smooth over 3 frames so hair and shoulders don't flicker.
2. **Head track** → `public/head-track.json`: per frame, head top, left edge, right edge, centre. Derived from the mask, each value smoothed over ~7 frames.
3. **Components**:
   - `BehindMe` — draws a graphic between the background and the person (via mask).
   - `InFrontOfMe` — draws on top of everything.
4. Verify: overlay the mask on 5 frames spread across the clip and show them.
