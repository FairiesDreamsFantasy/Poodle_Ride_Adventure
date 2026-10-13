import { RockingPinkPoodle } from './Rocking_Pink_Poodle';

export interface Toy {
  id: string;
  name: string;
  type: 'Rocker' | 'Springer' | 'Other';
  dimensions: any;
  isUnlocked: boolean;
}

export const TOY_REGISTRY: Toy[] = [
  {
    ...RockingPinkPoodle,
    isUnlocked: true
  }
];

export * from './Rocking_Pink_Poodle';
