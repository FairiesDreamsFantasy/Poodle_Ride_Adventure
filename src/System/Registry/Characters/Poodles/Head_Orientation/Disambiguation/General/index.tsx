
import { POODLE_HEAD_ORIENTATION_MAP, HeadOrientation } from '../../General';

/**
 * Head Orientation Disambiguation Logic
 */
export function getPoodleHeadOrientation(name: string): HeadOrientation | null {
  return POODLE_HEAD_ORIENTATION_MAP[name] || null;
}

export function isPerchedOnTop(name: string): boolean {
  return getPoodleHeadOrientation(name) === HeadOrientation.PERCHED_ON_TOP_OF_NECK;
}
