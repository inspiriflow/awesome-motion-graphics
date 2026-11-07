import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';
import { ACCENT, SANS } from '../fonts';

// effects/glass-graph.md: frosted card rises at chest height, counter + line graph draw in sync.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const START = 1204;
const END = 412000;
const W = 680;
const H = 150;
// rising with a couple of small dips (0..1 in value)
const PTS = [0, 0.04, 0.1, 0.07, 0.2, 0.33, 0.27, 0.45, 0.62, 0.55, 0.78, 1].map((v, i, a) => [(i / (a.length - 1)) * W, H - v * (H - 12) - 6]);
const PATH = PTS.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');

const tipAt = (p: number) => {
  const x = p * W;
  const i = Math.min(PTS.length - 2, Math.floor(p * (PTS.length - 1)));
  const k = (x - PTS[i][0]) / (PTS[i + 1][0] - PTS[i][0]);
  return [x, PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * k];
};

export const GlassGraph = () => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.poly(5)) });
  const leave = interpolate(f, [80, 90], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const p = interpolate(f, [8, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const n = Math.round(START + (END - START) * p);
  const [tx, ty] = tipAt(p);
  const pulse = interpolate(f, [60, 78], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <Room />
      <Husky />
      <div
        style={{
          position: 'absolute', left: 160, top: 1480, width: 760, height: 400, borderRadius: 36, overflow: 'hidden',
          background: 'linear-gradient(rgba(255,255,255,0.10), rgba(255,255,255,0.06)), rgba(26,24,22,0.5)', backdropFilter: 'blur(40px) saturate(1.3)', WebkitBackdropFilter: 'blur(40px) saturate(1.3)',
          border: '1.5px solid rgba(255,255,255,0.22)', boxShadow: '0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
          opacity: enter * (1 - leave), transform: `translateY(${(1 - enter) * 60 + leave * 40}px)`, fontFamily: SANS,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.12), transparent 30%)' }} />
        <div style={{ position: 'absolute', left: 40, top: 30, fontSize: 34, fontWeight: 500, color: 'rgba(255,255,255,0.62)' }}>Views · last 30 days</div>
        <div style={{ position: 'absolute', left: 38, top: 66, fontSize: 112, fontWeight: 800, letterSpacing: -3, color: '#fff', fontVariantNumeric: 'tabular-nums', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          {n.toLocaleString('en-US')}
        </div>
        <svg width={W + 20} height={H + 20} style={{ position: 'absolute', left: 30, top: 222, overflow: 'visible' }}>
          <defs>
            <linearGradient id="gg-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={ACCENT} stopOpacity={0.45} />
              <stop offset="1" stopColor={ACCENT} stopOpacity={0} />
            </linearGradient>
            <clipPath id="gg-clip"><rect x={-10} y={-20} width={tx + 10} height={H + 40} /></clipPath>
          </defs>
          <g clipPath="url(#gg-clip)">
            <path d={`${PATH} L${W},${H} L0,${H} Z`} fill="url(#gg-fill)" />
            <path d={PATH} fill="none" stroke={ACCENT} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          <circle cx={tx} cy={ty} r={10 + 22 * pulse} fill="none" stroke={ACCENT} strokeWidth={3} opacity={(1 - pulse) * (pulse > 0 ? 1 : 0)} />
          <circle cx={tx} cy={ty} r={10} fill="#fff" stroke={ACCENT} strokeWidth={5} opacity={p > 0 ? 1 : 0} />
        </svg>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
