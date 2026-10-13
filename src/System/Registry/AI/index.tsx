/**
 * System/Registry/AI/index.tsx
 * Master registry for AI systems, including In-Game logic and External integrations.
 */
export * from './In-Game';
export * from './In-Game/Category';
export * from './External';
export * as Visuals from './Visuals/index.tsx';

export const AIRegistry = {
  name: 'AI System Registry',
};
