import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';
import { ACCENT, SANS, SERIF } from '../fonts';

// effects/glass-panels.md: four smoked-glass panels behind the husky show the edit itself.
// Mascot fills the frame below the ears, so the panels stack in the wall above the head.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.out(Easing.exp);
const CUTS = [9, 17, 31, 44, 58, 66, 79]; // ponytail: fake-but-plausible jump-cut frames (7)
const CMD = '/edit glass-panels';

const Panel: React.FC<{ x: number; y: number; w: number; h: number; at: number; depth: number; sweep: number; dim?: number; children: React.ReactNode }> = ({ x, y, w, h, at, depth, sweep, dim = 1, children }) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: out });
  const drift = Math.sin((f + depth * 40) / 40) * 6 * depth;
  return (
    <div
      style={{
        position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 28, overflow: 'hidden',
        background: 'rgba(10,10,12,0.55)', backdropFilter: 'blur(34px)', WebkitBackdropFilter: 'blur(34px)',
        border: '1.5px solid rgba(255,255,255,0.14)', boxShadow: '0 24px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
        opacity: a * dim, transform: `translate(${(1 - a) * -30 + drift}px, ${(1 - a) * 20 - depth * 4 * (f / 90)}px)`,
        fontFamily: SANS, color: '#fff',
      }}
    >
      <div style={{ position: 'absolute', top: -200, bottom: -200, width: 200, left: sweep - x, transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
      {children}
    </div>
  );
};

const Star: React.FC<{ rot: number }> = ({ rot }) => (
  <svg width={52} height={52} viewBox="-10 -10 20 20" style={{ transform: `rotate(${rot}deg)` }}>
    <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill={ACCENT} />
  </svg>
);
const Tick: React.FC<{ p: number; size?: number }> = ({ p, size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={11} fill={ACCENT} opacity={p} />
    <path d="M6.5 12.5 L10.5 16 L17.5 8.5" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
  </svg>
);

const tc = (f: number) => `00:00:${String(Math.floor(f / 30)).padStart(2, '0')}:${String(f % 30).padStart(2, '0')}`;

export const GlassPanels = () => {
  const f = useCurrentFrame();
  const push = interpolate(f, [0, 110], [1, 1.04], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const sweep = interpolate(f, [46, 72], [-400, 1500], clamp);
  const typed = Math.floor(interpolate(f, [3, 15], [0, CMD.length], clamp));
  const done = interpolate(f, [44, 50], [0, 1], { ...clamp, easing: out });
  const count = Math.round(interpolate(f, [15, 37], [0, CUTS.length], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const draw = interpolate(f, [24, 36], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const exportTick = interpolate(f, [36, 42], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Room />
      {/* Person mask: furthest, dimmer, tucked behind the left ear */}
      <Panel x={120} y={600} w={330} h={300} at={7} depth={0.4} sweep={sweep} dim={0.8}>
        <div style={{ position: 'absolute', left: 26, top: 20, fontSize: 34, fontWeight: 700 }}>Person mask</div>
        <div style={{ position: 'absolute', left: 26, top: 58, fontFamily: SERIF, fontStyle: 'italic', fontSize: 34, opacity: 0.7 }}>every frame</div>
        <div style={{ position: 'absolute', right: 22, top: 26, fontSize: 24, opacity: 0.55, fontVariantNumeric: 'tabular-nums' }}>f{String(f).padStart(3, '0')}</div>
        <Img src={staticFile('mascot/neutral.png')} style={{ position: 'absolute', left: -40, top: 110, width: 260, filter: 'brightness(0) invert(1)', opacity: 0.9, transform: `translateY(${Math.sin(f / 9) * 2}px)` }} />
      </Panel>
      {/* Export: right */}
      <Panel x={600} y={330} w={360} h={250} at={13} depth={0.7} sweep={sweep}>
        <svg width={70} height={124} style={{ position: 'absolute', left: 30, top: 34 }}>
          <rect x={3} y={3} width={64} height={114} rx={10} fill="none" stroke="#fff" strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        </svg>
        <div style={{ position: 'absolute', left: 124, top: 36, fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>1080 × 1920</div>
        <div style={{ position: 'absolute', left: 124, top: 88, fontSize: 34, fontWeight: 500, opacity: 0.65 }}>30 fps</div>
        <div style={{ position: 'absolute', left: 30, bottom: 26, fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, opacity: 0.8 }}>export</div>
        <div style={{ position: 'absolute', right: 26, bottom: 22 }}><Tick p={exportTick} /></div>
      </Panel>
      {/* Cuts: high left, nearest */}
      <Panel x={120} y={300} w={450} h={270} at={19} depth={1} sweep={sweep}>
        <div style={{ position: 'absolute', left: 30, top: 14, display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 110, fontWeight: 800, letterSpacing: -3, fontVariantNumeric: 'tabular-nums' }}>{count}</span>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 44, opacity: 0.85 }}>jump cuts</span>
        </div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 150, height: 48, borderRadius: 8, overflow: 'hidden', display: 'flex', gap: 3 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ flex: 1, background: '#2a2623', overflow: 'hidden', position: 'relative' }}>
              <Img src={staticFile('mascot/neutral.png')} style={{ position: 'absolute', width: 70, left: -8, top: 2 }} />
            </div>
          ))}
          {CUTS.slice(0, count).map((c) => (
            <div key={c} style={{ position: 'absolute', left: `${(c / 90) * 100}%`, top: 0, bottom: 0, width: 3, background: '#fff' }} />
          ))}
          <div style={{ position: 'absolute', left: `${(f / 90) * 100}%`, top: -2, bottom: -2, width: 5, background: ACCENT, borderRadius: 2 }} />
        </div>
        <div style={{ position: 'absolute', left: 30, top: 212, fontSize: 30, fontWeight: 500, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{tc(f)}</div>
      </Panel>
      {/* Prompt bar: wide, top */}
      <Panel x={120} y={130} w={840} h={130} at={0} depth={0.55} sweep={sweep}>
        <div style={{ position: 'absolute', left: 32, top: 39 }}>
          {done > 0 ? <Tick p={done} /> : <Star rot={interpolate(f, [15, 44], [0, 540], clamp)} />}
        </div>
        <div style={{ position: 'absolute', left: 110, top: 34, fontSize: 48, fontWeight: 700, letterSpacing: -0.5, whiteSpace: 'pre' }}>
          <span style={{ opacity: 0.45 }}>{CMD.slice(0, Math.min(typed, 5))}</span>
          {CMD.slice(5, typed)}
          {typed < CMD.length && f % 10 < 6 ? <span style={{ opacity: 0.7 }}>|</span> : null}
        </div>
        <div style={{ position: 'absolute', right: 34, top: 40, fontSize: 38, fontWeight: 700, color: ACCENT, opacity: done }}>Done</div>
      </Panel>
      <Husky />
      <Grain />
    </AbsoluteFill>
  );
};
