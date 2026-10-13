import { GameState, Direction } from '../../../../../../../types';
import { isGirlAt } from './BlockLogic';

export const checkProximitySound = (prev: GameState): boolean => {
  // Check all girl positions
  const girlPositions = [
    { x: 400, y: 300 },
    { x: 200, y: 500 },
    { x: 600, y: 500 },
    { x: 400, y: 700 }
  ];

  return girlPositions.some(p => {
    const dist = Math.sqrt(Math.pow(prev.gridX - p.x, 2) + Math.pow(prev.gridY - p.y, 2));
    return dist < 75;
  });
};

export const checkAlignmentNotification = (
  gridX: number, 
  gridY: number, 
  direction: Direction, 
  area: 'Staging Garden' | 'Porch' | 'Ramp' | 'Zion Garden'
): string | null => {
  // Staging Garden girl positions
  const stagingGirlPositions = [
    { x: 400, y: 300 },
    { x: 200, y: 500 },
    { x: 600, y: 500 },
    { x: 400, y: 700 }
  ];

  // Porch girl position
  const porchGirlPositions = [
    { x: 300, y: 100 }
  ];

  const girlPositions = area === 'Porch' ? porchGirlPositions : stagingGirlPositions;

  const isAligned = girlPositions.some(p => {
    if (direction === 'North' || direction === 'South') {
      return Math.abs(gridX - p.x) < 25;
    } else {
      return Math.abs(gridY - p.y) < 25;
    }
  });

  if (isAligned) {
    return "You riding a white rabbit, and a girl riding an opossum are both aligned.";
  }

  return null;
};

export const checkTurningTrigger = (
  gridX: number, 
  gridY: number, 
  direction: Direction, 
  area: 'Staging Garden' | 'Porch' | 'Ramp' | 'Zion Garden',
  turnDir: 'left' | 'right'
): string | null => {
  // Staging Garden: near girl
  if (area === 'Staging Garden' && Math.abs(gridX - 400) < 50 && Math.abs(gridY - 300) < 50 && direction === 'West') {
    return "Do you want to ride an opossum?";
  }

  // Porch: near girl
  if (area === 'Porch' && Math.abs(gridX - 300) < 50 && Math.abs(gridY - 100) < 50 && direction === 'South' && turnDir === 'left') {
    return "Do you want to ride an opossum?";
  }
  
  return null;
};
