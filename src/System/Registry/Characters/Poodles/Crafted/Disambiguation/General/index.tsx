import { CRAFTED_POODLES } from '../../General';

/**
 * Crafted Poodle Disambiguation Logic
 */
export function isCraftedPoodle(name: string): boolean {
  return CRAFTED_POODLES.includes(name);
}

export function getCraftedPoodleType(name: string): string | null {
  if (!isCraftedPoodle(name)) return null;
  return name;
}
