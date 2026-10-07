import { Direction } from '../../../../../../../../../types';
import { GameState } from '../../../../../../../../../System/Engine/Core/Types';

export const handlePinkHouseCollision = (area: string, nextX: number, nextY: number, dims: { width: number, height: number }, state: GameState) => {
  let isBlocked = false;
  let wallDesc = "";

  if (area === 'PinkHouseTeaRoom') {
     // East Door (y190-210)
     const isAtEastDoor = nextX >= dims.width && nextY >= 180 && nextY <= 220;
     // West Door (y180-220)
     const isAtWestDoor = nextX <= 0 && nextY >= 180 && nextY <= 220;
     // South Door (x370-400)
     const isAtSouthDoor = nextY <= 0 && nextX >= 370 && nextX <= 400;

     if (isAtEastDoor || isAtWestDoor || isAtSouthDoor) {
        return { isBlocked: false, wallDesc: "" };
     }

     // Tables: Spread out, keeping the West-East central path clear
     const tables = [
       { x: 80, y: 80, r: 25, desc: "A silver tea table with fine china." },
       { x: 320, y: 80, r: 25, desc: "A silver tea table with a lace cloth." },
       { x: 80, y: 320, r: 25, desc: "A silver tea table with a small vase." },
       { x: 320, y: 320, r: 25, desc: "A silver tea table with a tray of cookies." }
     ];

     for (const t of tables) {
       const dx = nextX - t.x;
       const dy = nextY - t.y;
       if (Math.sqrt(dx*dx + dy*dy) < t.r) {
          return { isBlocked: true, wallDesc: t.desc };
       }
     }
  }

  // Default boundary check if not at a door
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
     isBlocked = true;
     if (nextY >= dims.height) wallDesc = "The North wall is painted a soft rose pink.";
     else if (nextY <= 0) wallDesc = "The South wall features elegant white molding.";
     else if (nextX >= dims.width) wallDesc = "The East wall has a beautiful silver finish.";
     else if (nextX <= 0) wallDesc = "The West wall is adorned with floral patterns.";
  }

  return { isBlocked, wallDesc };
};
