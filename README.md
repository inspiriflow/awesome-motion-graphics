<div align="center">

<img src="previews/orbit.gif" width="22%"> <img src="previews/text-behind.gif" width="22%"> <img src="previews/glass-widgets.gif" width="22%"> <img src="previews/billboard.gif" width="22%">

### Every motion-graphics edit worth stealing, in one Claude skill.

**awesome-motion-graphics** is a Claude skill that collects motion-graphics effects for vertical talking-head video from creators across the internet. It turns each one into a precise build spec that Claude renders on your own clip with Remotion.

[![Claude Skill](https://img.shields.io/badge/Claude-Skill-D97757)](#-quick-start)
[![Remotion](https://img.shields.io/badge/Remotion-4-0B84F3)](#-how-it-works)
[![Effects](https://img.shields.io/badge/effects-45-F69963)](#-the-effects)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/inspiriflow/awesome-motion-graphics?style=social)](https://github.com/inspiriflow/awesome-motion-graphics)

[Demo](#-demo) · [The effects](#-the-effects) · [How it works](#-how-it-works) · [Quick start](#-quick-start) · [Sources](#-sources)

</div>

---

## 🎞️ What is awesome-motion-graphics

The edits that make short-form videos look premium — text behind your head, glass cards that orbit you, a pull-back onto a city billboard — are now shared as copy-paste Claude prompts, PDFs and GitHub repos. They're scattered across a dozen places, they overlap, and each one assumes a different setup.

This repo gathers them into one library. Every effect is a short spec with the same shape: what the viewer sees, what you fill in, the exact layout, and a frame-by-frame timing table. Name an effect, give Claude your clip, and it builds and renders it.

## ✨ Why awesome-motion-graphics

- **One library, many sources.** 45 effects from 3 sources so far, with duplicates merged. When two creators share the same idea, it's one spec with a `LOOK` option, not two.
- **Same shape every time.** Inputs, build, timing. Claude doesn't have to guess how one creator's prompt differs from another's.
- **Your face stays clear.** A shared house style keeps readable text inside the Instagram safe area and never puts a graphic over your face.
- **Real numbers only.** Charts, counters and view counts come from you. The skill never invents stats or logos.
- **Depth for free.** One-time setup makes a person mask and head track, so graphics can sit behind you, orbit around you, or follow your head.

## 🎬 Demo

> Each preview is rendered with the inspiri.flow husky as the speaker. The specs are approximated in CSS, and the data shown is made up. Previews cover the first 20 effects so far.

|   |   |   |   |
|---|---|---|---|
| <img src="previews/reel-wall.gif" width="180"><br>**reel-wall** | <img src="previews/glass-widgets.gif" width="180"><br>**glass-widgets** | <img src="previews/kallaway.gif" width="180"><br>**kallaway** | <img src="previews/orbit.gif" width="180"><br>**orbit** |
| <img src="previews/billboard.gif" width="180"><br>**billboard** | <img src="previews/zoom-through.gif" width="180"><br>**zoom-through** | <img src="previews/text-path.gif" width="180"><br>**text-path** | <img src="previews/zoom-grid.gif" width="180"><br>**zoom-grid** |
| <img src="previews/face-cam.gif" width="180"><br>**face-cam** | <img src="previews/text-3d.gif" width="180"><br>**text-3d** | <img src="previews/text-ring.gif" width="180"><br>**text-ring** | <img src="previews/tier-list.gif" width="180"><br>**tier-list** |
| <img src="previews/glass-graph.gif" width="180"><br>**glass-graph** | <img src="previews/over-the-shoulder.gif" width="180"><br>**over-the-shoulder** | <img src="previews/text-behind.gif" width="180"><br>**text-behind** | <img src="previews/stage-light.gif" width="180"><br>**stage-light** |
| <img src="previews/glass-panels.gif" width="180"><br>**glass-panels** | <img src="previews/reach-split.gif" width="180"><br>**reach-split** | <img src="previews/reel-orbit.gif" width="180"><br>**reel-orbit** | <img src="previews/pull-back.gif" width="180"><br>**pull-back** |

## 🧩 The effects

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
| pile-up | Reels or your headlines pile up behind your head, total pops in front | mask, reels | vibha-51 |
| fan | Tiles, phones or covers fan out in an arc around you | mask, reels | vibha-51 |
| locked-on | Brackets snap onto your face, camera follows you | head-track | vibha-51 |
| punch-in | Fast punch on a word, slow cinematic push, or punch + headline | head-track | vibha-51 |
| receipt | Your instructions print out of the wall like a receipt | mask | vibha-51 |
| grade | Colour grade fades in, or a before/after slider reveals it | – | vibha-51 |
| checklist | To-do card, Claude task list or iPhone toggles tick off as you talk | mask, head-track | vibha-51 |
| comment-box | IG comments sheet types your word, posts it, you reply | mask | vibha-51 |
| follow-tap | Follow button flips to Following | head-track | vibha-51 |
| pause-point | Freeze frame with a hand-drawn arrow and label | head-track | vibha-51 |
| uninstall | Uninstall bar fills while the frame glitches apart | – | vibha-51 |
| shortcut-rain | Keycaps rain down behind you | mask | vibha-51 |
| stamp | Red rubber stamp slams down, frame shakes | head-track | vibha-51 |
| countdown-flip | 3, 2, 1 split-flap clock above your head | mask | vibha-51 |
| rabbit-hole | Room tunnels into itself, spinning, you stay in front | mask | vibha-51 |
| cover-star | You become a magazine cover | mask | vibha-51 |
| scribble | Marker doodles draw themselves around you | head-track | vibha-51 |
| dot-reveal | Your shot builds out of glowing dots | – | vibha-51 |
| match-cut | News pages cut on one word locked behind your head | mask | vibha-51 |
| messages | iMessage banners pop in and stack up | – | vibha-51 |
| tape-label | Yellow tape with your line lands on your chest | head-track | vibha-51 |
| select-resize | Selection box grabs your number, cursor drags it bigger | mask | vibha-51 |
| wave-trim | Silence on your waveform trims away | mask | vibha-51 |
| check-pills | Grid-paper room, reel boards behind, cursor clicks pills | mask, reels | vibha-51 |
| freeze-frame | Freeze on your gesture, you pop out as a white-outlined sticker with a name tag | mask, head-track | brody-01 |

**Needs:** `mask` = a person cut-out, `head-track` = your head position per frame, `reels` = screenshots of your own reels, `music` = a track. Setup makes the first two once per clip.

## 🧭 How it works

```
Your clip + an effect name
        │
        ▼
1. No effect named?    → lists every effect, grouped by tag
2. First run           → Remotion project + house style (once per project)
3. Mask + head track   → only if the effect needs them (once per clip)
4. Fill the inputs     → asks for anything missing, real numbers only
5. Build               → one Remotion composition per effect
6. Render              → out/<effect>.mp4, plus 4 stills to check
```

Each effect is a spec like this:

```
---
name: text-behind
summary: A huge word rises from behind your head, holds, then drops away
needs: [mask, behind-me]
duration: 3s
---
## Inputs      [WORD]
## Build       Heavy condensed bold, ~330 px, behind the head, inside x 120–960
## Timing      0–10 rise + blur→sharp · 10–75 hold, slow lift · 75–90 drop and fade
```

## 🚀 Quick start

**Claude.ai / Claude desktop app**

1. Download [`awesome-motion-graphics.skill`](https://github.com/inspiriflow/awesome-motion-graphics/releases/latest) from Releases.
2. Upload it in Claude's Skills settings.
3. In a new chat, ask: *"What edits can you do?"* or *"Add text-behind to my clip with the word CLAUDE."*

**Claude Code**

```bash
git clone https://github.com/inspiriflow/awesome-motion-graphics.git
cp -r awesome-motion-graphics/skills/awesome-motion-graphics ~/.claude/skills/
```

You need Node.js and a vertical clip, ideally 1080×1920. Claude installs Remotion during setup.

## 🏗️ Project structure

```
skills/awesome-motion-graphics/
├── SKILL.md          # The skill: workflow, defaults, troubleshooting
├── setup/            # House style + person mask / head track (run once)
├── effects/          # One spec per effect, with frontmatter
└── extras/           # Chat-style intros/endings, assembling a full reel
previews/             # Demo GIFs
preview-studio/       # Remotion project that renders the GIFs
```

Render a preview yourself:

```bash
cd preview-studio && npm install
bash render-gif.sh orbit     # → previews/orbit.gif
```

## 📚 Sources

| id | Source | Notes |
|---|---|---|
| frame-15 | [FRAME: 15 video edits you can make with Claude](https://promptible.notion.site/FRAME-15-video-edits-you-can-make-with-Claude-copy-paste-prompts-4056a397f23b81bcb2d2e937d918d84c) (Promptible) | 15 edits + 5 bonus, setup, chat intro. Recipes here are restructured specs; see the original for the full copy-paste prompts. |
| vibha-51 | [claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects) by Vibha Ramprakash ([@vibha.in.progress](https://instagram.com/vibha.in.progress)), MIT | 51 effects as a runnable Python/ffmpeg renderer. 24 added here as specs; the other 27 match effects already listed (orbit, carousel-spin → reel-orbit; profile-wall → reel-wall; place-in-grid → zoom-grid; spotlight, led-sign, glitter-spotlight → stage-light; backdrop-word, huge-strike, crayon-write, red-collage, pastel-word → text-behind; split-headline → kallaway; broll-split → reach-split; reel-frame, timeline → pull-back; liquid-glass-graph → glass-graph; plus glass-widgets, tier-list, over-the-shoulder-zoom). |
| brody-01 | [Claude Prompt Pack 01](https://instagram.com/brodyautomates) by @brodyautomates (PDF) | 6 prompts. 1 added (freeze-frame); the other 5 match existing recipes: over-the-shoulder, glass-graph, tier-list, text-behind, color-grade → grade (swipe). |

**Adding a source:** add a row here with a short id, write one file per effect in `effects/` with `source: <id>` in its frontmatter, and add it to the effects table. Skip anything that does the same thing as an effect already listed.

## 🙏 Credits

- Effects come from the sources above. Recipes are rewritten as specs; follow the links for the originals.
- vibha-51 recipes are adapted from [claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects), © 2026 Vibha Ramprakash, MIT License.
- Preview music: "Sneaky Snitch" by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0.

## 🤝 Contributing

Issues and pull requests are welcome, especially new sources, new effects, and preview GIFs for the effects that don't have one yet.

## ⚖️ License

[MIT](LICENSE) © Alex Lou. The inspiri.flow logo and husky mascot are not covered by the licence.
