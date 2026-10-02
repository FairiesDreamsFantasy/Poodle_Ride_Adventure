/**
 * SpectatorAreaConstants.ts
 * Constants for the Narrow Dressage Gym Spectator Area (Upper Mezzanine).
 */

export const SPECTATOR_WIDTH = 1000;
export const SPECTATOR_HEIGHT = 2000;

export const WALKWAY_WIDTH = 20;
export const BENCH_WIDTH = 10;

// Doors / Transitions
// South: Archway to Southwest Mezzanine Stairway & Ramps
export const TO_MEZZANINE_X_MIN = 494;
export const TO_MEZZANINE_X_MAX = 506;
export const TO_MEZZANINE_Y = 1;

// North: Archway to West Communal Space Mezzanine
export const TO_WEST_COMMUNAL_X_MIN = 485;
export const TO_WEST_COMMUNAL_X_MAX = 499;
export const TO_WEST_COMMUNAL_Y = 2000;

export const SPECTATOR_DESCRIPTIONS = {
  START: "You are on the spectator level of the Narrow Dressage Gym, 25 feet above the main floor. A 20-foot wide glass-floored perimeter walkway provides a breathtaking view of the arena below.",
  BENCHES: "Long blue and black ergonomic benches with integrated food tables and rounded safety corners are arranged along the walkway for maximum comfort.",
  BARRIER: "A 10-foot high climb-resistant barred fence ensures safety while allowing an unobstructed view of the dressage activities below.",
};
