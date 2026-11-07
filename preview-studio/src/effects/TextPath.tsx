import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Grain, Husky, Room } from '../Speaker';
import { SANS } from '../fonts';

// effects/text-path.md: text flows along the head/shoulder outline, behind the husky.
// ponytail: outline traced once offline from mascot/neutral.png alpha (top edge per column, 65px screen-space
// dilation, upper convex hull so it bridges the dip between the ears, neighbour-averaged). Static mascot => no per-frame trace; only the bob moves it.
const OUTLINE = [[-100,1680],[-90,1630],[-80,1581],[-70,1531],[-60,1482],[-50,1432],[-40,1383],[-30,1333],[-20,1284],[-10,1235],[0,1185],[10,1136],[20,1086],[30,1037],[40,988],[50,940],[60,893],[70,849],[80,808],[90,773],[100,742],[110,715],[120,692],[130,672],[140,654],[150,639],[160,625],[170,613],[180,603],[190,594],[200,586],[210,580],[220,574],[230,570],[240,567],[250,564],[260,562],[270,561],[280,560],[290,560],[300,560],[310,560],[320,560],[330,560],[340,560],[350,560],[360,560],[370,560],[380,560],[390,560],[400,560],[410,560],[420,560],[430,560],[440,560],[450,560],[460,560],[470,560],[480,560],[490,560],[500,560],[510,560],[520,560],[530,560],[540,560],[550,560],[560,560],[570,560],[580,560],[590,560],[600,560],[610,560],[620,560],[630,560],[640,560],[650,560],[660,560],[670,560],[680,560],[690,560],[700,560],[710,560],[720,560],[730,560],[740,560],[750,560],[760,560],[770,560],[780,560],[790,560],[800,560],[810,561],[820,562],[830,564],[840,566],[850,569],[860,573],[870,579],[880,585],[890,592],[900,601],[910,611],[920,623],[930,637],[940,653],[950,671],[960,692],[970,717],[980,746],[990,780],[1000,818],[1010,860],[1020,906],[1030,953],[1040,1002],[1050,1051],[1060,1100],[1070,1149],[1080,1198],[1090,1247],[1100,1296],[1110,1345],[1120,1394],[1130,1443],[1140,1492],[1150,1541],[1160,1590],[1170,1639],[1180,1688]];
const D = 'M' + OUTLINE.map((p) => p.join(' ')).join(' L');

export const TextPath = ({ text = 'INSPIRI.FLOW' }: { text?: string }) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 9) * 6; // same bob as <Husky/>
  const reveal = interpolate(f, [0, 20], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp' });
  const line = Array(14).fill(text).join('  •  ');
  return (
    <AbsoluteFill>
      <Room />
      <svg width={1080} height={1920} style={{ position: 'absolute', transform: `translateY(${bob}px)` }}>
        <defs>
          <path id="tp-outline" d={D} />
          {/* write-on from the left end: the mask stroke grows along the path */}
          <mask id="tp-reveal" maskUnits="userSpaceOnUse" x={-200} y={0} width={1500} height={1920}>
            <use href="#tp-outline" fill="none" stroke="white" strokeWidth={140} pathLength={1} strokeDasharray={`${reveal} 1`} />
          </mask>
        </defs>
        <g mask="url(#tp-reveal)">
          <text fontFamily={SANS} fontWeight={600} fontSize={46} letterSpacing={2} fill="rgba(255,255,255,0.9)"
            style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))' }}>
            <textPath href="#tp-outline" startOffset={-900 + f * 5}>{line}</textPath>
          </text>
        </g>
      </svg>
      <Husky />
      <Grain />
    </AbsoluteFill>
  );
};
