/**
 * Rider Disambiguation System
 */
export enum RiderClass {
  FAIRY = 'FAIRY',
  HUMAN = 'HUMAN'
}

export const RIDER_REGISTRY: Record<string, RiderClass> = {
  'Fairy-Rider': RiderClass.FAIRY,
  'Priscilla': RiderClass.HUMAN
};


export function disambiguateRider(name: string): RiderClass | null {
  return RIDER_REGISTRY[name] || null;
}
