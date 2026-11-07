import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Grain, HEAD, Husky, Room } from '../Speaker';

// effects/text-behind.md: huge word rises from behind the head, holds with a slow lift, drops away.
export const TextBehind = ({ word = 'VIRAL' }: { word?: string }) => {
  const f = useCurrentFrame();
  const out = Easing.out(Easing.exp);
  const rise = interpolate(f, [0, 10], [140, 0], { easing: out, extrapolateRight: 'clamp' });
  const lift = interpolate(f, [10, 75], [0, -20], { easing: Easing.inOut(Easing.sin), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const drop = interpolate(f, [75, 90], [0, 160], { easing: Easing.in(Easing.cubic), extrapolateLeft: 'clamp' });
  const opacity = interpolate(f, [0, 10, 75, 90], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const blur = interpolate(f, [0, 10, 75, 90], [24, 0, 0, 14], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Room />
      <div
        style={{
          position: 'absolute', left: 120, width: 840, top: HEAD.top - 330, textAlign: 'center', // glyph bottoms sit just under the ear tips
          fontFamily: 'Impact, "Anton", "Arial Narrow", sans-serif', fontSize: 330, lineHeight: 1, letterSpacing: -4,
          color: '#F4F1EC', opacity, filter: `blur(${blur}px)`,
          transform: `translateY(${rise + lift + drop}px)`,
          textShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >
        {word}
      </div>
      <Husky />
      <Grain />
    </AbsoluteFill>
  );
};
