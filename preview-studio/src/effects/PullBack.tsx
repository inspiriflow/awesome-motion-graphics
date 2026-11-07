import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { ACCENT, SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/pull-back.md: dolly back until the shot is the program monitor of an editing suite,
// timeline builds below. A1 peaks: first 3 s of public/music.mp3, 60 bins, ffmpeg s16le max-abs, normalised.
const PEAKS = [0.32, 0.9, 0.9, 1.0, 0.76, 0.63, 0.59, 0.47, 0.51, 0.47, 0.34, 0.31, 0.41, 0.25, 0.3, 0.38, 0.29, 0.23, 0.19, 0.15, 0.13, 0.32, 0.21, 0.19, 0.16, 0.12, 0.1, 0.09, 0.37, 0.47, 0.47, 0.48, 0.34, 0.29, 0.31, 0.22, 0.16, 0.08, 0.12, 0.17, 0.16, 0.15, 0.42, 0.27, 0.25, 0.2, 0.13, 0.09, 0.06, 0.37, 0.27, 0.08, 0.08, 0.07, 0.07, 0.75, 0.96, 0.68, 0.64, 0.34];
const FX = ['Zoom', 'Pull', 'Blur', 'Grid', 'Grain'];
// V1 segments (frames of a 90-frame timeline) split at "jump cuts", each a different moment of the clip
const CUTS = [
  { from: 0, to: 34, expr: 'neutral' },
  { from: 34, to: 61, expr: 'pointing' },
  { from: 61, to: 90, expr: 'laughing' },
];
const MON = { scale: 0.72, top: 70 };
const P = { left: 56, right: 1024, top: 1470, bottom: 1890 };
const TRACK = { x: 210, w: 790 }; // timeline area inside the panel, 90 frames across
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.out(Easing.exp);

const tc = (f: number) => `00:00:${String(Math.floor(f / 30)).padStart(2, '0')}:${String(f % 30).padStart(2, '0')}`;
const fx = (f: number) => TRACK.x + (f / 90) * TRACK.w;

const Clip = ({ expr = 'neutral' }: { expr?: string }) => (
  <>
    <Room />
    <Husky expression={expr} />
  </>
);

const Label = ({ y, children }: { y: number; children: string }) => (
  <div style={{ position: 'absolute', left: 124, top: y, fontFamily: SANS, fontWeight: 700, fontSize: 34, color: 'rgba(255,255,255,0.55)' }}>{children}</div>
);

export const PullBack = () => {
  const f = useCurrentFrame();
  const move = interpolate(f, [6, 34], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const movePrev = interpolate(f - 1, [6, 34], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const s = Math.pow(MON.scale, move); // exponential scale
  const ty = move * (MON.top - (1920 - 1920 * MON.scale) / 2); // centre -> near top
  const blur = Math.abs(move - movePrev) * 40;
  const rise = (start: number) => interpolate(f, [start, start + 10], [80, 0], { ...clamp, easing: out });
  const fade = (start: number) => interpolate(f, [start, start + 6], [0, 1], clamp);
  const panelIn = 28;
  const renderFill = interpolate(f, [62, 80], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const done = f >= 81;

  return (
    <AbsoluteFill style={{ background: '#121213' }}>
      {/* program monitor */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, overflow: 'hidden', transform: `translateY(${ty}px) scale(${s})`, borderRadius: (move * 36) / s, filter: `blur(${blur}px)`, boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
        <Clip />
      </div>

      {/* glass timeline panel */}
      <div style={{ position: 'absolute', left: P.left, top: P.top, width: P.right - P.left, height: P.bottom - P.top, borderRadius: 40, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', boxShadow: '0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)', transform: `translateY(${rise(panelIn) * 2}px)`, opacity: fade(panelIn) }} />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${rise(panelIn) * 2}px)`, opacity: fade(panelIn) }}>
        {/* header: timecode + render bar */}
        <div style={{ position: 'absolute', left: 124, top: P.top + 26, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: '#F4F1EC', fontVariantNumeric: 'tabular-nums' }}>{tc(f)}</div>
        {!done ? (
          <div style={{ position: 'absolute', left: 620, top: P.top + 44, width: 330, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.12)', opacity: fade(58) }}>
            <div style={{ width: `${renderFill * 100}%`, height: '100%', borderRadius: 7, background: '#F4F1EC' }} />
          </div>
        ) : (
          <div style={{ position: 'absolute', right: 120, top: P.top + 24, padding: '4px 22px', borderRadius: 30, background: 'rgba(255,255,255,0.12)', fontFamily: SANS, fontWeight: 700, fontSize: 34, color: '#F4F1EC', transform: `scale(${interpolate(f, [81, 87], [0.8, 1], { ...clamp, easing: out })})` }}>Rendered</div>
        )}

        <Label y={P.top + 108}>FX</Label>
        <Label y={P.top + 200}>V1</Label>
        <Label y={P.top + 300}>A1</Label>

        {/* FX clips drop in and snap one after another */}
        {FX.map((name, i) => {
          const start = 38 + i * 5;
          const w = TRACK.w / FX.length - 8;
          return (
            <div key={name} style={{ position: 'absolute', left: TRACK.x + i * (w + 8), top: P.top + 100, width: w, height: 60, borderRadius: 12, background: ACCENT, color: '#1a1410', fontFamily: SANS, fontWeight: 700, fontSize: 34, lineHeight: '60px', paddingLeft: 14, boxSizing: 'border-box', transform: `translateY(${-rise(start) * 1.2}px)`, opacity: fade(start) }}>
              {name}
            </div>
          );
        })}

        {/* V1 filmstrip of real frames, split at jump cuts */}
        {CUTS.map((c, k) => {
          const x0 = fx(c.from) + (k ? 3 : 0);
          const x1 = fx(c.to) - 3;
          const th = 80;
          const tw = (th * 1080) / 1920;
          const n = Math.ceil((x1 - x0) / tw);
          return (
            <div key={k} style={{ position: 'absolute', left: x0, top: P.top + 190, width: x1 - x0, height: th, borderRadius: 10, overflow: 'hidden', display: 'flex', background: '#000', transform: `translateY(${rise(34 + k * 3)}px)`, opacity: fade(34 + k * 3) }}>
              {Array.from({ length: n }, (_, m) => (
                <div key={m} style={{ position: 'relative', flex: 'none', width: tw, height: th, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', width: 1080, height: 1920, transform: `scale(${th / 1920})`, transformOrigin: '0 0' }}>
                    <Sequence from={-(c.from + Math.round((m * 90 * tw) / TRACK.w))} layout="none">
                      <Clip expr={c.expr} />
                    </Sequence>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* A1 waveform from music.mp3 */}
        <div style={{ position: 'absolute', left: TRACK.x, top: P.top + 290, width: TRACK.w, height: 66, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 3, padding: '0 4px', boxSizing: 'border-box', transform: `translateY(${rise(40)}px)`, opacity: fade(40) }}>
          {PEAKS.map((p, i) => (
            <div key={i} style={{ flex: 1, height: Math.max(3, p * 58 * interpolate(f, [40 + i * 0.3, 48 + i * 0.3], [0, 1], { ...clamp, easing: out })), borderRadius: 2, background: 'rgba(244,241,236,0.75)' }} />
          ))}
        </div>

        {/* playhead in sync with the monitor */}
        <div style={{ position: 'absolute', left: fx(f) - 2, top: P.top + 90, width: 4, height: 280, borderRadius: 2, background: '#F4F1EC', boxShadow: '0 0 0 1px rgba(0,0,0,0.3)' }} />
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
