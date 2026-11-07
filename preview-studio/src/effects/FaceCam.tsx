import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { ACCENT, SANS, SERIF } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/face-cam.md (preview fidelity): clip settles into a creator panel, head breaks out over its top edge,
// headline words rise out of an invisible mask. ponytail: CSS blur from velocity stands in for motion blur.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const EASE = Easing.inOut(Easing.cubic);
const S = 936 / 1080;
const END = { x: 72, y: 1190, w: 936, ty: 1150 - 680 * S }; // head top 40 px above the panel

export const FaceCam = () => {
  const f = useCurrentFrame();
  const at = (t: number) => EASE(interpolate(t, [0, 24], [0, 1], clamp));
  const m = at(f);
  const v = at(f + 0.5) - at(f - 0.5);
  const lerp = (a: number, b: number) => a + (b - a) * m;
  const rx = lerp(0, END.x), ry = lerp(0, END.y), rw = lerp(1080, END.w), rr = lerp(0, 40);
  const push = interpolate(f, [24, 90], [1, 1.018], { ...clamp, easing: Easing.inOut(Easing.sin) });
  let s = lerp(1, S), tx = lerp(0, END.x), ty = lerp(0, END.ty);
  const ax = tx + 540 * s, ay = ty + 680 * s; // push anchored at head top so the break-out stays put
  s *= push; tx = ax - 540 * s; ty = ay - 680 * s;
  const clipT = `translate(${tx}px, ${ty}px) scale(${s})`;
  const breakOpacity = interpolate(ry - ay, [0, 30], [0, 1], clamp);

  const lines = [
    { y: 540, words: [{ t: 'Claude', a: true }, { t: 'can' }, { t: 'edit' }], style: { fontFamily: SANS, fontWeight: 800, fontSize: 98, letterSpacing: -3 } },
    { y: 670, words: [{ t: 'your' }, { t: 'videos' }, { t: 'now' }], style: { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 110 } },
  ];

  let idx = 0;
  return (
    <AbsoluteFill style={{ background: '#121213' }}>
      {lines.map((l, li) => (
        <div key={li} style={{ position: 'absolute', left: 120, width: 840, top: l.y, textAlign: 'center', color: '#F4F1EC', lineHeight: 1.15, ...l.style }}>
          {l.words.map((w) => {
            const st = 14 + 4 * idx++;
            const p = interpolate(f, [st, st + 9], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
            const vel = interpolate(f, [st, st + 4, st + 9], [1, 0.4, 0], clamp);
            return (
              <span key={w.t} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', padding: '0 12px 10px' }}>
                <span style={{ display: 'inline-block', transform: `translateY(${115 * (1 - p)}%)`, filter: `blur(${vel * 6}px)`, color: w.a ? ACCENT : undefined }}>
                  {w.t}
                </span>
              </span>
            );
          })}
        </div>
      ))}

      <div
        style={{
          position: 'absolute', left: rx, top: ry, width: rw, height: 1925 - ry, borderRadius: rr, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55)', filter: v > 0.01 ? `blur(${v * 40}px)` : undefined,
        }}
      >
        <div style={{ position: 'absolute', left: -rx, top: -ry, width: 1080, height: 1920, transform: clipT, transformOrigin: '0 0' }}>
          <Room />
          <Husky />
        </div>
        <div style={{ position: 'absolute', inset: 0, borderRadius: rr, border: `2px solid rgba(255,255,255,${0.15 * m})` }} />
      </div>

      <AbsoluteFill style={{ clipPath: `inset(0 0 ${1920 - (ry + 16)}px 0)`, opacity: breakOpacity }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transform: clipT, transformOrigin: '0 0' }}>
          <Husky />
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
