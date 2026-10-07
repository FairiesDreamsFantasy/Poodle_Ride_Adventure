
import { getPoodleHeadWidth } from '../../General';

/**
 * Head Width Disambiguation Logic
 */
export function disambiguateHeadWidth(name: string): number | null {
  return getPoodleHeadWidth(name);
}
