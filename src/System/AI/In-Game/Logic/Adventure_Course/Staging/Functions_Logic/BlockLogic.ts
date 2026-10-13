import { GameState, Direction } from '../../../../../../../types';

export const isGirlAt = (nx: number, ny: number, area: string, hasSharedRabbit: boolean): boolean => {
  if (hasSharedRabbit) return false; // Girl leaves the porch
  
  if (area === 'Porch') {
    return nx === 300 && ny === 100;
  }
  
  const positions = [
    { x: 400, y: 300 },
    { x: 200, y: 500 },
    { x: 600, y: 500 },
    { x: 400, y: 700 }
  ];
  return positions.some(p => Math.abs(p.x - nx) < 25 && Math.abs(p.y - ny) < 25);
};

export const isHouseDoor = (x: number, y: number, area: string): boolean => {
  return area === 'Porch' && x >= 298 && x <= 303 && y >= 190;
};

export const handleBlockingNotification = (
  prev: GameState, 
  display: { x: number, y: number }, 
  direction: Direction,
  nextGridX: number,
  nextGridY: number
): string | null => {
  // Check if the next grid position is occupied by a girl
  if (isGirlAt(nextGridX, nextGridY, prev.area, prev.hasSharedRabbit)) {
    // In the garden, we allow entering the square to reach interaction points
    if (prev.area === 'Staging Garden') {
      return null;
    }

    // Porch still blocks
    if (prev.area === 'Porch') {
      return "An opossum is facing you, and you can see a girl hang on tight to her opossum.";
    }
  }

  // House door check
  if (isHouseDoor(nextGridX, nextGridY, prev.area)) {
    if (!prev.hasOpossumKey) {
      return "The house door is locked. You need a key to enter.";
    }
    return null; // Key allows entry
  }

  return null;
};
