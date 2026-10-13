import { Direction } from '../../../../types';

export const getOppositeDirection = (dir: Direction): Direction => {
  switch (dir) {
    case 'North': return 'South';
    case 'South': return 'North';
    case 'East': return 'West';
    case 'West': return 'East';
    case 'Northeast': return 'Southwest';
    case 'Southwest': return 'Northeast';
    case 'Southeast': return 'Northwest';
    case 'Northwest': return 'Southeast';
    default: return dir;
  }
};

export const isNorthward = (dir: Direction): boolean => dir.includes('North');
export const isSouthward = (dir: Direction): boolean => dir.includes('South');
export const isEastward = (dir: Direction): boolean => dir.includes('East');
export const isWestward = (dir: Direction): boolean => dir.includes('West');
