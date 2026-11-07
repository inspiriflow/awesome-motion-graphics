---
name: reach-split
summary: Top half becomes a chalk board with your real reach chart; your shot eases into the bottom half, edgeless
source: frame-15
needs: []
duration: 3s
tags: [data, layout]
---

## Inputs
- `[DAILY_NUMBERS]` — e.g. accounts reached per day, last 4 weeks (from Instagram Professional dashboard)
- `[FOLLOWER_TOTAL]` over the same period

## Layout
- Background `#121213` + fine chalk grain over everything.
- Clip, 1–15: eases from full frame into the bottom half; top edge ~y 960 fading into charcoal over ~250 px (no visible line); 84 px side corners; head near y 1060.
- Graphic in the top half: solid to y 770, gone by y 940.

## Graphic
- Title "Accounts reached" (bold sans) + "last 4 weeks" (orange italic serif). Small glass chip: "+[FOLLOWER_TOTAL] followers | 4 weeks".
- Full-width daily line chart: thin gridlines, small round-number labels (0, 100K…), no dates. Line warm white 6 px, turning orange on the final climb; soft light under the curve.
- Peak: orange marker, peak number big bold with the "K" orange, italic "in one day" below.

## Timing (90 frames)
| Frames | What |
|---|---|
| 4–27 | Title rises word by word; gridlines draw from left |
| 9–31 | Line draws across quiet days |
| 31–41 | Line whips to peak, counter climbs with it, marker pops with one ring |
| 41–60 | "in one day" fades in; chip drops in and counts up |
| 52–80 | One light sweep along the line |
| →end | Marker breathes, slow push |

Round every number down.
