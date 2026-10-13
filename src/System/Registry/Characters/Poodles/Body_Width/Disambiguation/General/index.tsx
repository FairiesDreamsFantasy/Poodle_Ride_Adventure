
import { getPoodleBodyWidth } from '../../General';

/**
 * Body Width Disambiguation Logic
 */
export function disambiguateBodyWidth(name: string): number | null {
  return getPoodleBodyWidth(name);
}
