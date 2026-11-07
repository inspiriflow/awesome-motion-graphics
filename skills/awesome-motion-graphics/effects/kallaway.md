---
name: kallaway
summary: Shot drops into a bottom panel, head breaks out over it, a logo + headline title builds above
source: frame-15
needs: [mask]
duration: 2.8s
tags: [layout, title, 3d]
---

## Inputs
- `[LOGO_SVG]` (official file, exact brand colour)
- `[HEADLINE]` (two lines, true) and `[ACCENT_WORDS]` (2–3 words set in italic serif, logo colour)

## Layout (1080x1920)
- Background `#121213` + fine chalk grain, drawn once full size, never tiled.
- Panel: x 71–1009 (938 wide), top y 1410, runs 5 px past bottom, radius 40. Clip scaled by 938/1080 to fill width.
- Head placement: median head-top (from mask) lands at y 1310, ~100 px above panel.
- Head cut-out only above the panel edge, overlapping 16 px. Clean mask: fill pinholes, drop specks, temporal smooth by optical-flow warping ±2 neighbours (weights 1,2,4,2,1). Decontaminate hair-edge colour. Soft head shadow on charcoal (blur, +9 px, 40% black).
- Graphic area: x 120–960, y 200–1172.

## Shot move
- 0–3: full frame.
- 3–22: one move, `cubic-bezier(0.6, 0, 0.3, 1)` — shrink into panel; edges/scale/position on one curve; corners 0→40. Motion blur: up to 64 sub-samples, 150° shutter. Cut-out fades in but only once the panel edge passes behind the head.
- After: slow push 1.0→1.02 on the face, still moving.

## Graphic
- Logo 480 px wide; logo + 104 px gap + two headline lines form one group centred at (540, 664).
- Split logo into parts (for a star/spark: one wedge per ray through centre + a core shape hiding seams).
- 10–31: build piece by piece — each grows from centre along its own direction, expo-out over 15 frames, 0.55-frame stagger, star order (~150° between successive pieces), 6-copy motion blur. Rack focus 11→0 px, scale 0.84→1.
- Thickness: 10 stacked copies 1.7 px apart (first lighter chamfer, rest darker). Tilt rotateX 12°, rotateY −26° → 0 over 10–50.
- 10–47: logo rotates −58°→0 (in-out); 22–48: pulse wave (pieces up to 7.5% longer, two crests). Lands upright with the last word, one breath <2%.
- Headline: line tops y 847 / 953. Bold sans 96 px, tracking −3; accent words italic serif at 1.1×. Streams in word by word 17–47: each fades over 11 frames, blur 11→0, rise 20 px, 3.5–4 frame stagger.
- 46–68: one soft diagonal warm-white light sweep across the logo (~44% peak, screen blend, clipped to logo).
- Grain: mid-grey noise tile, overlay 10%, shifted per frame; whisper of soft-light grain on background. Logo grain must measure within the footage's own.
- Whole graphic push 1.0→1.03 about group centre, still moving.

No extra text/logos/UI, no reflection or floor, no glow.
