import { getFootage, getPerimeter } from '../../../../Mathematics/Measurement';

/**
 * Object_Position_Manager - General Logic
 * Manages dynamic and static positions for world objects.
 */

export interface ObjectPosition {
  id: string;
  name: string;
  x: number; // in units (1 unit = 20 feet)
  y: number;
  level: 'Floor' | 'Sky';
  isDynamic: boolean;
}

export const WORLD_POSITIONS: Record<string, ObjectPosition> = {
  RAMP_START: {
    id: 'ramp_start',
    name: 'Ramp Start (Floor)',
    x: 1,
    y: 792,
    level: 'Floor',
    isDynamic: false
  },
  RAMP_END: {
    id: 'ramp_end',
    name: 'Ramp End (Sky Foyer)',
    x: 8,
    y: 772,
    level: 'Sky',
    isDynamic: false
  },
  FOYER_ENTRANCE: {
    id: 'foyer_entrance',
    name: 'Foyer Entrance',
    x: 400,
    y: 800,
    level: 'Floor',
    isDynamic: false
  },
  GARDEN_ENTRANCE: {
    id: 'garden_entrance',
    name: 'Garden Entrance',
    x: 400,
    y: 1,
    level: 'Floor',
    isDynamic: false
  }
};

export function getRelativePosition(x: number, y: number, originX: number, originY: number): { dx: number, dy: number } {
  return {
    dx: x - originX,
    dy: y - originY
  };
}

export function getRelativePositionDescription(x: number, y: number, originX: number, originY: number): string {
  const relPos = getRelativePosition(x, y, originX, originY);
  const dxFeet = getFootage(relPos.dx);
  const dyFeet = getFootage(relPos.dy);
  
  return `Relative to origin: ${dxFeet} East, ${dyFeet} North.`;
}

export function getAreaPerimeterDescription(width: number, depth: number): string {
  const perimeter = getPerimeter(width, depth);
  const perimeterFeet = getFootage(perimeter);
  return `The area is ${getFootage(width)} by ${getFootage(depth)}. The perimeter is ${perimeterFeet} around the shape.`;
}
