export * from './General';
export * from './Animations';

export interface WorldEnvironmentConfig {
  id: string;
  name: string;
  ambientEchoMs: number;
}

export const WORLD_ENVIRONMENTS: WorldEnvironmentConfig[] = [
  { id: 'foyer', name: 'Sky Ramp Foyer', ambientEchoMs: 250 },
  { id: 'garden', name: 'Simulated Garden Area', ambientEchoMs: 120 },
  { id: 'porch', name: 'Grand Porch', ambientEchoMs: 180 }
];
