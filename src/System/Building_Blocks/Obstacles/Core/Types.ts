export interface Obstacle {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isJumpable: boolean;
}
