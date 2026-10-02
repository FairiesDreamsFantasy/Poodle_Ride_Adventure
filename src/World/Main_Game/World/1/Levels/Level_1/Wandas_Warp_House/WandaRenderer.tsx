import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';
import { drawFloorTiling, drawBuildingBlock } from '../../../../../../../System/Engine/Science/Graphical_Renderer/General';

/**
 * WANDA'S WARP HOUSE RENDERER
 * An 8-sided building (rendered as 500x500 for logic)
 */
export function drawWandaWarpHouse(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / 500;
  
  // 1. Floor (Purple and Blue checkering)
  for (let x = 0; x < 500; x += 50) {
    for (let y = 0; y < 500; y += 50) {
      ctx.fillStyle = (x + y) % 100 === 0 ? '#4b0082' : '#000080';
      ctx.fillRect(x * scale, y * scale, 50 * scale, 50 * scale);
    }
  }

  // 2. South Wall (White bricks with dark-blue mortar)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 490 * scale, 500 * scale, 10 * scale);
  ctx.strokeStyle = '#00008b';
  ctx.strokeRect(0, 490 * scale, 500 * scale, 10 * scale);

  // 3. North Wall
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 500 * scale, 10 * scale);
  ctx.strokeStyle = '#00008b';
  ctx.strokeRect(0, 0, 500 * scale, 10 * scale);

  // 4. East Wall
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(490 * scale, 0, 10 * scale, 500 * scale);
  ctx.strokeStyle = '#00008b';
  ctx.strokeRect(490 * scale, 0, 10 * scale, 500 * scale);

  // EAST WALL COMPONENT: Double sliding doors leading to East hallway (20 ft wide, i.e. Y = 240 to 260)
  // These doors slide open from each other, designed like typical wooden gates that are blue and yellow.
  const eastDoorY = 240 * scale;
  const eastDoorHeight = 20 * scale;
  const eastDoorWidth = 10 * scale;

  // Let's check open status or if we always render active floor pathway preview for readability
  // Red brick floor `#b71c1c` behind the sliding gates
  ctx.fillStyle = '#b71c1c';
  ctx.fillRect(490 * scale, eastDoorY, eastDoorWidth, eastDoorHeight);

  // Draw the blue and yellow gates slid open slightly or partially closed
  // Left slot slid up and Right slot slid down
  ctx.fillStyle = '#ffeb3b'; // Yellow wooden gates
  ctx.fillRect(492 * scale, (230 - 2) * scale, 8 * scale, 12 * scale);
  ctx.fillRect(492 * scale, (260) * scale, 8 * scale, 12 * scale);

  // Blue braces/X on wood gates
  ctx.strokeStyle = '#0288d1';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(492 * scale, (230 - 2) * scale, 8 * scale, 12 * scale);
  ctx.strokeRect(492 * scale, (260) * scale, 8 * scale, 12 * scale);
  ctx.beginPath();
  ctx.moveTo(492 * scale, (230 - 2) * scale); ctx.lineTo(500 * scale, (230 + 10) * scale);
  ctx.moveTo(492 * scale, 260 * scale); ctx.lineTo(500 * scale, 272 * scale);
  ctx.stroke();

  // 5. West Wall
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 10 * scale, 500 * scale);
  ctx.strokeStyle = '#00008b';
  ctx.strokeRect(0, 0, 10 * scale, 500 * scale);

  // WEST WALL COMPONENT: Double sliding doors (20 ft wide, i.e. Y = 240 to Y = 260)
  const isUnlocked = !!state.wandaWestDoorUnlocked;
  const doorY = 240 * scale;
  const doorHeight = 20 * scale;
  const doorWidth = 10 * scale;

  if (isUnlocked) {
    // 1. Draw the floor preview of the hallway behind the doors (warm sand/earth `#8d6e63`)
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(0, doorY, doorWidth, doorHeight);
    
    // 2. Draw the doors slid open (into Y=230-240 and Y=260-270)
    ctx.fillStyle = '#b71c1c'; // Barn red sliding door panel
    ctx.fillRect(0, (230 - 2) * scale, 8 * scale, 12 * scale);
    ctx.fillRect(0, (260) * scale, 8 * scale, 12 * scale);
    
    // Door braces
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, (230 - 2) * scale, 8 * scale, 12 * scale);
    ctx.strokeRect(0, (260) * scale, 8 * scale, 12 * scale);
  } else {
    // Doors are closed. Draw the premium farm scenery painting: 
    // "a picture of a red barn, a pony, and a cactus under the blue sky and a green horizon that resembles a farm."
    ctx.save();
    // Sky blue background on the door surfaces
    ctx.fillStyle = '#4fc3f7';
    ctx.fillRect(0, doorY, doorWidth, doorHeight);

    // Frame of the doors (dark wood)
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, doorY, doorWidth, doorHeight);

    // Green horizon (grassy field)
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, doorY + 12 * scale, doorWidth, 8 * scale);

    // Red barn
    ctx.fillStyle = '#d32f2f'; // Barn red
    ctx.fillRect(1 * scale, doorY + 8 * scale, 5 * scale, 7 * scale);
    // Barn roof
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.moveTo(1 * scale, doorY + 8 * scale);
    ctx.lineTo(3.5 * scale, doorY + 5 * scale);
    ctx.lineTo(6 * scale, doorY + 8 * scale);
    ctx.closePath();
    ctx.fill();
    // Barn white trim (criss-cross)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(1.5 * scale, doorY + 9 * scale, 4 * scale, 5 * scale);
    ctx.beginPath();
    ctx.moveTo(1.5 * scale, doorY + 9 * scale);
    ctx.lineTo(5.5 * scale, doorY + 14 * scale);
    ctx.moveTo(5.5 * scale, doorY + 9 * scale);
    ctx.lineTo(1.5 * scale, doorY + 14 * scale);
    ctx.stroke();

    // Cute Brown Pony
    ctx.fillStyle = '#8d6e63'; // Brown body
    ctx.fillRect(2 * scale, doorY + 13 * scale, 3 * scale, 3 * scale);
    // Pony Head
    ctx.fillRect(1 * scale, doorY + 11.5 * scale, 1.5 * scale, 2 * scale);
    // Legs
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(2 * scale, doorY + 16 * scale, 0.5 * scale, 2 * scale);
    ctx.fillRect(4.5 * scale, doorY + 16 * scale, 0.5 * scale, 2 * scale);

    // Cactus
    ctx.fillStyle = '#2e7d32'; // Cactus green
    ctx.fillRect(7 * scale, doorY + 9 * scale, 1.5 * scale, 7 * scale); // Main trunk
    // Arms
    ctx.fillRect(6 * scale, doorY + 11 * scale, 1.5 * scale, 1.2 * scale);
    ctx.fillRect(6 * scale, doorY + 10 * scale, 0.7 * scale, 1.2 * scale);
    
    ctx.fillRect(8.5 * scale, doorY + 12 * scale, 1.2 * scale, 1.2 * scale);
    ctx.fillRect(9 * scale, doorY + 11 * scale, 0.7 * scale, 1.2 * scale);

    ctx.restore();
  }

  // 6. Platform Rendering (WandaPlatform)
  if (state.area === 'WandaPlatform') {
    ctx.fillStyle = '#ffdf00';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#ffd700';
    ctx.strokeRect(0, 0, width, height);
    // Rainbow pillars
     ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(i * 14 * (width/100), 0, 10 * (width/100), 5 * (width/100));
     });
  }
}
