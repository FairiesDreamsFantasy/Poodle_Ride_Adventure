/**
 * Coin Manager
 * Spawns collectible coins in various areas.
 * [PRESERVED ARTISTIC CRAFT]
 */

export interface Coin {
  id: string;
  x: number;
  y: number;
  area: string;
  collected: boolean;
  isCollected: boolean;
  value: number;
}

export const INITIAL_COINS: Coin[] = [
  // Tea Room Coins
  { id: 'tr-1', x: 50, y: 50, area: 'PinkHouseTeaRoom', collected: false, isCollected: false, value: 10 },
  { id: 'tr-2', x: 350, y: 50, area: 'PinkHouseTeaRoom', collected: false, isCollected: false, value: 10 },
  { id: 'tr-3', x: 50, y: 350, area: 'PinkHouseTeaRoom', collected: false, isCollected: false, value: 10 },
  { id: 'tr-4', x: 350, y: 350, area: 'PinkHouseTeaRoom', collected: false, isCollected: false, value: 10 },
  
  // Story Book Course 1 Segments
  { id: 'sb1-1', x: 100, y: 25, area: 'PoodleRideStoryBookCourse1_Seg1', collected: false, isCollected: false, value: 5 },
  { id: 'sb1-2', x: 200, y: 25, area: 'PoodleRideStoryBookCourse1_Seg1', collected: false, isCollected: false, value: 5 },
  { id: 'sb1-3', x: 300, y: 25, area: 'PoodleRideStoryBookCourse1_Seg1', collected: false, isCollected: false, value: 5 },
  { id: 'sb1-4', x: 400, y: 25, area: 'PoodleRideStoryBookCourse1_Seg1', collected: false, isCollected: false, value: 5 },

  { id: 'sb2-1', x: 50, y: 25, area: 'PoodleRideStoryBookCourse1_Seg2', collected: false, isCollected: false, value: 5 },
  { id: 'sb2-2', x: 150, y: 25, area: 'PoodleRideStoryBookCourse1_Seg2', collected: false, isCollected: false, value: 5 },
  { id: 'sb2-3', x: 250, y: 25, area: 'PoodleRideStoryBookCourse1_Seg2', collected: false, isCollected: false, value: 5 },
  { id: 'sb2-4', x: 350, y: 25, area: 'PoodleRideStoryBookCourse1_Seg2', collected: false, isCollected: false, value: 5 },
];

export function checkCoinPickup(state: any, onUpdate: (update: any) => void) {
  const { area, playerX, playerY, coins } = state;
  const pickupRadius = 15;

  const newCoins = coins.map((coin: Coin) => {
    if (coin.area === area && !coin.collected) {
      const dist = Math.sqrt(Math.pow(coin.x - playerX, 2) + Math.pow(coin.y - playerY, 2));
      if (dist < pickupRadius) {
        return { ...coin, collected: true };
      }
    }
    return coin;
  });

  const collectedAny = newCoins.some((c: Coin, i: number) => c.collected && !coins[i].collected);
  if (collectedAny) {
    const totalCollected = newCoins.filter((c: Coin) => c.collected).reduce((acc: number, c: Coin) => acc + c.value, 0);
    onUpdate({ coins: newCoins, score: totalCollected });
  }
}
