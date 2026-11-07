import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';

// effects/billboard.md as a PREVIEW: no Python bake. A CSS-3D night city (flat facades with seeded lit windows),
// a pinhole camera via CSS perspective (66 deg vFOV), and the clip on the LED screen.
// World units: px at 133.3 px/m (screen 14.4 m = 1920 px). Screen centre is the origin.
const M = 1920 / 14.4;
const PERSP = 960 / Math.tan((33 * Math.PI) / 180); // 66 deg vertical FOV, ~1478 px = 11.1 m
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// seeded random (mulberry32)
const rng = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// pull-back progress with velocity profile t^1.45 (1-t)^2.7, normalised (cumulative table)
const PROFILE = (() => {
  const n = 400;
  const acc = [0];
  for (let i = 1; i <= n; i++) {
    const t = (i - 0.5) / n;
    acc.push(acc[i - 1] + Math.pow(t, 1.45) * Math.pow(1 - t, 2.7));
  }
  return acc.map((v) => v / acc[n]);
})();
const pullAt = (t: number) => PROFILE[Math.round(Math.min(1, Math.max(0, t)) * 400)];

const camera = (f: number) => {
  const p = pullAt((f - 4) / 38);
  const hold = interpolate(f, [42, 84], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const D = Math.exp(Math.log(11.1) + (Math.log(26.6) - Math.log(11.1)) * p) * (1 + 0.045 * hold);
  return { D: D * M, yaw: 16 * p + 2.6 * hold, pitch: 12 * p };
};

const TEMPS = ['#ffb36a', '#ffd3a0', '#f3eee6'];

// facade: dark tower face with lit windows in tenant runs of 2-4, most floors dark, a few blue TV rooms
type Tower = { x: number; z: number; w: number; h: number; base: number; seed: number; tone: string; crown?: number };
const Facade = ({ w, h, seed, tone, fins }: { w: number; h: number; seed: number; tone: string; fins?: boolean }) => {
  const r = rng(seed);
  const floorH = 3.6;
  const colW = 1.5;
  const cols = Math.floor(w / colW);
  const floors = Math.floor(h / floorH);
  const rects: JSX.Element[] = [];
  for (let fl = 0; fl < floors; fl++) {
    const lit = r() < 0.55; // floor occupied tonight
    let c = 0;
    while (c < cols) {
      const run = 2 + Math.floor(r() * 3);
      const on = lit && r() < 0.45;
      const tv = !on && r() < 0.03;
      const col = TEMPS[Math.floor(r() * 3)];
      if (on || tv) {
        for (let k = c; k < Math.min(cols, c + run); k++) {
          rects.push(<rect key={`${fl}-${k}`} x={k * colW + 0.2} y={h - (fl + 1) * floorH + 0.6} width={colW - 0.4} height={floorH - 1.3} fill={tv ? '#4f6fd0' : col} opacity={tv ? 0.35 : 0.5 + r() * 0.4} />);
        }
      }
      c += run;
    }
  }
  return (
    <svg width={w * M} height={h * M} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}>
      <rect width={w} height={h} fill={tone} />
      {rects}
      {fins && Array.from({ length: cols + 1 }, (_, k) => <rect key={`f${k}`} x={k * colW - 0.12} y={0} width={0.24} height={h} fill="#2c3036" />)}
      {fins && Array.from({ length: floors }, (_, k) => <rect key={`b${k}`} x={0} y={k * floorH} width={w} height={0.35} fill="#22252a" />)}
    </svg>
  );
};

// Neighbour towers (metres): x = centre offset, z = depth behind the host facade (negative = farther), base = ground y
const GROUND = 72 + 7.2; // ground is 72 m below screen bottom
const TOWERS: Tower[] = (() => {
  const r = rng(7);
  const list: Tower[] = [];
  for (let i = 0; i < 26; i++) {
    const z = -(25 + r() * 180);
    const side = i % 2 ? 1 : -1;
    const x = side * (12 + r() * (30 + -z * 0.45));
    list.push({ x, z, w: 16 + r() * 20, h: 70 + r() * 120, base: GROUND, seed: 100 + i, tone: r() < 0.5 ? '#0d1118' : '#11151c', crown: r() < 0.4 ? 0.6 : undefined });
  }
  return list.sort((a, b) => a.z - b.z);
})();

const Box = ({ x, y, z, w, h, children, style }: { x: number; y: number; z: number; w: number; h: number; children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ position: 'absolute', left: x * M, top: y * M, width: w * M, height: h * M, transform: `translateZ(${z * M}px)`, transformStyle: 'preserve-3d', ...style }}>{children}</div>
);

export const Billboard = () => {
  const f = useCurrentFrame();
  const c = camera(f);
  const cp = camera(f - 1);
  const speed = Math.abs(Math.log(c.D / cp.D)) * 60 + Math.abs(c.yaw - cp.yaw) * 0.6;
  const raw = 1 - interpolate(f, [3, 8], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const scale = (11.1 * M) / c.D; // on-screen size of the LED screen
  const led = interpolate(scale, [0.6, 0.95], [0, 0.28], clamp);
  const hostW = 12;
  const hostTop = -(7.2 + 8.6);
  const facadeZ = -0.55;
  const blinkOn = f > 50 && f < 58;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #0c1220 0%, #18202e 55%, #2a2a33 100%)', overflow: 'hidden' }}>
      {/* faint cloud lit warm from below */}
      <AbsoluteFill style={{ background: 'radial-gradient(70% 18% at 35% 22%, rgba(120,100,95,0.18), transparent 70%), radial-gradient(50% 12% at 80% 12%, rgba(110,95,95,0.12), transparent 70%)' }} />
      <AbsoluteFill style={{ filter: speed > 0.2 ? `blur(${Math.min(5, speed)}px)` : undefined }}>
        <AbsoluteFill style={{ perspective: PERSP, perspectiveOrigin: '50% 50%' }}>
          <div style={{ position: 'absolute', left: 540, top: 960, width: 0, height: 0, transformStyle: 'preserve-3d', transform: `translateZ(${PERSP - c.D}px) rotateX(${-c.pitch}deg) rotateY(${-c.yaw}deg)` }}>
            {/* neighbours, far to near */}
            {TOWERS.map((t, i) => (
              <Box key={i} x={t.x - t.w / 2} y={t.base - t.h} z={t.z} w={t.w} h={t.h}>
                <Facade w={t.w} h={t.h} seed={t.seed} tone={t.tone} />
                {t.crown && <div style={{ position: 'absolute', left: t.w * 0.2 * M, top: -t.w * 0.5 * M, width: t.w * 0.6 * M, height: t.w * 0.5 * M, background: t.tone }} />}
              </Box>
            ))}
            {/* host tower side face (seen as the camera arcs right) */}
            <div style={{ position: 'absolute', left: (hostW / 2) * M, top: hostTop * M, width: 12 * M, height: 95 * M, background: 'linear-gradient(90deg, #15181d, #0d1015)', transformOrigin: '0 0', transform: `translateZ(${facadeZ * M}px) rotateY(90deg)` }} />
            {/* host facade with screen light: z/d^3-ish falloff approximated by a radial gradient */}
            <Box x={-hostW / 2} y={hostTop} z={facadeZ} w={hostW} h={95}>
              <Facade w={hostW} h={95} seed={3} tone="#171a20" fins />
              <div style={{ position: 'absolute', left: 0, top: 0, width: hostW * M, height: 95 * M, background: `radial-gradient(${10 * M}px ${13 * M}px at ${(hostW / 2) * M}px ${(-hostTop) * M}px, rgba(235,200,170,0.32), rgba(235,200,170,0.08) 55%, transparent 100%)` }} />
              {/* aviation light, blinks once */}
              <div style={{ position: 'absolute', left: (hostW / 2) * M - 20, top: -20, width: 40, height: 40, borderRadius: 20, background: blinkOn ? '#ff3b2f' : '#4a1512', boxShadow: blinkOn ? '0 0 60px 20px rgba(255,59,47,0.35)' : undefined }} />
            </Box>
            {/* catwalk + railing 1.95 m below the screen */}
            <Box x={-4.6} y={7.2 + 1.95} z={0.2} w={9.2} h={0.25} style={{ background: '#3a3e45' }} />
            <Box x={-4.6} y={7.2 + 0.85} z={0.6} w={9.2} h={1.1} style={{ borderTop: `${0.08 * M}px solid #4b5058`, borderBottom: `${0.05 * M}px solid #33373d`, boxSizing: 'border-box', background: `repeating-linear-gradient(90deg, #4b5058 0 ${0.06 * M}px, transparent ${0.06 * M}px ${1.2 * M}px)` }} />
            {/* bezel + LED screen */}
            <Box x={-4.05 - 0.16} y={-7.2 - 0.16} z={-0.01} w={8.1 + 0.32} h={14.4 + 0.32} style={{ background: '#050506', boxShadow: `0 0 ${3 * M}px ${0.6 * M}px rgba(230,190,160,0.18)` }} />
            <Box x={-4.05} y={-7.2} z={0} w={8.1} h={14.4} style={{ overflow: 'hidden', filter: 'brightness(1.08) contrast(0.97)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920 }}>
                <Room />
                <Husky />
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: led, background: 'radial-gradient(circle at 50% 50%, transparent 38%, #000 62%)', backgroundSize: '4px 4px' }} />
            </Box>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      {/* haze: thin high, dense low; warm street glow at the bottom */}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(40,50,66,0) 0%, rgba(40,50,66,0.1) 50%, rgba(60,60,70,0.35) 85%, rgba(120,85,60,0.35) 100%)', opacity: 1 - raw }} />
      <AbsoluteFill style={{ boxShadow: 'inset 0 0 260px rgba(0,0,0,0.55)', opacity: 1 - raw }} />
      {/* frames 0-3 raw clip, cross-fade into the render 3-8 */}
      {raw > 0 && (
        <AbsoluteFill style={{ opacity: raw }}>
          <Room />
          <Husky />
        </AbsoluteFill>
      )}
      <Grain />
    </AbsoluteFill>
  );
};
