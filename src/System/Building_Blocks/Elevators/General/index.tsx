/**
 * Elevators Building Block Systems.
 * Optimized performance structures.
 */
export interface ElevatorBlock {
  id: string;
  name: string;
  width: number;
  height: number;
  floors: number;
}

export const ELEVATOR_BLOCKS: ElevatorBlock[] = [
  {
    id: 'lobby-elevator',
    name: 'Rasta-Manor Lobby Elevator',
    width: 12,
    height: 12,
    floors: 3
  }
];

export function renderElevatorIndicator(ctx: CanvasRenderingContext2D, x: number, y: number, currentFloor: number, isMoving: boolean) {
  ctx.save();
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, 40, 20);
  
  // Floor number
  ctx.fillStyle = isMoving ? '#ff8c00' : '#00ff00';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`L${currentFloor}`, x + 20, y + 10);
  ctx.restore();
}
