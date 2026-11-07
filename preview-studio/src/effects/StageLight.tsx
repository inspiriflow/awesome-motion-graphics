import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Grain, HEAD, HUSKY, Husky, Room } from '../Speaker';
import { SANS } from '../fonts';

// effects/stage-light.md: room dims, a warm spot lands behind the head, a word is projected on the wall
// and cut by the head's shadow.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Husky PNG as a soft black silhouette (shadow caster). Follows the same bob as <Husky/>.
const Silhouette = ({ dx, dy, scale, blur, opacity }: { dx: number; dy: number; scale: number; blur: number; opacity: number }) => {
  const f = useCurrentFrame();
  return (
    <Img
      src={staticFile('mascot/neutral.png')}
      style={{
        position: 'absolute', width: HUSKY.width, left: HUSKY.left, top: HUSKY.top + Math.sin(f / 9) * 6,
        transform: `translate(${dx}px, ${dy}px) scale(${scale})`, transformOrigin: `${HEAD.cx - HUSKY.left}px 1000px`,
        filter: `brightness(0) blur(${blur}px)`, opacity,
      }}
    />
  );
};

export const StageLight = ({ word = 'Claude' }: { word?: string }) => {
  const f = useCurrentFrame();
  const down = interpolate(f, [1, 15], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const spot = interpolate(f, [14, 20], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const settle = 1 + 0.03 * Math.sin(interpolate(f, [20, 30], [0, Math.PI], clamp)); // tiny lamp settle
  const warm = interpolate(f, [14, 40], [0, 1], clamp);
  const wordIn = interpolate(f, [21, 37], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const push = interpolate(f, [0, 90], [1, 1.04], { easing: Easing.inOut(Easing.sin) });
  const haze = (f / 90) * 60;

  return (
    <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: '540px 1000px' }}>
      {/* ponytail: "-3 stops + cool shift" as a CSS filter on the room, not linear-light grading */}
      <AbsoluteFill style={{ filter: `brightness(${1 - 0.85 * down}) saturate(${1 - 0.4 * down}) hue-rotate(${-12 * down}deg)` }}>
        <Room />
      </AbsoluteFill>

      {/* spotlight pool on the wall behind head + shoulders */}
      <AbsoluteFill style={{ opacity: spot * settle, mixBlendMode: 'screen' }}>
        <div style={{
          position: 'absolute', left: 40, width: 1000, top: 60, height: 1400,
          background: `radial-gradient(50% 50% at 50% 50%, rgba(255,${226 - 12 * warm},${190 - 25 * warm},0.85), rgba(255,210,160,0.35) 50%, transparent 72%)`,
        }} />
        {/* faint beam from above through drifting haze */}
        <div style={{
          position: 'absolute', left: 240, width: 600, top: -100, height: 1300, opacity: 0.06,
          clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)',
          background: `repeating-radial-gradient(circle at ${30 + haze}% ${40 - haze / 3}%, #fff 0 40px, #bbb 90px, #fff 160px)`,
          filter: 'blur(60px)',
        }} />
      </AbsoluteFill>

      {/* person's soft shadow cast down-right inside the pool */}
      <Silhouette dx={60} dy={50} scale={1.02} blur={28} opacity={0.55 * spot} />

      {/* projected word: additive light, keystoned, cut by the head's shadow from the low front-left projector */}
      <AbsoluteFill style={{ mixBlendMode: 'screen', opacity: wordIn }}>
        <AbsoluteFill style={{ isolation: 'isolate' }}>
          <div style={{
            position: 'absolute', left: 120, width: 840, top: 250, textAlign: 'center',
            fontFamily: SANS, fontWeight: 800, fontSize: 250, letterSpacing: -6, lineHeight: 1,
            color: 'rgba(255,238,215,0.92)', filter: `blur(${14 * (1 - wordIn)}px)`,
            transform: 'perspective(1400px) rotateX(-16deg) rotateY(10deg) skewX(-4deg)', transformOrigin: '50% 100%',
          }}>
            {word}
          </div>
          <Silhouette dx={70} dy={-250} scale={1.04} blur={16} opacity={1} />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* person keeps their own light + gentle top light */}
      <Husky />
      <AbsoluteFill style={{
        mixBlendMode: 'soft-light', opacity: 0.5 * spot,
        background: `radial-gradient(40% 18% at 50% ${(HEAD.top - 40) / 19.2}%, rgba(255,230,200,0.9), transparent 70%)`,
      }} />
      <Grain />
    </AbsoluteFill>
  );
};
