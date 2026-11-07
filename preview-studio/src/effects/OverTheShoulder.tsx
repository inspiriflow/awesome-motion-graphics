import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';
import { SANS, SERIF } from '../fonts';

// effects/over-the-shoulder.md: camera pushes over the left ear for BEFORE, swings right for AFTER, settles.
// Shoulders are off-frame on the mascot, so cards sit above the ears, behind the head.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const io = Easing.inOut(Easing.cubic);

// [frame, scale, tx, ty]; |tx| <= (s-1)*540, |ty| <= (s-1)*960 keeps the frame covered.
const KEYS = [
  [0, 1, 0, 0], [5, 1, 0, 0], [20, 1.3, 160, 250], [27, 1.31, 158, 262],
  [36, 1.12, 0, 100], [46, 1.3, -160, 250], [55, 1.31, -158, 262], [70, 1, 0, 0], [90, 1, 0, 0],
];
const cam = (f: number) => [1, 2, 3].map((k) => interpolate(f, KEYS.map((r) => r[0]), KEYS.map((r) => r[k]), { ...clamp, easing: io }));

const Card: React.FC<{ x: number; at: number; label: string; value: string; f: number }> = ({ x, at, label, value, f }) => {
  const p = interpolate(f, [at, at + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.2)) });
  return (
    <div
      style={{
        position: 'absolute', left: x, top: 400, width: 360, height: 270, borderRadius: 36, overflow: 'hidden',
        background: 'rgba(16,15,14,0.55)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        border: '1.5px solid rgba(255,255,255,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
        opacity: interpolate(f, [at, at + 5], [0, 1], clamp), transform: `scale(${0.8 + 0.2 * p})`, fontFamily: SANS, color: '#fff', padding: '34px 38px',
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4, opacity: 0.6 }}>{label}</div>
      <div style={{ fontSize: 124, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, opacity: 0.75 }}>views</div>
    </div>
  );
};

export const OverTheShoulder = () => {
  const f = useCurrentFrame();
  const [s, tx, ty] = cam(f);
  const [s0, tx0, ty0] = cam(f - 1);
  const speed = Math.hypot(tx - tx0, ty - ty0) + Math.abs(s - s0) * 1500;
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#171513' }}>
      <AbsoluteFill style={{ transform: `translate(${tx}px, ${ty}px) scale(${s})`, filter: `blur(${Math.min(6, speed * 0.12)}px)` }}>
        <Room />
        <Card x={110} at={10} label="BEFORE" value="1,204" f={f} />
        <Card x={610} at={40} label="AFTER" value="412K" f={f} />
        <Husky />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
