import readingTime from 'reading-time';

import { BlockWithChildren } from './types';
import { generateFullText } from './utils';

export function calculateReadingTime(blocks: BlockWithChildren[]): string {
  const fullText = generateFullText(blocks);
  const stats = readingTime(fullText);
  return `${Math.round(stats.minutes)} mins read`;
}
