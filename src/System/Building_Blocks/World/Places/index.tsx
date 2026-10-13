export * from './General';
export * from './Animations';

export interface WorldPlace {
  id: string;
  name: string;
  coordinates: { x: number; y: number; z: number };
}

export const WORLD_PLACES: WorldPlace[] = [
  { id: 'foyer_sky_ramp', name: 'Sky Ramp Foyer', coordinates: { x: 0, y: 0, z: 0 } },
  { id: 'dishwasher_room', name: 'Dishwasher Room', coordinates: { x: -100, y: 200, z: 0 } },
  { id: 'tea_room', name: 'Tea Room', coordinates: { x: 200, y: 150, z: 0 } }
];
