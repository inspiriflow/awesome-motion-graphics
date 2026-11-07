---
name: glass-widgets
summary: Your room becomes a home screen — smoked-glass clock, now-playing and a notification at three depths
source: frame-15
needs: [mask, behind-me, music]
duration: 3s
tags: [glass, ui, depth]
---

## Inputs
- `[TIME]` (e.g. 9:41) and `[DAY]`
- `[SONG]`, `[ARTIST]`, `[AUDIO_FILE]` (real track under the video)
- `[APP_LOGO]`, `[APP_NAME]`, `[NOTIFICATION_TEXT]`
- `[ACCENT]` (e.g. `#D97757`) — used only on the app logo

## Build
Glass in linear light. Three big widgets (fewer + bigger = premium), one side of frame left empty.

**Glass recipe** (every widget): strong blur of the room inside the shape, ~3% magnified, thin outward-bent refraction band at the rim; smoked tint passing 35–45% with a slight cool lift; radius ~60 px (big) / 46 px (small); hairline border sampling the adjacent room colour, brighter top-left; shadow down-right, all consistent; faint top sheen + darker inner edge; text pure white over a soft dark copy of itself.

**Type**: bold display sans for numbers/titles (Bricolage Grotesque 750), clean sans for labels (~540 weight).

| Widget | Place / depth | Content |
|---|---|---|
| Clock | Wide, top of wall, furthest back | Huge `[TIME]`, small seconds on same baseline, `[DAY]` below. Real ticking: seconds start at 58. Changing digits slide up/out, new rise in, right-to-left stagger, slight vertical blur, slot width eases |
| Now playing | Tall card right, middle depth, where the hand rises | Label, big song, artist, pause icon, real-time progress bar, scrolling waveform from the real audio (~10 bars/s, played white, upcoming dim, faded ends) |
| Notification | Wide pill low across chest, nearest, IN FRONT of person | Logo in real colours, bold app name, dim "now", text below |

Depth: push 1.0→1.03 (eases in over 1 s, still moving at end); nearer widgets grow/drift more. Person sits between the back two and the notification; person casts a soft shadow onto glass behind.

## Timing (90 frames)
| Frames | What |
|---|---|
| 1–19 | Clock arrives (rise ~40 px, scale 94%→100%, strong ease-out, frost forms as text sharpens) |
| 6–24 | Now-playing arrives, same treatment |
| 16 | Seconds tick |
| 20–32 | Notification springs up from ~100 px lower, 92%→100%, ~0.4 s spring with slight settle, motion blur |
| 46–58 | Minute rolls over |
| 58–77 | One soft light sweep across all glass, brightest on rims |

Only real data. No weather, calendar, fake messages or numbers.
