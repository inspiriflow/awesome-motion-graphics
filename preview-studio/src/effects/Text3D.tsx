import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/text-3d.md, preview fidelity: the spec's fallback (stacked copies scaled toward a vanishing point above frame).
const WORD = 'BUILD';
const COPIES = 40;
const DESK = 1730; // desk line / baseline, chest height under the chin
const BOX_TOP = 1360;

const shade = (k: number) => {
  // sides: 40% darker next to the face, 70% darker at the back
  const m = 0.6 - 0.3 * (k / COPIES);
  return `rgb(${Math.round(242 * m)},${Math.round(238 * m)},${Math.round(230 * m)})`;
};

export const Text3D = () => {
  const f = useCurrentFrame();
  const dolly = interpolate(f, [30, 90], [0, 1], { easing: Easing.inOut(Easing.sin), extrapolateLeft: 'clamp' });
  const rise = (i: number) =>
    interpolate(f, [i * 3, i * 3 + 16], [360, 0], { easing: Easing.bezier(0.22, 1.12, 0.36, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const landed = interpolate(f, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // One copy of the word; every letter carries its own rise.
  const word = (k: number) => (
    <div
      key={k}
      style={{
        position: 'absolute', left: 0, width: 1080, top: 0, height: DESK - BOX_TOP,
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        // depth step: scale toward a vanishing point ~2000 px above frame (letter tops visible, sides converge)
        transformOrigin: `540px ${-2000 - BOX_TOP}px`, transform: `scale(${1 - k * 0.00028})`,
        fontFamily: SANS, fontWeight: 800, fontSize: 250, lineHeight: 0.74, letterSpacing: -6,
        color: k === 0 ? '#F2EEE6' : shade(k),
      }}
    >
      {[...WORD].map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', transform: `translateY(${rise(i)}px)` }}>{ch}</span>
      ))}
    </div>
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + 0.04 * dolly})`, transformOrigin: '540px 1100px' }}>
        <Room />
        <Husky expression="proud" />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + 0.06 * dolly})`, transformOrigin: '540px 1100px' }}>
        {/* soft contact shadow on the invisible desk */}
        <div style={{ position: 'absolute', left: 150, width: 780, top: DESK - 22, height: 50, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', filter: 'blur(18px)', opacity: landed }} />
        {/* clip at the desk line so letters emerge from it */}
        <div style={{ position: 'absolute', left: 0, width: 1080, top: BOX_TOP, height: DESK - BOX_TOP + 4, overflow: 'hidden', filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.45))' }}>
          {Array.from({ length: COPIES + 1 }, (_, n) => word(COPIES - n))}
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
