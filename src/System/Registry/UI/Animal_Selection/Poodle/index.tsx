import { CRAFTED_POODLES } from './Crafted';
import { CLASSIC_POODLES } from './Classic';
import { RegisteredPoodle } from './General';

export * from './General';
export * from './Crafted';
export * from './Classic';

export const POODLES: RegisteredPoodle[] = [
  ...CRAFTED_POODLES,
  ...CLASSIC_POODLES
];
