import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import type { CSSProperties } from 'react';
import { ACCENT, SANS, SERIF } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/kallaway.md (preview fidelity): shot shrinks into a bottom panel, head breaks out over the edge,
// logo builds from 12 conic wedges in star order + headline streams in word by word.
// ponytail: no optical-flow mask smoothing (PNG alpha is clean), no 10-copy thickness, CSS blur stands in for sub-frame motion blur.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const MOVE = Easing.bezier(0.6, 0, 0.3, 1);
const out = Easing.out(Easing.exp);
const S = 938 / 1080;
const END = { x: 71, y: 1410, w: 938, ty: 1310 - 680 * S }; // head top lands at y 1310
const WEDGES = 12;

export const Kallaway = () => {
  const f = useCurrentFrame();
  const m = MOVE(interpolate(f, [3, 22], [0, 1], clamp));
  const v = MOVE(interpolate(f + 0.5, [3, 22], [0, 1], clamp)) - MOVE(interpolate(f - 0.5, [3, 22], [0, 1], clamp));
  const lerp = (a: number, b: number) => a + (b - a) * m;
  // panel rect (screen) and clip transform screen = T + local * s
  const rx = lerp(0, END.x), ry = lerp(0, END.y), rw = lerp(1080, END.w), rr = lerp(0, 40);
  const push = interpolate(f, [22, 84], [1, 1.02], { ...clamp, easing: Easing.inOut(Easing.sin) });
  let s = lerp(1, S), tx = lerp(0, END.x), ty = lerp(0, END.ty);
  const ax = tx + 540 * s, ay = ty + 680 * s; // push anchored at head top
  s *= push; tx = ax - 540 * s; ty = ay - 680 * s;
  const clipT = `translate(${tx}px, ${ty}px) scale(${s})`;
  const mblur = v * 40;
  const breakOpacity = interpolate(ry - ay, [0, 60], [0, 1], clamp);

  // graphic
  const g = interpolate(f, [10, 31], [0, 1], { ...clamp, easing: out });
  const tilt = interpolate(f, [10, 50], [1, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const rot = interpolate(f, [10, 47], [-58, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const gpush = interpolate(f, [10, 84], [1, 1.03], clamp);
  const sweep = interpolate(f, [46, 68], [-1, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });

  const words = [
    { t: 'Edits', line: 0 }, { t: 'that', line: 0 }, { t: 'look', line: 0, a: true }, { t: 'expensive', line: 1, a: true },
  ];

  return (
    <AbsoluteFill style={{ background: '#121213' }}>
      {/* graphic group centred at (540, 664) */}
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${gpush})`, transformOrigin: '540px 664px', mixBlendMode: 'screen' }}>
        <div style={{ position: 'absolute', left: 300, top: 263, width: 480, height: 480, perspective: 1400 }}>
          <div
            style={{
              position: 'absolute', inset: 0,
              filter: `blur(${11 * (1 - g)}px)`,
              transform: `scale(${0.84 + 0.16 * g}) rotateX(${12 * tilt}deg) rotateY(${-26 * tilt}deg) rotate(${rot}deg)`,
            }}
          >
            {Array.from({ length: WEDGES }, (_, k) => {
              const i = (k * 5) % WEDGES; // star order: 150° between successive pieces
              const p = out(interpolate(f, [10 + k * 0.55, 25 + k * 0.55], [0, 1], clamp));
              const crest = Math.max(0, Math.sin(((f - 22) / 13) * Math.PI - i * 0.5)) * (f >= 22 && f <= 48 ? 1 : 0);
              const a = i * (360 / WEDGES);
              const mask = `conic-gradient(from ${a}deg at 50% 50%, #000 0deg ${360 / WEDGES + 1}deg, transparent ${360 / WEDGES + 1}deg)`;
              return (
                <Img
                  key={i}
                  src={staticFile('logo.png')}
                  style={{
                    position: 'absolute', inset: 0, width: 480, height: 480, opacity: p,
                    WebkitMaskImage: mask, maskImage: mask,
                    transform: `scale(${p * (1 + 0.075 * crest)})`,
                  }}
                />
              );
            })}
            {/* light sweep, clipped to the logo by the logo's own luminance */}
            <div
              style={{
                position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: f >= 46 && f <= 68 ? 0.44 : 0,
                background: `linear-gradient(120deg, transparent ${30 + sweep * 60}%, rgba(255,240,225,1) ${50 + sweep * 60}%, transparent ${70 + sweep * 60}%)`,
                WebkitMaskImage: `url(${staticFile('logo.png')})`, WebkitMaskSize: '100% 100%', WebkitMaskMode: 'luminance',
                maskImage: `url(${staticFile('logo.png')})`, maskSize: '100% 100%', maskMode: 'luminance',
              } as CSSProperties}
            />
          </div>
        </div>
        {[0, 1].map((line) => (
          <div
            key={line}
            style={{
              position: 'absolute', left: 120, width: 840, top: line ? 953 : 847, textAlign: 'center',
              fontFamily: SANS, fontWeight: 800, fontSize: 96, letterSpacing: -3, lineHeight: 1, color: '#F4F1EC',
            }}
          >
            {words.map((w, i) => {
              if (w.line !== line) return null;
              const st = 17 + i * 3.75;
              const p = interpolate(f, [st, st + 11], [0, 1], { ...clamp, easing: Easing.out(Easing.poly(5)) });
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block', margin: '0 12px', opacity: p, filter: `blur(${11 * (1 - p)}px)`,
                    transform: `translateY(${20 * (1 - p)}px)`,
                    ...(w.a ? { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 106, letterSpacing: -1, color: ACCENT } : {}),
                  }}
                >
                  {w.t}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* panel: the clip, clipped */}
      <div
        style={{
          position: 'absolute', left: rx, top: ry, width: rw, height: 1925 - ry, borderRadius: rr, overflow: 'hidden',
          filter: mblur > 0.3 ? `blur(${mblur}px)` : undefined,
        }}
      >
        <div style={{ position: 'absolute', left: -rx, top: -ry, width: 1080, height: 1920, transform: clipT, transformOrigin: '0 0' }}>
          <Room />
          <Husky />
        </div>
      </div>

      {/* head break-out: same husky, only above the panel edge (+16 px overlap) */}
      <AbsoluteFill style={{ clipPath: `inset(0 0 ${1920 - (ry + 16)}px 0)`, opacity: breakOpacity }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transform: clipT, transformOrigin: '0 0' }}>
          <Husky />
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
