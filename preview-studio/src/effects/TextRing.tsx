import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';
import { headFollow } from './Orbit';

// effects/text-ring.md, preview fidelity: per-glyph projection + CSS rotateY, no real motion blur.
const TEXT = 'EDITED BY CLAUDE • ONE PROMPT • '.repeat(2);
const R = 420; // spec says ~270 for a real head; the mascot head is ~2x wider
const TILT = (20 * Math.PI) / 180;
const CAM = 1400;

export const TextRing = () => {
  const f = useCurrentFrame();
  // 0-18: ease from still up to 1 rev / 3 s (4°/frame), then cruise.
  let spin = 0;
  for (let i = 0; i < f; i++) spin += 4 * Easing.inOut(Easing.sin)(Math.min(1, i / 18));
  const cy = 800 + headFollow(f) * 2; // forehead/crown height, follows the bob
  const step = 360 / TEXT.length;

  const glyphs = [...TEXT].map((ch, i) => {
    const deg = -spin + i * step; // front moves right-to-left so the phrase reads like a marquee
    const a = (deg * Math.PI) / 180;
    const c = Math.cos(a);
    const s = CAM / (CAM - R * c);
    const node = (
      <div
        key={i}
        style={{
          position: 'absolute', left: 540 + R * Math.sin(a), top: cy + R * c * Math.sin(TILT),
          transform: `translate(-50%, -50%) scale(${s}) perspective(600px) rotateY(${deg}deg)`,
          fontFamily: SANS, fontWeight: 800, fontSize: 46, color: '#F4F1EC', letterSpacing: -0.5,
          opacity: c > 0 ? 1 : 0.35, filter: c > 0 ? undefined : 'blur(1.5px)',
          textShadow: c > 0 ? '0 16px 14px rgba(0,0,0,0.35)' : undefined, // soft shadow onto the hair
          whiteSpace: 'pre',
        }}
      >
        {ch}
      </div>
    );
    return { node, front: c > 0 };
  });

  const intro = interpolate(f, [0, 8], [0, 1], { easing: Easing.out(Easing.exp), extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <Room />
      <AbsoluteFill style={{ opacity: intro }}>{glyphs.filter((g) => !g.front).map((g) => g.node)}</AbsoluteFill>
      <Husky expression="laughing" />
      <AbsoluteFill style={{ opacity: intro }}>{glyphs.filter((g) => g.front).map((g) => g.node)}</AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
