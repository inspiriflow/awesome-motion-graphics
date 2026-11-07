---
name: pull-back
summary: Camera pulls back until your shot is the monitor of an editing suite with a real timeline building below
source: frame-15
needs: [music]
duration: 3s
tags: [camera, ui]
---

## Inputs
- `[FX_NAMES]` — five effect names for the FX track
- Music at `public/music.mp3`

## Build
- **Move**: from full frame, dolly back (exponential scale, in-out, motion blur) until the clip is the program monitor at ~72% size near the top, still playing; corners round in.
- **Suite**: `#121213` + chalk grain. Glass timeline panel below (x 56–1024, radius 40) containing:
  - timecode + playhead in sync with the monitor;
  - FX track: named clips drop in and snap one after another, orange `#F69963` (the only accent);
  - V1: filmstrip of real frames, split at real jump cuts;
  - A1: real waveform computed from the music file;
  - render bar that fills, then becomes a small "Rendered" pill.
- Everything rises and snaps with fast ease-outs. Every number shown is real.
