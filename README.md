# Awesome Motion Graphics

A Claude Code skill that collects motion-graphics edits for vertical talking-head video from many sources. Each recipe is a build spec that Claude turns into a Remotion composition and renders to MP4 on your own clip.

## Install

```bash
git clone <this-repo> ~/awesome-motion-graphics
ln -s ~/awesome-motion-graphics/skills/awesome-motion-graphics ~/.claude/skills/awesome-motion-graphics
```

Then in Claude Code: *"use awesome-motion-graphics: orbit on ~/Movies/me.mov"*, or just *"what edits can you do?"*

Requirements: Node.js, a vertical clip (ideally 1080x1920). Claude installs Remotion during setup.

## Layout

```
skills/awesome-motion-graphics/
  SKILL.md        workflow, defaults, troubleshooting
  setup/          house style + person mask / head track (run once)
  effects/        one recipe per file, with frontmatter
  extras/         intros, endings, assembling a full reel
```

## Effects

| Effect | What you see | Needs | Source |
|---|---|---|---|
| reel-wall | Back wall becomes a grid of screens playing your top reels | mask, reels | frame-15 |
| glass-widgets | Smoked-glass clock, now-playing and notification at three depths | mask, music | frame-15 |
| kallaway | Shot drops into a bottom panel, head breaks out, logo + headline build above | mask | frame-15 |
| orbit | Glass like/comment/share tiles orbit your head in 3D | mask, head-track | frame-15 |
| billboard | Pull back to reveal your clip on a city-tower LED billboard at night | – | frame-15 |
| zoom-through | Fly through the O of a giant word into your shot | – | frame-15 |
| text-path | Text flows along the outline of your head and shoulders | mask | frame-15 |
| zoom-grid | Pull back to a wall of your moments, glide, dive into another | – | frame-15 |
| face-cam | Creator panel layout with head break-out and headline | mask, head-track | frame-15 |
| text-3d | Solid 3D word standing on the desk | – | frame-15 |
| text-ring | Ring of text spinning around your head in 3D | mask, head-track | frame-15 |
| tier-list | Tier list builds itself below your face | – | frame-15 |
| glass-graph | Frosted card with count-up number and self-drawing graph | – | frame-15 |
| over-the-shoulder | Camera pushes over each shoulder as BEFORE/AFTER cards pop | mask | frame-15 |
| text-behind | Huge word rises from behind your head | mask | frame-15 |
| stage-light | Room goes dark, spotlight lands, word projected on the wall | mask | frame-15 |
| glass-panels | Glass panels behind you show the prompt, cuts, mask and export | mask | frame-15 |
| reach-split | Reach chart on a chalk board above, your shot fades in below | – | frame-15 |
| reel-orbit | Your reel covers orbit your head with real view counts | mask, head-track, reels | frame-15 |
| pull-back | Your shot becomes the monitor of an editing suite with a real timeline | music | frame-15 |

## Sources

| id | Source | Notes |
|---|---|---|
| frame-15 | [FRAME: 15 video edits you can make with Claude](https://promptible.notion.site/FRAME-15-video-edits-you-can-make-with-Claude-copy-paste-prompts-4056a397f23b81bcb2d2e937d918d84c) (Promptible) | 15 edits + 5 bonus, setup, chat intro. Recipes here are restructured specs; see the original for the full copy-paste prompts. |

## Adding a source

1. Add a row to **Sources** with a short id.
2. One file per effect in `effects/`, using the frontmatter in `SKILL.md` and `source: <id>`.
3. Add it to the **Effects** table.
