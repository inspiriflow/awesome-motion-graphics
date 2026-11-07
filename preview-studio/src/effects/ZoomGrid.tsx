import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';

// effects/zoom-grid.md: pull back to a 5x5 wall of moments, glide one tile across, dive into the neighbour.
// Camera = scale s + world centre (cx, cy); tiles are full-size 1080x1920 clips placed in world space.
const S_WALL = 0.288; // ~3.3 tiles across with 16 px screen gaps
const GAP = 16 / S_WALL;
const PX = 1080 + GAP;
const PY = 1920 + GAP;
const EXPR = ['neutral', 'excited', 'shocked', 'skeptical', 'thinking', 'laughing', 'pointing', 'proud'];
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const inOut = Easing.inOut(Easing.cubic);

const camera = (f: number) => {
  const pull = interpolate(f, [12, 40], [0, 1], { ...clamp, easing: inOut });
  const glide = interpolate(f, [40, 60], [0, 1], { ...clamp, easing: inOut });
  const push = interpolate(f, [60, 80], [0, 1], { ...clamp, easing: inOut });
  const s = Math.exp(Math.log(S_WALL) * (pull - push)); // exponential zoom feels constant-speed
  return {
    s,
    cx: glide * PX,
    cy: -Math.sin(glide * Math.PI) * 0.18 * PY, // gentle arc
    rotY: Math.sin(glide * Math.PI) * -8,
    radius: 28 * (pull - push),
  };
};

const Tile = ({ i, j, radius }: { i: number; j: number; radius: number }) => {
  const k = (i + 2) * 5 + (j + 2);
  const centre = i === 0 && j === 0;
  const next = i === 1 && j === 0;
  const expression = centre ? 'neutral' : next ? 'excited' : EXPR[(k * 3) % EXPR.length];
  return (
    <div style={{ position: 'absolute', left: i * PX - 540, top: j * PY - 960, width: 1080, height: 1920, overflow: 'hidden', borderRadius: radius }}>
      <Sequence from={centre ? 0 : -((k * 37) % 300)} layout="none">
        <Room />
        <Husky expression={expression} />
      </Sequence>
    </div>
  );
};

export const ZoomGrid = () => {
  const f = useCurrentFrame();
  const c = camera(f);
  const p = camera(f - 1);
  // motion blur: directional along the move, in screen px
  const bx = Math.min(14, Math.abs(c.cx - p.cx) * c.s * 0.5 + Math.abs(Math.log(c.s / p.s)) * 60);
  const by = Math.min(14, Math.abs(c.cy - p.cy) * c.s * 0.5 + Math.abs(Math.log(c.s / p.s)) * 60);
  const tiles = [];
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) tiles.push(<Tile key={`${i}${j}`} i={i} j={j} radius={c.radius / c.s} />);

  return (
    <AbsoluteFill style={{ background: '#0b0b0c' }}>
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <filter id="zg-mb"><feGaussianBlur stdDeviation={`${bx} ${by}`} /></filter>
      </svg>
      <AbsoluteFill style={{ filter: bx + by > 0.3 ? 'url(#zg-mb)' : undefined }}>
        <AbsoluteFill style={{ transform: `perspective(2400px) rotateY(${c.rotY}deg)` }}>
          <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(540px, 960px) scale(${c.s}) translate(${-c.cx}px, ${-c.cy}px)` }}>
            {tiles}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
