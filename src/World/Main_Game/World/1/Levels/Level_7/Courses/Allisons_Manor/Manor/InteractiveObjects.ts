import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

export interface InteractiveObject {
  id: string;
  name: string;
  area: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'lever' | 'item' | 'door' | 'switch';
  state?: any;
  description: string;
  onInteract: (state: GameState) => GameState;
}

export const MANOR_OBJECTS: InteractiveObject[] = [
  {
    id: 'fairy_queen_figurine',
    name: 'Brass figurine of a fairy queen',
    area: 'AllisonsRooftop',
    x: 900,
    y: 100,
    width: 2,
    height: 2,
    type: 'item',
    description: 'A beautiful brass figurine of a fairy queen.',
    onInteract: (state) => {
      // Add to inventory logic
      return state;
    }
  },
  {
    id: 'manor_key',
    name: 'Manor Key',
    area: 'Allisons2ndFloor',
    x: 800, // East end
    y: 350,
    width: 2,
    height: 2,
    type: 'item',
    description: 'A shiny key found on a table.',
    onInteract: (state) => {
      return state;
    }
  },
  {
    id: 'wall_lever_3rd_floor',
    name: 'Pull-down wall lever',
    area: 'Allisons3rdFloor',
    x: 50, // West room
    y: 350,
    width: 5,
    height: 10,
    type: 'lever',
    state: 'up',
    description: 'A yellow-bordered vertical rectangle with a red-violet interior and a white lever.',
    onInteract: (state) => {
      const newState = state.isLeverDown ? 'up' : 'down';
      return { ...state, isLeverDown: !state.isLeverDown };
    }
  },
  ...Array.from({ length: 32 }).map((_, i) => ({
    id: `rainbow_coin_${i}`,
    name: 'Rainbow Coin',
    area: 'AllisonsPorch', // Scattered
    x: 100 + (i * 25),
    y: 100 + (i * 15),
    width: 2,
    height: 2,
    type: 'item' as const,
    description: 'A shiny coin that shimmers with all the colors of the rainbow.',
    onInteract: (state: GameState) => {
      return { ...state, rainbowCoins: state.rainbowCoins + 1 };
    }
  })),
  {
    id: 'tea_room_key',
    name: 'Tea Room Key',
    area: 'Allisons2ndFloor',
    x: 950, // East end of table
    y: 150,
    width: 5,
    height: 5,
    type: 'item',
    description: 'A small silver key found on the tea table. It has a delicate floral pattern.',
    onInteract: (state: GameState) => state
  },
  {
    id: 'statue_boy_dog',
    name: 'Statue of Boy and Dog',
    area: 'Allisons2ndFloor',
    x: 900,
    y: 700,
    width: 20,
    height: 20,
    type: 'item',
    description: 'A beautiful statue of a boy riding a white dog-like creature with a pink nose and blue eyes. The boy wears a yellow onesie.',
    onInteract: (state: GameState) => state
  },
  {
    id: 'wallet',
    name: 'Wallet',
    area: 'AllisonsFoyer',
    x: 100,
    y: 100,
    width: 5,
    height: 5,
    type: 'item',
    description: 'A high-quality leather wallet. It contains your ID and some cards. Press O to view contents.',
    onInteract: (state: GameState) => state
  },
  {
    id: 'umbrella',
    name: 'Umbrella',
    area: 'AllisonsFoyer',
    x: 120,
    y: 100,
    width: 5,
    height: 5,
    type: 'item',
    description: 'A sturdy umbrella with a curved handle. Useful for rainy days.',
    onInteract: (state: GameState) => state
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `tea_coin_${i}`,
    name: 'Rainbow Coin',
    area: 'Allisons2ndFloor', // Tea Room perimeter
    x: 800 + (i * 20),
    y: 50 + (i % 2 === 0 ? 0 : 250),
    width: 2,
    height: 2,
    type: 'item' as const,
    description: 'A shiny coin that shimmers with all the colors of the rainbow.',
    onInteract: (state: GameState) => {
      return { ...state, rainbowCoins: state.rainbowCoins + 1 };
    }
  }))
];
