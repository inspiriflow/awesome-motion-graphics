import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';
import { headFollow, ringPoint, spinAngle } from './Orbit';

// effects/reel-orbit.md, preview fidelity: fake covers (mascot expressions on flat colour), projected 2D ellipse + CSS tilt.
const REELS = [
  { face: 'shocked', bg: '#3b4a5c', views: '2.4M' },
  { face: 'laughing', bg: '#5c3b3b', views: '1.1M' },
  { face: 'pointing', bg: '#3d5240', views: '873K' },
  { face: 'proud', bg: '#58503a', views: '628K' },
  { face: 'thinking', bg: '#4a3d58', views: '412K' },
  { face: 'skeptical', bg: '#3a5555', views: '305K' },
];

const Card = ({ w, reel, glint }: { w: number; reel: (typeof REELS)[number]; glint: number }) => (
  <div style={{ width: w, height: (w * 16) / 9, borderRadius: w * 0.09, overflow: 'hidden', position: 'relative', background: reel.bg, boxShadow: '0 24px 40px rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
    <Img src={staticFile(`mascot/${reel.face}.png`)} style={{ position: 'absolute', width: '190%', left: '-45%', top: '18%' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55))' }} />
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${glint * 100 - 18}%, rgba(255,255,255,0.32) ${glint * 100}%, transparent ${glint * 100 + 18}%)` }} />
    <div style={{ position: 'absolute', left: w * 0.06, bottom: w * 0.07, padding: `${w * 0.025}px ${w * 0.06}px`, borderRadius: 999, background: 'rgba(10,10,10,0.72)', display: 'flex', alignItems: 'center', gap: w * 0.03, color: 'white', fontFamily: SANS, fontWeight: 700, fontSize: w * 0.15, letterSpacing: -0.5 }}>
      <svg viewBox="0 0 10 10" width={w * 0.1} height={w * 0.1}><path d="M2 1l7 4-7 4z" fill="white" /></svg>
      {reel.views}
    </div>
  </div>
);

export const ReelOrbit = () => {
  const f = useCurrentFrame();
  const BEST_AT = 45;
  const step = 360 / REELS.length;
  const base = spinAngle(f, 2) - spinAngle(BEST_AT, 2);
  const push = interpolate(f, [0, 90], [1, 1.035], { easing: Easing.bezier(0.45, 0, 0.8, 1) });
  const bob = headFollow(f);

  const cards = REELS.map((reel, i) => {
    const p = ringPoint(base + i * step, 340);
    const w = p.z > 0 ? 160 + 80 * p.z : 160 + 40 * p.z; // ~1.5x at front, smaller at back
    const appear = interpolate(f - (1 + i * 3), [0, 12], [0, 1], { easing: Easing.out(Easing.exp), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const back = p.z < 0 ? -p.z : 0;
    const node = (
      <div
        key={i}
        style={{
          position: 'absolute', left: p.x - w / 2, top: p.y - (w * 16) / 18 + 60 * Math.max(p.z, 0) + bob,
          opacity: appear,
          transform: `perspective(1000px) rotateY(${-p.s * 16}deg) rotateZ(${p.s * 6}deg) scale(${0.88 + 0.12 * appear})`,
          filter: `blur(${(1 - appear) * 8 + back * 2.6}px) brightness(${1 - back * 0.36})`,
        }}
      >
        <Card w={w} reel={reel} glint={p.z > 0 ? interpolate(p.s, [-0.6, 0.6], [-0.3, 1.3]) : -1} />
      </div>
    );
    return { node, z: p.z };
  }).sort((a, b) => a.z - b.z);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Room />
      {cards.filter((c) => c.z <= 0).map((c) => c.node)}
      <Husky expression="proud" />
      {cards.filter((c) => c.z > 0).map((c) => c.node)}
      <Grain />
    </AbsoluteFill>
  );
};
