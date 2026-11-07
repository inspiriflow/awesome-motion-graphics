import { Composition } from 'remotion';
import { TextBehind } from './effects/TextBehind';
import { ReelWall } from './effects/ReelWall';
import { GlassWidgets } from './effects/GlassWidgets';
import { Kallaway } from './effects/Kallaway';
import { Orbit } from './effects/Orbit';
import { Billboard } from './effects/Billboard';
import { ZoomThrough } from './effects/ZoomThrough';
import { TextPath } from './effects/TextPath';
import { ZoomGrid } from './effects/ZoomGrid';
import { FaceCam } from './effects/FaceCam';
import { Text3D } from './effects/Text3D';
import { TextRing } from './effects/TextRing';
import { TierList } from './effects/TierList';
import { GlassGraph } from './effects/GlassGraph';
import { OverTheShoulder } from './effects/OverTheShoulder';
import { StageLight } from './effects/StageLight';
import { GlassPanels } from './effects/GlassPanels';
import { ReachSplit } from './effects/ReachSplit';
import { ReelOrbit } from './effects/ReelOrbit';
import { PullBack } from './effects/PullBack';

// One entry per effect. frames defaults to 90 (3 s at 30 fps).
const effects: { id: string; component: React.FC; frames?: number }[] = [
  { id: 'text-behind', component: TextBehind },
  { id: 'reel-wall', component: ReelWall },
  { id: 'glass-widgets', component: GlassWidgets },
  { id: 'kallaway', component: Kallaway, frames: 84 },
  { id: 'orbit', component: Orbit },
  { id: 'billboard', component: Billboard, frames: 84 },
  { id: 'zoom-through', component: ZoomThrough },
  { id: 'text-path', component: TextPath },
  { id: 'zoom-grid', component: ZoomGrid },
  { id: 'face-cam', component: FaceCam },
  { id: 'text-3d', component: Text3D },
  { id: 'text-ring', component: TextRing },
  { id: 'tier-list', component: TierList },
  { id: 'glass-graph', component: GlassGraph },
  { id: 'over-the-shoulder', component: OverTheShoulder },
  { id: 'stage-light', component: StageLight },
  { id: 'glass-panels', component: GlassPanels },
  { id: 'reach-split', component: ReachSplit },
  { id: 'reel-orbit', component: ReelOrbit },
  { id: 'pull-back', component: PullBack },
];

export const Root = () => (
  <>
    {effects.map((e) => (
      <Composition key={e.id} id={e.id} component={e.component} durationInFrames={e.frames ?? 90} fps={30} width={1080} height={1920} />
    ))}
  </>
);
