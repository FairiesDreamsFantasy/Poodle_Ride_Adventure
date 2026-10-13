/**
 * BoilerRoomConstants.ts
 * Constants for the Rasta-Manor Sub-Cellar Boiler Room (B2).
 */

export const BOILER_WIDTH = 8000;
export const BOILER_HEIGHT = 7000;
export const BOILER_WALL_THICKNESS = 15;

// Electric Boilers Position (aligned with Kitchen/Dishwasher above)
// Kitchen is roughly center-west on floor 1, so we place them accordingly
export const ELECTRIC_BOILER_X = 5500;
export const ELECTRIC_BOILER_Y = 1000;

// Side Path Gateway
export const GATE_X = 4000;
export const GATE_Y = 0; // South wall
export const GATE_WIDTH = 30;
export const GATE_HEIGHT = 25;
export const GATEWAY_DEPTH = 15;

export const BOILER_ROOM_DESCRIPTIONS = {
  START: "You are in the Sub-Cellar Boiler Room (B2) of Rasta-Manor. The air is warm and filled with the mechanical hum of industrial systems.",
  WALLS: "The massive 15-foot thick brick walls divide this 8,000 by 7,000 foot industrial floor into specialized mechanical zones.",
  FLOOR: "The ceramic tile floor is meticulously clean, designed for ease of maintenance in this powerful mechanical facility.",
  BOILERS: "Main boilers run on renewable used cooking oil, providing sustainable steam-based heating for the entire manor.",
  GAUGES: "Pipes, gauges, and pumps line the walls, monitoring the safe flow of drinking water and heating steam.",
};
