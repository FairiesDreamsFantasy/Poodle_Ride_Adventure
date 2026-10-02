
import { FOYER_DESCRIPTIONS } from '../../../Description_List/F/Foyer';
import { LIONS_PICTURE } from './L/LionsPicture';
import { RABBIT_CARVINGS } from './R/RabbitCarvings';
import { MIRROR } from './M/Mirror';

/**
 * Artwork at the North and West Walls
 */

export { LIONS_PICTURE, RABBIT_CARVINGS, MIRROR };

export const getArtworkDescription = (x: number, y: number, direction: string, level: string, isClassicMode: boolean): string | null => {
  const scale = isClassicMode ? 0.5 : 1.0;
  
  // Sky Foyer Relocated Artwork
  if (level === 'Sky') {
    // North wall, next to window at the right, 10 feet close to the east wall
    if (y >= 1900 && x >= 1900 && direction === 'North') {
      return ` On the north wall here is a ${LIONS_PICTURE.description} and ${RABBIT_CARVINGS.description}`;
    }
    
    // East wall Grand Tapestry
    if (x >= 1900 && direction === 'East') {
      return ` On the east wall here is the ${FOYER_DESCRIPTIONS.TAPESTRY}`;
    }
  }
  
  // West wall mirror (Floor level)
  if (level === 'Floor' && x <= 40 && y >= 750 && y <= 800 && direction === 'West') {
    return ` On the west wall here is ${MIRROR.description}`;
  }
  
  return null;
};
