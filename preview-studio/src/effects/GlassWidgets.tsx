import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';
import { ACCENT, SANS } from '../fonts';

// effects/glass-widgets.md: clock + now-playing behind the husky, notification in front.
// ponytail: glass = backdrop-filter blur + smoked tint + hairline + shadow (no refraction band / linear light).

// Peaks of music.mp3 from 28.0s, 10 bars/s (ffmpeg, max-abs per 0.1s).
const PEAKS = [0.34,0.26,0.25,0.34,0.34,0.21,0.42,0.60,0.23,0.25,0.88,0.42,0.25,0.13,0.16,0.25,0.46,0.52,0.21,0.12,0.36,0.30,0.17,1.00,0.86,0.45,0.26,0.18,0.15,0.13,0.35,0.73,0.49,0.32,0.15,0.10,0.07,0.76,0.86,0.44,0.22,0.10,0.09,0.05,0.62,0.86,0.25,0.15,0.13,0.12,0.10,0.70,0.80,0.79,0.53,0.29,0.24,0.23,0.41,0.38,0.22,0.39,0.44,0.30,0.14,0.83,0.61,0.41,0.14,0.18];
const SONG_START = 30; // seconds into the track at frame 0
const SONG_LEN = 136.6;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.out(Easing.exp);
const TEXT_SHADOW = '0 2px 10px rgba(0,0,0,0.45)';

const Glass: React.FC<{ x: number; y: number; w: number; h: number; r: number; arrive: number; sweep: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, w, h, r, arrive, sweep, children, style }) => (
  <div
    style={{
      position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, overflow: 'hidden',
      background: 'linear-gradient(160deg, rgba(60,64,72,0.42), rgba(20,22,26,0.5))',
      backdropFilter: `blur(${36 * arrive}px) saturate(1.2)`, WebkitBackdropFilter: `blur(${36 * arrive}px) saturate(1.2)`,
      border: '1.5px solid rgba(255,240,225,0.16)', borderTopColor: 'rgba(255,245,235,0.32)', borderLeftColor: 'rgba(255,245,235,0.28)',
      boxShadow: '18px 30px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 30px rgba(0,0,0,0.25)',
      opacity: arrive, ...style,
    }}
  >
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent 35%)' }} />
    {/* light sweep, positioned in frame space so it crosses all glass as one */}
    <div style={{ position: 'absolute', top: -200, bottom: -200, width: 220, left: sweep - x, transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)' }} />
    <div style={{ position: 'relative', width: '100%', height: '100%', color: '#fff', textShadow: TEXT_SHADOW, filter: `blur(${(1 - arrive) * 10}px)` }}>{children}</div>
  </div>
);

// Rolling digits: each changed char slides up/out, new one rises in, right-to-left stagger.
const Roll: React.FC<{ events: [number, string][]; f: number; style: React.CSSProperties }> = ({ events, f, style }) => {
  const cur = events.reduce((a, e, i) => (e[0] <= f ? i : a), 0);
  const prev = events[Math.max(0, cur - 1)][1];
  const [t0, next] = events[cur];
  return (
    <span style={{ display: 'inline-flex', fontVariantNumeric: 'tabular-nums', ...style }}>
      {next.split('').map((ch, i) => {
        const d = (next.length - 1 - i) * 2;
        const p = interpolate(f, [t0 + d, t0 + d + 8], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        const old = prev[i] ?? ch;
        if (old === ch || cur === 0) return <span key={i}>{ch}</span>;
        const vb = Math.sin(p * Math.PI) * 6;
        return (
          <span key={i} style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
            <span style={{ visibility: 'hidden' }}>{ch}</span>
            <span style={{ position: 'absolute', left: 0, top: 0, transform: `translateY(${-p * 100}%)`, opacity: 1 - p, filter: `blur(${vb}px)` }}>{old}</span>
            <span style={{ position: 'absolute', left: 0, top: 0, transform: `translateY(${(1 - p) * 100}%)`, opacity: p, filter: `blur(${vb}px)` }}>{ch}</span>
          </span>
        );
      })}
    </span>
  );
};

export const GlassWidgets = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const push = interpolate(f, [0, 110], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) }); // still moving at 90
  const arrive = (s: number) => interpolate(f, [s, s + 18], [0, 1], { ...clamp, easing: out });
  const aC = arrive(1);
  const aN = arrive(6);
  const sNotif = spring({ frame: f - 20, fps, config: { damping: 13, mass: 0.55, stiffness: 160 } });
  const notifBlur = Math.abs(sNotif - spring({ frame: f - 21, fps, config: { damping: 13, mass: 0.55, stiffness: 160 } })) * 40;
  const sweep = interpolate(f, [58, 77], [-500, 1500], clamp);

  const t = SONG_START + f / fps;
  const bar = t * 10 - 28 * 10; // index into PEAKS
  const BARS = 26;

  return (
    <AbsoluteFill style={{ transform: `scale(${1 + 0.03 * push})` }}>
      <Room />
      {/* Clock: wide, top, furthest back */}
      <div style={{ transform: `translateY(${(1 - aC) * 40}px) scale(${0.94 + 0.06 * aC})`, position: 'absolute', inset: 0, transformOrigin: '540px 240px' }}>
        <Glass x={120} y={110} w={840} h={260} r={60} arrive={aC} sweep={sweep}>
          <div style={{ position: 'absolute', left: 60, top: 10, fontFamily: SANS, fontWeight: 800, letterSpacing: -6, display: 'flex', alignItems: 'baseline' }}>
            <Roll f={f} events={[[0, '9:41'], [46, '9:42']]} style={{ fontSize: 172, lineHeight: 1.1 }} />
            <Roll f={f} events={[[0, '58'], [16, '59'], [46, '00']]} style={{ fontSize: 64, marginLeft: 22, letterSpacing: -1, opacity: 0.75 }} />
          </div>
          <div style={{ position: 'absolute', left: 64, bottom: 26, fontFamily: SANS, fontWeight: 500, fontSize: 40, opacity: 0.8 }}>Sunday, November 8</div>
        </Glass>
      </div>
      {/* Now playing: right, middle depth */}
      <div style={{ transform: `translateY(${(1 - aN) * 40 - 8 * push}px) scale(${0.94 + 0.06 * aN + 0.01 * push})`, position: 'absolute', inset: 0, transformOrigin: '740px 540px' }}>
        <Glass x={500} y={392} w={460} h={300} r={46} arrive={aN} sweep={sweep}>
          <div style={{ position: 'absolute', left: 38, top: 26, right: 38, fontFamily: SANS }}>
            <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: 2, opacity: 0.65 }}>NOW PLAYING</div>
            <div style={{ fontSize: 54, fontWeight: 800, letterSpacing: -1.5, marginTop: 6 }}>Sneaky Snitch</div>
            <div style={{ fontSize: 36, fontWeight: 500, opacity: 0.7, marginTop: 2 }}>Kevin MacLeod</div>
            {/* pause icon */}
            <div style={{ position: 'absolute', right: 0, top: 4, display: 'flex', gap: 8 }}>
              <div style={{ width: 10, height: 34, background: '#fff', borderRadius: 3 }} />
              <div style={{ width: 10, height: 34, background: '#fff', borderRadius: 3 }} />
            </div>
            {/* scrolling waveform, playhead at centre */}
            <div style={{ position: 'relative', height: 60, marginTop: 10, WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)' }}>
              {Array.from({ length: BARS + 1 }, (_, k) => {
                const idx = Math.floor(bar) - BARS / 2 + k;
                const v = PEAKS[Math.max(0, Math.min(PEAKS.length - 1, idx))];
                const x = (k - (bar % 1)) * (384 / BARS);
                return <div key={k} style={{ position: 'absolute', left: x, top: 30 - 27 * v - 3, width: 8, height: 54 * v + 6, borderRadius: 4, background: '#fff', opacity: idx <= bar ? 0.95 : 0.3 }} />;
              })}
            </div>
            <div style={{ height: 6, marginTop: 12, borderRadius: 3, background: 'rgba(255,255,255,0.22)' }}>
              <div style={{ height: '100%', width: `${(t / SONG_LEN) * 100}%`, borderRadius: 3, background: '#fff' }} />
            </div>
          </div>
        </Glass>
      </div>
      <Husky />
      {/* Notification: nearest, in front of the person */}
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '540px 1650px', transform: `translateY(${(1 - sNotif) * 100 - 14 * push}px) scale(${(0.92 + 0.08 * sNotif) * (1 + 0.02 * push)})`, filter: `blur(${notifBlur}px)`, opacity: interpolate(f, [20, 24], [0, 1], clamp) }}>
        <Glass x={120} y={1560} w={840} h={180} r={60} arrive={interpolate(f, [20, 28], [0.3, 1], clamp)} sweep={sweep}>
          <div style={{ position: 'absolute', left: 32, top: 32, width: 116, height: 116, borderRadius: 30, overflow: 'hidden', background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }}>
            <Img src={staticFile('logo.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', left: 178, right: 40, top: 34, fontFamily: SANS }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>inspiri<span style={{ color: ACCENT }}>.</span>flow</span>
              <span style={{ fontSize: 34, fontWeight: 500, opacity: 0.55 }}>now</span>
            </div>
            <div style={{ fontSize: 38, fontWeight: 500, opacity: 0.9, marginTop: 8 }}>Your export is ready to post</div>
          </div>
        </Glass>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
