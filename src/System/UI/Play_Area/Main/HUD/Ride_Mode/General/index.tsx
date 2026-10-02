import React from 'react';

export type RidePace = 'Slow Walk' | 'Very Slow Walk' | 'Walk' | 'Gallop';

export interface PaceDetails {
  pace: RidePace;
  speedMultiplier: number;
  rhythmDescription: string;
}

export const RIDE_PACES: Record<RidePace, PaceDetails> = {
  'Very Slow Walk': { pace: 'Very Slow Walk', speedMultiplier: 0.25, rhythmDescription: 'Nyhabinghi slow-groove rhythm' },
  'Slow Walk': { pace: 'Slow Walk', speedMultiplier: 0.5, rhythmDescription: 'Nyhabinghi moderate-groove rhythm' },
  'Walk': { pace: 'Walk', speedMultiplier: 1.0, rhythmDescription: 'Steady walk' },
  'Gallop': { pace: 'Gallop', speedMultiplier: 2.0, rhythmDescription: 'Iconic 1-2-3 gallop rhythm' }
};
