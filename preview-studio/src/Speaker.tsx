import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';

// Stand-in for public/talking.mp4: the husky mascot. Its PNG alpha is the person mask,
// so "BehindMe" is just render order: <Room/>, graphic, <Husky/>.
// Talking-head framing: image scaled 1.75x so the shirt runs off the bottom edge (no empty floor).
// Head (from the PNG): x 99-974, ears top y 680, chin ~y 1500. Effects position against HEAD, like a head track.
export const HUSKY = { width: 1792, left: -356, top: 348 };
export const HEAD = { top: 680, bottom: 1500, left: 99, right: 974, cx: 540 };

const TALK = '011010011101001101100101110100110'; // ponytail: fixed pattern stands in for real lip-sync

export const Room = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(60% 35% at 78% 30%, rgba(255,214,170,0.22), transparent 70%),' + // lamp spill
        'linear-gradient(180deg, #2a2623 0%, #1f1c1a 62%, #171513 100%)',
    }}
  >
    <div style={{ position: 'absolute', left: 0, right: 0, top: 1180, height: 6, background: 'rgba(0,0,0,0.35)' }} />
  </AbsoluteFill>
);

export const Husky = ({ expression = 'neutral' }: { expression?: string }) => {
  const f = useCurrentFrame();
  const talking = TALK[Math.floor(f / 3) % TALK.length] === '1';
  const bob = Math.sin(f / 9) * 6;
  return (
    <Img
      src={staticFile(`mascot/${expression}${talking ? '-talk' : ''}.png`)}
      style={{ position: 'absolute', width: HUSKY.width, left: HUSKY.left, top: HUSKY.top + bob, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.45))' }}
    />
  );
};

// Light film grain, re-seeded every frame (house style rule 6).
export const Grain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ mixBlendMode: 'overlay', opacity: 0.18, pointerEvents: 'none' }}>
      <svg width="100%" height="100%">
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f} /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};
