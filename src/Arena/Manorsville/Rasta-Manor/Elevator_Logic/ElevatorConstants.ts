/**
 * ElevatorConstants.ts
 * Centralized constants for Elevator properties in Rasta-Manor.
 */

export const ELEVATOR_WIDTH = 250;
export const ELEVATOR_HEIGHT = 250;

// Elevator shaft boundaries to prevent "falling into a shaft"
export const SHAFT_MIN_X = 980;
export const SHAFT_MAX_X = 1000;
export const SHAFT_MIN_Y = 980;
export const SHAFT_MAX_Y = 1000;

// Tarsis / Gallop parameters
export const ELEVATOR_TRANSITION_GALLOPS = 8;
export const ELEVATOR_BARK_VOLUME = 0.5125; // Matching Abigay's elegant bark baseline logic

// Visuals
export const PINK_CEILING_LIGHTS = "#FFC0CB";
export const RED_TILE_CARPET = "#8B0000"; // Deep red
export const PINK_MICRO_DOTS = "#FFD1DC";
export const TARSIS_ANGLE = 45;
