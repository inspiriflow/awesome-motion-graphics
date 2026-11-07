import { loadFont as loadBricolage } from '@remotion/google-fonts/BricolageGrotesque';
import { loadFont as loadNewsreader } from '@remotion/google-fonts/Newsreader';

// House-style pair: bold display sans + italic serif accent.
export const SANS = loadBricolage('normal', { weights: ['400', '500', '700', '800'], subsets: ['latin'] }).fontFamily;
export const SERIF = loadNewsreader('italic', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily;
export const ACCENT = '#F69963';
