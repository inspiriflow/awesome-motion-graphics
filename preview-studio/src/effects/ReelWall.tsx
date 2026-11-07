import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Grain, HEAD, Husky, Room } from '../Speaker';
import { ACCENT, SANS } from '../fonts';

// effects/reel-wall.md: the wall behind becomes a grid of reel screens, husky stays in front.
// ponytail: "reels" are mascot stills with a slow drift/zoom; wall kept near-frontal (slight CSS tilt), no solved perspective.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const EXPR = ['excited', 'laughing', 'pointing', 'proud', 'shocked', 'skeptical', 'thinking', 'neutral'];
const BG = ['#3b4a6b', '#6b3b4a', '#2f5d50', '#6b5a3b', '#4a3b6b', '#3b5d6b', '#5d3b2f', '#40463b'];
const VIEWS = ['628K', '502K', '391K', '347K', '288K', '214K', '196K', '173K', '152K', '131K', '118K', '96K'];
const COLS = 4, W = 238, H = (W * 16) / 9, GAP = 16, LEFT = (1080 - (COLS * W + (COLS - 1) * GAP)) / 2;
const SPEED = [0.5, -0.7, 0.6, -0.45]; // px/frame, alternating up/down
const BEST = { col: 0, row: 1 }; // best reel: upper-left, clear of the head

const Screen = ({ i, x, y, f, best }: { i: number; x: number; y: number; f: number; best: boolean }) => {
  // switch on in a wave radiating from behind the head (frames 6-18)
  const dist = Math.hypot(x + W / 2 - HEAD.cx, y + H / 2 - 1000);
  const t0 = 6 + (dist / 1300) * 9;
  const on = interpolate(f, [t0, t0 + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const bloom = interpolate(f, [t0, t0 + 2, t0 + 7], [0, 0.6, 0], clamp);
  const lift = best ? interpolate(f, [44, 60], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) }) : 0;
  const zoom = 1.08 + 0.08 * Math.sin((f + i * 23) / 40);
  const drift = Math.sin((f + i * 17) / 30) * 12;
  const pillY = y + H - 70;
  const occluded = pillY > HEAD.top - 80 && x + W > HEAD.left && x < HEAD.right; // ponytail: box test, not the mask
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: W, height: H, borderRadius: 10, overflow: 'hidden',
      background: '#0c0b0a', border: best ? `2px solid ${ACCENT}` : '3px solid #0a0908',
      transform: `scale(${1 + 0.06 * lift})`, zIndex: best ? 2 : 1,
      boxShadow: `0 20px 40px rgba(0,0,0,${0.4 + 0.2 * lift})`,
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: on, background: BG[i % BG.length], filter: `brightness(${(best ? 0.8 : 0.6) + 0.35 * lift + bloom}) saturate(0.85)` }}>
        <Img src={staticFile(`mascot/${EXPR[i % EXPR.length]}.png`)} style={{
          position: 'absolute', width: W * 1.3, left: -W * 0.15 + drift, top: H * 0.2,
          transform: `scale(${zoom})`, transformOrigin: '50% 30%',
        }} />
      </div>
      {/* dark glass sheen */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,255,255,0.08), transparent 40%)' }} />
      {!occluded && (
        <div style={{
          position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', opacity: on,
          padding: '6px 18px', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 8,
          background: best ? ACCENT : 'rgba(0,0,0,0.65)', color: best ? '#1a1410' : '#fff',
          fontFamily: SANS, fontWeight: 700, fontSize: 36, letterSpacing: -0.5, whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: 24 }}>▶</span>{VIEWS[i % VIEWS.length]}
        </div>
      )}
    </div>
  );
};

export const ReelWall = () => {
  const f = useCurrentFrame();
  const ease = Easing.inOut(Easing.sin);
  const wallPush = interpolate(f, [0, 90], [1, 1.03], { easing: ease });
  const personPush = interpolate(f, [0, 90], [1, 1.05], { easing: ease });
  const driftX = interpolate(f, [0, 90], [-10, 10], { easing: ease });
  const scrollT = Math.max(0, f - 6);
  const screens = [];
  for (let c = 0; c < COLS; c++) {
    const off = (c % 2 ? -140 : 40) + SPEED[c] * scrollT;
    for (let r = -1; r < 5; r++) {
      const best = c === BEST.col && r === BEST.row;
      const i = best ? 0 : 1 + ((c * 5 + r * 3 + 20) % 11);
      screens.push(<Screen key={`${c}-${r}`} i={i} best={best} f={f} x={LEFT + c * (W + GAP)} y={r * (H + GAP) - 300 + off} />);
    }
  }
  return (
    <AbsoluteFill>
      <Room />
      <AbsoluteFill style={{ transform: `translateX(${driftX * 0.6}px) scale(${wallPush}) perspective(2400px) rotateY(-3deg)`, transformOrigin: '540px 900px' }}>
        {screens}
      </AbsoluteFill>
      {/* screen spill on the room + faint rim on the husky */}
      <AbsoluteFill style={{
        mixBlendMode: 'screen', opacity: interpolate(f, [6, 18], [0, 0.35], clamp),
        background: 'radial-gradient(70% 50% at 50% 35%, rgba(170,180,220,0.35), transparent 70%)',
      }} />
      <AbsoluteFill style={{ transform: `translateX(${driftX}px) scale(${personPush})`, transformOrigin: '540px 1920px' }}>
        <Husky />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
