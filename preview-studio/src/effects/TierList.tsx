import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { SANS } from '../fonts';
import { Grain, Husky, Room } from '../Speaker';

// effects/tier-list.md (preview fidelity): tier list builds itself below the face, then flips to "Ranked".
// ponytail: husky nudged up (head 470–1080) so the panel fits under the chin; text chips only, no logos.
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const TOPIC = 'AI tools';
const TIERS: [string, string, string[]][] = [
  ['S', '#E5534B', ['Claude']],
  ['A', '#F0883E', ['ChatGPT', 'Gemini', 'Cursor']],
  ['B', '#E3B341', ['Perplexity', 'Midjourney']],
  ['C', '#57AB5A', ['Grok', 'DeepSeek']],
  ['D', '#539BF5', ['Meta']],
];
const ROW_H = 78, GAP = 10, TOP = 1150;
const BOUNCE = Easing.bezier(0.3, 1.25, 0.6, 1); // ~3% overshoot

export const TierList = () => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const outP = interpolate(f, [80, 90], [1, 0], clamp);
  let n = 0;
  const lastLand = 10 + 4 * (TIERS.flatMap((t) => t[2]).length - 1) + 6;
  const done = interpolate(f, [lastLand, lastLand + 5], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: '#121213' }}>
      <Room />
      <div style={{ position: 'absolute', inset: 0, transform: 'translate(108px, -54px) scale(0.8)', transformOrigin: '0 0' }}>
        <Husky />
      </div>
      <div
        style={{
          position: 'absolute', left: 120, width: 840, top: TOP, padding: 20, borderRadius: 32,
          background: 'rgba(22,22,24,0.94)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.08)',
          opacity: inP * outP, transform: `translateY(${80 * (1 - inP)}px)`, fontFamily: SANS, color: '#F4F1EC',
        }}
      >
        {/* status pill: spinner text crossfades to "Ranked" (never both) */}
        <div style={{ position: 'relative', height: 60, marginBottom: 14 }}>
          {[0, 1].map((k) => (
            <div
              key={k}
              style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 14,
                padding: '8px 24px', borderRadius: 30, background: 'rgba(255,255,255,0.08)', fontSize: 34, fontWeight: 600, whiteSpace: 'nowrap',
                opacity: k ? done : 1 - done,
              }}
            >
              {k ? (
                <>Ranked <span style={{ color: '#57AB5A' }}>✓</span></>
              ) : (
                <>
                  <div style={{ width: 28, height: 28, borderRadius: 14, border: '4px solid rgba(255,255,255,0.2)', borderTopColor: '#F4F1EC', transform: `rotate(${f * 24}deg)` }} />
                  Ranking {TOPIC}…
                </>
              )}
            </div>
          ))}
        </div>
        {TIERS.map(([label, color, items]) => (
          <div key={label} style={{ display: 'flex', gap: 12, height: ROW_H, marginBottom: GAP, background: '#2A2A2E', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ width: ROW_H, background: color, display: 'grid', placeItems: 'center', fontSize: 46, fontWeight: 800, color: '#121213' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {items.map((it) => {
                const st = 10 + 4 * n++;
                const p = interpolate(f, [st, st + 7], [0, 1], clamp);
                return (
                  <div
                    key={it}
                    style={{
                      padding: '8px 18px', borderRadius: 12, background: '#3A3A40', fontSize: 34, fontWeight: 600, letterSpacing: -0.5,
                      opacity: Math.min(1, p * 3), transform: `translateY(${-60 * (1 - BOUNCE(p))}px)`,
                    }}
                  >
                    {it}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
