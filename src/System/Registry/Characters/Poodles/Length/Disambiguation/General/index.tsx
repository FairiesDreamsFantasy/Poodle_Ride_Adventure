
import { getPoodleLength } from '../../General';

/**
 * Length Disambiguation Logic
 */
export function disambiguateLength(name: string): number | null {
  return getPoodleLength(name);
}
