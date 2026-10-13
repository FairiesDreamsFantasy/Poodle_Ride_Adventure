
import { getPoodleHeadHeight } from '../../General';

/**
 * Head Height Disambiguation Logic
 */
export function disambiguateHeadHeight(name: string): number | null {
  return getPoodleHeadHeight(name);
}
