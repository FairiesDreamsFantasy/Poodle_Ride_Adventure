/**
 * Registry Manager for Engine Systems.
 */

export const EngineRegistry = {
  Collision: {
    name: 'Collision Registry',
    description: 'Centralized registry for all room-specific collision detection algorithms.',
    systems: [
      { id: 'Foyer', name: 'Foyer Collision Handler' },
      { id: 'GrandBallroom', name: 'Grand Ballroom Collision Handler' },
      { id: 'Kitchen', name: 'Kitchen Collision Handler' },
      { id: 'GrandPlayground', name: 'Grand Playground Collision Handler' },
      { id: 'MeditationHall', name: 'Meditation Hall Collision Handler' },
      { id: 'Library', name: 'Library Collision Handler' },
      { id: 'DiningRoom', name: 'Grand Dining Room Collision Handler' },
    ]
  },
  ClipProtection: {
    name: 'Clip Protection Registry',
    description: 'Prevents player from clipping through walls between adjacent areas.',
  }
};
