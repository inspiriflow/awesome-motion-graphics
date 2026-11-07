import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { ACCENT } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/orbit.md, preview fidelity: CSS glass slabs on a projected 2D ellipse instead of ray-traced 3D.
// Shared with ReelOrbit (same ring geometry + spin curve).

const sp = (v: number, p: number) => Math.sign(v) * Math.abs(v) ** p;

// Ellipse around the oversized mascot head: front dips onto the chest, back lifts above the ears.
// Superellipse exponents push the 45° points out of the face box (x 300-780, y 1000-1400).
export const ringPoint = (deg: number, rx = 350) => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return {
    x: 540 + rx * sp(s, 0.7),
    y: 1110 + (c > 0 ? 500 : 640) * sp(c, 0.6),
    z: c, // +1 front, -1 back
    s,
  };
};

// Cumulative ring angle (deg): spin-up, soft overshoot to ~2x cruise near frame 13, settle by 30.
export const spinAngle = (f: number, cruise: number) => {
  let sum = 0;
  for (let i = 0; i < f; i++) {
    const w =
      i < 13
        ? 2 * Easing.out(Easing.cubic)(i / 13)
        : interpolate(i, [13, 30], [2, 1], { easing: Easing.inOut(Easing.sin), extrapolateRight: 'clamp' });
    sum += cruise * w;
  }
  return sum;
};

// Smoothed head track: Husky bobs sin(f/9)*6; ring follows ~50%.
export const headFollow = (f: number) => Math.sin(f / 9) * 3;

const SYMBOLS: Record<string, React.ReactNode> = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  comment: <path d="M5 12a7 7 0 1 1 3.2 5.9L4.5 19l1.2-3.4A7 7 0 0 1 5 12z" />,
  share: <path d="M20 4 3.5 10.5l6.5 2.5L20 4l-7.5 16-2.5-7" />,
  save: <path d="M6.5 4h11v16L12 15.5 6.5 20z" />,
  plus: <path d="M12 5v14M5 12h14" />,
};
const ORDER = ['heart', 'comment', 'share', 'save', 'plus'];

const Tile = ({ sym, size, lit, pop }: { sym: string; size: number; lit: number; pop: number }) => {
  const depth = size * 0.1;
  return (
    <div style={{ position: 'relative', width: size, height: size, transform: `scale(${pop})` }}>
      {/* slab thickness: darker copy offset down-right */}
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${depth * 0.5}px, ${depth}px)`, borderRadius: '30%', background: 'rgba(12,11,10,0.75)', boxShadow: '0 24px 40px rgba(0,0,0,0.4)' }} />
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '30%', overflow: 'hidden',
          background: 'linear-gradient(160deg, rgba(255,255,255,0.3) 0%, rgba(60,56,52,0.28) 45%, rgba(8,8,8,0.45) 100%)',
          backdropFilter: 'blur(6px) brightness(0.85)',
          border: '1.5px solid rgba(255,255,255,0.28)',
          boxShadow:
            'inset 3px 3px 0 rgba(255,255,255,0.5), inset -2px -2px 0 rgba(255,150,120,0.22), inset 0 -12px 22px rgba(0,0,0,0.35), inset 0 14px 18px rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: ACCENT, opacity: lit * 0.88 }} />
        <svg viewBox="0 0 24 24" width="50%" height="50%" style={{ position: 'absolute', left: '25%', top: '27%', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.35))' }}
          fill={sym === 'heart' && lit > 0.5 ? 'white' : 'none'} stroke="white" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          {SYMBOLS[sym]}
        </svg>
      </div>
    </div>
  );
};

export const Orbit = () => {
  const f = useCurrentFrame();
  const LIT_AT = 44;
  const base = spinAngle(f, 2) - spinAngle(LIT_AT, 2); // 1 rev / 6 s = 2°/frame; heart at front on frame 44
  const push = interpolate(f, [0, 90], [1, 1.035], { easing: Easing.bezier(0.45, 0, 0.8, 1) });
  const bob = headFollow(f);

  const tiles = ORDER.map((sym, i) => {
    const deg = base + i * 72;
    const p = ringPoint(deg);
    const size = 1.2 * (p.z > 0 ? 153 + 79 * p.z : 153 + 24 * p.z); // ponytail: 1.2x since the mascot head is ~2x a real head
    const t = f - (1 + i * 2);
    const appear = interpolate(t, [0, 12], [0, 1], { easing: Easing.out(Easing.exp), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const d = f - LIT_AT;
    const lit = sym === 'heart' ? interpolate(d, [0, 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
    const pop = sym === 'heart' && d > 0 ? 1 + 0.1 * Math.exp(-d / 4) * Math.sin((d * Math.PI) / 6) : 1;
    const back = p.z < 0 ? -p.z : 0;
    const swing = Math.max(-17, Math.min(17, p.s * 17));
    const node = (
      <div
        key={sym}
        style={{
          position: 'absolute', left: p.x - size / 2, top: p.y - size / 2 + bob,
          opacity: appear,
          transform: `perspective(900px) rotateY(${-swing}deg) rotateZ(${p.s * 6}deg) scale(${0.86 + 0.14 * appear})`,
          filter: `blur(${(1 - appear) * 8 + back * 2.6}px) brightness(${1 - back * 0.36})`,
        }}
      >
        <Tile sym={sym} size={size} lit={lit} pop={pop} />
      </div>
    );
    return { node, z: p.z };
  }).sort((a, b) => a.z - b.z);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Room />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 260, height: 1920, background: 'radial-gradient(50% 40% at 100% 40%, rgba(220,70,50,0.18), transparent 70%)' }} />
      {tiles.filter((t) => t.z <= 0).map((t) => t.node)}
      <Husky expression="excited" />
      {tiles.filter((t) => t.z > 0).map((t) => t.node)}
      <Grain />
    </AbsoluteFill>
  );
};
