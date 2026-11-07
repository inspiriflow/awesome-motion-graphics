import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { ACCENT, SANS, SERIF } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/reach-split.md (preview fidelity): chalk-board reach chart in the top half, shot eases edgeless into the bottom half.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.out(Easing.exp);
// ponytail: made-up 4 weeks of daily reach; swap in the real Instagram numbers.
const DAYS = [12e3, 9e3, 14e3, 18e3, 11e3, 8e3, 16e3, 22e3, 19e3, 13e3, 10e3, 17e3, 25e3, 21e3, 15e3, 12e3, 20e3, 28e3, 24e3, 18e3, 14e3, 23e3, 30e3, 26e3, 58e3, 121e3, 204e3, 312e3];
const PEAK = DAYS.length - 1;
const CLIMB = 23; // index where the line turns orange
const C = { x0: 120, x1: 960, y0: 900, y1: 560, max: 320e3 };
const X = (i: number) => C.x0 + (i / PEAK) * (C.x1 - C.x0);
const Y = (n: number) => C.y0 - (n / C.max) * (C.y0 - C.y1);
const fmt = (n: number) => `${Math.floor(n / 1000)}K`;

// points of the line up to fractional index t
const pts = (from: number, t: number) => {
  const p: [number, number][] = [];
  for (let i = from; i <= Math.floor(t); i++) p.push([X(i), Y(DAYS[i])]);
  const fl = Math.floor(t);
  if (t > fl && fl < PEAK) p.push([X(t), Y(DAYS[fl] + (DAYS[fl + 1] - DAYS[fl]) * (t - fl))]);
  return p;
};
const path = (p: [number, number][]) => p.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

export const ReachSplit = () => {
  const f = useCurrentFrame();
  const m = Easing.inOut(Easing.cubic)(interpolate(f, [1, 15], [0, 1], clamp));
  const s = 1 - 0.08 * m, ty = (1060 - 680 * s) * m, tx = 540 * (1 - s);
  const fadeTop = 960 * m;

  // line head: quiet days 9–31, whip to peak 31–41
  const t = f < 31 ? interpolate(f, [9, 31], [0, CLIMB], { ...clamp, easing: Easing.inOut(Easing.sin) })
    : interpolate(f, [31, 41], [CLIMB, PEAK], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const all = pts(0, t);
  const quiet = pts(0, Math.min(t, CLIMB));
  const climb = t > CLIMB ? pts(CLIMB, t) : [];
  const head = all[all.length - 1];
  const headVal = DAYS[Math.floor(t)] + (Math.floor(t) < PEAK ? (DAYS[Math.floor(t) + 1] - DAYS[Math.floor(t)]) * (t - Math.floor(t)) : 0);
  const counter = f < 31 ? 0 : Math.floor(Math.max(...DAYS.slice(0, Math.floor(t) + 1), headVal));
  const pop = interpolate(f, [41, 47], [0, 1], { ...clamp, easing: Easing.out(Easing.back(0.4)) });
  const ring = interpolate(f, [41, 58], [0, 1], clamp);
  const breathe = f > 47 ? 1 + 0.06 * Math.sin((f - 47) / 6) : 1;
  const sweep = interpolate(f, [52, 80], [-0.2, 1.2], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const chip = interpolate(f, [41, 52], [0, 1], { ...clamp, easing: out });
  const followers = Math.floor(4180 * interpolate(f, [44, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const push = interpolate(f, [15, 90], [1, 1.02], clamp);
  const word = (st: number) => {
    const p = interpolate(f, [st, st + 10], [0, 1], { ...clamp, easing: out });
    return { display: 'inline-block', marginRight: 18, opacity: p, transform: `translateY(${40 * (1 - p)}px)` } as const;
  };

  return (
    <AbsoluteFill style={{ background: '#121213' }}>
      {/* the clip, edgeless: room fades into charcoal above y≈960 */}
      <div
        style={{
          position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 84 * m,
          WebkitMaskImage: `linear-gradient(180deg, transparent ${fadeTop}px, #000 ${fadeTop + 250 * m}px)`,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: '0 0' }}>
          <Room />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: '0 0' }}>
        <Husky />
      </div>

      {/* graphic: solid to y 770, gone by 940 */}
      <div
        style={{
          position: 'absolute', inset: 0, transform: `scale(${push})`, transformOrigin: '540px 600px',
          WebkitMaskImage: 'linear-gradient(180deg, #000 770px, transparent 940px)',
        }}
      >
        <div style={{ position: 'absolute', left: 120, top: 250, fontFamily: SANS, fontWeight: 800, fontSize: 84, letterSpacing: -3, color: '#F4F1EC', lineHeight: 1 }}>
          <span style={word(4)}>Accounts</span>
          <span style={word(8)}>reached</span>
        </div>
        <div style={{ position: 'absolute', left: 120, top: 345, fontFamily: SERIF, fontStyle: 'italic', fontSize: 64, color: ACCENT, lineHeight: 1 }}>
          <span style={word(12)}>last</span>
          <span style={word(15)}>4</span>
          <span style={word(18)}>weeks</span>
        </div>
        <div
          style={{
            position: 'absolute', left: 120, top: 440, padding: '12px 26px', borderRadius: 40,
            background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(12px)',
            fontFamily: SANS, fontWeight: 600, fontSize: 36, color: '#F4F1EC',
            opacity: chip, transform: `translateY(${-30 * (1 - chip)}px)`,
          }}
        >
          +{followers.toLocaleString('en-US')} followers <span style={{ opacity: 0.45 }}>|</span> 4 weeks
        </div>

        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="rs-under" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE9D6" stopOpacity={0.22} />
              <stop offset="1" stopColor="#FFE9D6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="rs-sweep" gradientUnits="userSpaceOnUse" x1={X(0) + (sweep - 0.12) * 840} x2={X(0) + (sweep + 0.12) * 840} y1="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity={0} />
              <stop offset="0.5" stopColor="#fff" stopOpacity={0.9} />
              <stop offset="1" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          {[0, 100e3, 200e3, 300e3].map((n, i) => {
            const d = interpolate(f, [4 + i * 3, 20 + i * 3], [0, 1], { ...clamp, easing: out });
            return (
              <g key={n} opacity={0.9}>
                <line x1={C.x0} x2={C.x0 + 840 * d} y1={Y(n)} y2={Y(n)} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
                <text x={C.x0} y={Y(n) - 10} fill="rgba(255,255,255,0.45)" fontFamily={SANS} fontSize={34} opacity={d}>{n ? fmt(n) : '0'}</text>
              </g>
            );
          })}
          {all.length > 1 && <path d={`${path(all)} L${head[0]},${C.y0} L${C.x0},${C.y0} Z`} fill="url(#rs-under)" />}
          {quiet.length > 1 && <path d={path(quiet)} fill="none" stroke="#F4F1EC" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />}
          {climb.length > 1 && <path d={path(climb)} fill="none" stroke={ACCENT} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />}
          {f >= 52 && f <= 80 && <path d={path(all)} fill="none" stroke="url(#rs-sweep)" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />}
          {f >= 41 && (
            <g transform={`translate(${X(PEAK)}, ${Y(DAYS[PEAK])})`}>
              <circle r={14 + 50 * ring} fill="none" stroke={ACCENT} strokeWidth={3} opacity={1 - ring} />
              <circle r={14 * pop * breathe} fill={ACCENT} />
            </g>
          )}
        </svg>

        {f >= 31 && (
          <div style={{ position: 'absolute', right: 1080 - 900, top: 520, textAlign: 'right', fontFamily: SANS, fontWeight: 800, fontSize: 130, letterSpacing: -4, color: '#F4F1EC', lineHeight: 1 }}>
            {Math.floor(counter / 1000)}<span style={{ color: ACCENT }}>K</span>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 50, letterSpacing: 0, color: '#F4F1EC', opacity: interpolate(f, [41, 56], [0, 0.85], clamp), marginTop: 6 }}>
              in one day
            </div>
          </div>
        )}
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
