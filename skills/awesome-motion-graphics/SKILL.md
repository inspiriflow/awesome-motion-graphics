---
name: awesome-motion-graphics
description: A collected library of motion-graphics edits for talking-head vertical video (1080x1920), each a build spec Claude can render with Remotion. Use when the user asks for a named edit (reel wall, glass widgets, orbit, billboard, zoom through, text ring, tier list, glass graph, stage light...), says "/edit <name>", asks "what edits can you do", or wants a premium social-video effect on their own clip.
---

# Awesome Motion Graphics

A library of effect recipes gathered from many sources. Each recipe in `effects/` is a spec: what it looks like, what it needs, what the user fills in, and the exact layout and timing.

## Workflow

1. **No name given?** List every file in `effects/` with its one-line `summary` from the frontmatter, grouped by `tags`. Stop.
2. **First run in a project?** Do `setup/house-style.md`, then `setup/mask-and-head-track.md` if the effect's `needs` includes `mask` or `head-track`. Skip what already exists (`HOUSE_STYLE.md`, `public/mask/`, `public/head-track.json`).
3. Read the matching `effects/<name>.md`. Fill every `[INPUT]` from the user's words. Ask for anything still missing, especially real numbers. Never invent stats, view counts or logos.
4. Build it as its own composition named after the effect, following HOUSE_STYLE.md.
5. Render to `out/<name>.mp4`, report the path, and show 4 stills (start, two middle, end).

`extras/` holds non-effect recipes: a chat-style intro/ending (`chat-render.md`) and assembling several edits into one reel (`full-reel.md`).

## Defaults for every recipe

- 1080x1920, 30 fps, source clip at `public/talking.mp4` (copy, never edit the original).
- Safe area for anything readable: x 120–960, y 260–1700. Never cover the face.
- "Linear light" means: convert to linear, do the blur/tint/light, convert back to sRGB.
- "Still moving on the last frame" means the camera push never fully stops.

## When something looks off

| Symptom | Fix |
|---|---|
| Cut-out flickers / hair halo | Smooth the mask more over time; erode 1 px before feathering |
| Too fast | Lengthen to 4 s and scale every move to match |
| Text hard to read on phone | +20% on all text, check at phone size |
| Graphic touches the face | Move it lower, out of the face area |
| Movement feels robotic | Re-apply easing + motion blur from HOUSE_STYLE.md |
| Slow machine | Half-size preview render first, full quality once approved |

## Adding a recipe

New file in `effects/` with this frontmatter, body in the same shape as the others (Inputs, Build, Timing):

```yaml
name: kebab-name
summary: one line of what the viewer sees
source: source-id from README
needs: [mask, head-track, behind-me, reels, music]   # any subset
duration: 3s
tags: [3d, glass, text, camera, data, layout]
```
