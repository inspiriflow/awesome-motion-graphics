import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/zoom-through.md: giant two-line word, camera flies through the O of NOW into the shot.
// The O is drawn as an SVG ring so its counter geometry is known exactly (that ellipse is the clear window).
const O = { cx: 540, cy: 1250, rx: 118, ry: 132, stroke: 50 }; // counter sits over the eyes/muzzle
const IN = { rx: O.rx - O.stroke / 2, ry: O.ry - O.stroke / 2 };
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Clip = () => (
  <AbsoluteFill>
    <Room />
    <Husky expression="excited" />
  </AbsoluteFill>
);

export const ZoomThrough = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [10, 46], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const s = f < 10 ? interpolate(f, [0, 10], [1, 1.03], clamp) : 1.03 * Math.pow(60, t);
  const sPrev = f <= 10 ? 1 : 1.03 * Math.pow(60, interpolate(f - 1, [10, 46], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) }));
  const speed = Math.log(s / sPrev); // log-scale velocity, ~0.2 at peak
  const wordBlur = Math.min(40, speed * 60 + Math.max(0, Math.log(s)) * 3); // zoom blur + defocus near camera
  const frost = interpolate(t, [0, 0.75], [1, 0], clamp);
  const push = f < 46 ? interpolate(f, [0, 10], [1, 1.03], clamp) : interpolate(f, [46, 90], [1, 1.05], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shot = { transform: `scale(${push})`, transformOrigin: `${O.cx}px ${O.cy}px` };
  const winR = { rx: IN.rx * s, ry: IN.ry * s };

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* frosted clip */}
      <AbsoluteFill style={{ ...shot, filter: 'blur(30px) brightness(0.45)', opacity: frost }}>
        <Clip />
      </AbsoluteFill>
      {/* clear window through the O counter */}
      <AbsoluteFill style={{ ...shot, clipPath: f >= 46 ? 'none' : `ellipse(${winR.rx}px ${winR.ry}px at ${O.cx}px ${O.cy}px)` }}>
        <Clip />
      </AbsoluteFill>
      {f < 46 && (
        <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: `${O.cx}px ${O.cy}px`, filter: `blur(${wordBlur / s}px)` }}>
          <div style={{ position: 'absolute', left: 120, width: 840, top: 870, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 220, lineHeight: 1, letterSpacing: -6, color: '#F7F4EF' }}>
            WATCH
          </div>
          <div style={{ position: 'absolute', left: 0, width: 1080, top: O.cy - 125, height: 250, fontFamily: SANS, fontWeight: 800, fontSize: 320, lineHeight: "250px", color: '#F7F4EF' }}>
            <span style={{ position: 'absolute', right: 1080 - (O.cx - O.rx - 14), top: 0 }}>N</span>
            <span style={{ position: 'absolute', left: O.cx + O.rx + 8, top: 0 }}>W</span>
          </div>
          <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
            <ellipse cx={O.cx} cy={O.cy} rx={O.rx - O.stroke / 2} ry={O.ry - O.stroke / 2} fill="none" stroke="#F7F4EF" strokeWidth={O.stroke} />
          </svg>
        </AbsoluteFill>
      )}
      <Grain />
    </AbsoluteFill>
  );
};
