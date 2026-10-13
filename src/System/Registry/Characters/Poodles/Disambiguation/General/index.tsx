/**
 * Poodle Classification System
 * Scientific categorization to prevent logical blind spots.
 */
export enum PoodleClass {
  CRAFTED = 'CRAFTED',
  CLASSIC = 'CLASSIC',
  BABYLONIAN = 'BABYLONIAN'
}

export interface PoodleLookupResult {
  name: string;
  className: PoodleClass;
  isElegant: boolean;
}

export const POODLE_REGISTRY: Record<string, PoodleClass> = {
  'Abigay Rose Kone': PoodleClass.CRAFTED,
  'Anninne-Amelia Rose Julisus': PoodleClass.CRAFTED,
  'Abigail Marigold Kenyatta': PoodleClass.CRAFTED,
  'Dymond Daisy Qin-Reynolds': PoodleClass.CRAFTED,
  'Classic White Poodle': PoodleClass.CLASSIC,
  'White Poodle': PoodleClass.CLASSIC,
  'Olga-Olivia': PoodleClass.BABYLONIAN,
  'Chloe Joseph Gray-Michaels': PoodleClass.BABYLONIAN,
  'Priscilla': PoodleClass.BABYLONIAN

};

/**
 * Disambiguates a poodle name into its scientific class.
 * STRICT ZERO-FALLBACK: Returns null if not recognized.
 */
export function disambiguatePoodle(name: string): PoodleLookupResult | null {
  const className = POODLE_REGISTRY[name];
  if (!className) return null;

  return {
    name,
    className,
    isElegant: className === PoodleClass.CRAFTED || className === PoodleClass.CLASSIC
  };
}
