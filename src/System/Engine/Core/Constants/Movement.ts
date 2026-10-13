import { Direction } from '../../../../types';
import { GALLOP_INTERVAL_MS } from '../../../../Characters/Poodles/Abigay_Rose_Kone/Animations/Movements/MovementPowerhouse';

export const DIRECTIONS: Direction[] = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
export const MOVE_COOLDOWN = GALLOP_INTERVAL_MS; // Adjusted for a natural galloping rhythm

// Accuracy Refinements [CRAFTED ARTISTIC ALGORITHMS]
export const POODLE_WIDTH_FEET = 3.5; // Roughly 42 inches wide with rider
export const DOOR_CLEARANCE_FEET = 3.0; // 3 feet of horizontal clearance for wide doors
export const WALL_CLEARANCE_FEET = 1.0; // 12 inches of horizontal placement (1 Foot)
