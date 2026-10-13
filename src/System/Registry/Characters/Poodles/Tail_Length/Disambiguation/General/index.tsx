
import { POODLE_TAIL_MAP, TailMetadata } from '../../General';

/**
 * Tail Specs Disambiguation Logic
 */
export function getPoodleTailMetadata(name: string): TailMetadata | null {
  return POODLE_TAIL_MAP[name] || null;
}

export function hasBallTipTail(name: string): boolean {
  return getPoodleTailMetadata(name)?.hasBallTip || false;
}
