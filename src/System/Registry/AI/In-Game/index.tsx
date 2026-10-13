/**
 * System/Registry/AI/In-Game/index.tsx
 * Registry for in-game AI behaviors and general logic.
 */
// General_Logic has been moved to System/Engine/Core/Managers/RegistryManager

export * from './General/index.tsx';
export * from './Category';
export * as Engine from './Engine/index.tsx';
export * as Index from './Index/index.tsx';

export const InGameAIRegistry = {
  name: 'In-Game AI Registry',
};

