import { getFootage, getPerimeter } from '../../Science/Physics/Measurements';
import { getRelativePosition } from '../../Science/Physics/Positions';

/**
 * Positional and measurement descriptive utilities.
 * Part of the "P" section of the modular Imports library.
 */

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
