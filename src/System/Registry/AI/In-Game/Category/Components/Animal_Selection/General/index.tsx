/**
 * System/Registry/AI/In-Game/Category/Animal/Selection_Screen/General/index.tsx
 * 
 * Master Registry Definitions for Animal & Poodle Selection Screens.
 * Encapsulates declarative rules, UI focus targets, Storybook invariants,
 * and audio isolation constraints.
 */

export interface AnimalSelectionActionConfig {
  name: string;
  announcement: string;
  requiresRideNowPrompt: boolean;
}

export interface AnimalSelectionRegistryDefinition {
  subsystem: 'Animal_Selection_Screen';
  supportedCategories: ('Crafted' | 'Classic')[];
  menuActions: AnimalSelectionActionConfig[];
  storybookRules: {
    decisionZonePreservesCompanion: boolean;
    courseEnforcesCompanion: string;
    exitRestoresPriorCompanion: boolean;
  };
  audioConstraints: {
    decoupleFromWorldRhythms: boolean;
    isolateFootstepAndGallopSounds: boolean;
    speechLocale: string;
  };
  craftedCompanions: string[];
  classicCompanions: string[];
}

export const AnimalSelectionRegistryConfig: AnimalSelectionRegistryDefinition = {
  subsystem: 'Animal_Selection_Screen',
  supportedCategories: ['Crafted', 'Classic'],
  menuActions: [
    { name: 'Ride Now', announcement: 'Ride Now', requiresRideNowPrompt: true },
    { name: 'About', announcement: 'About', requiresRideNowPrompt: false },
    { name: 'Bark Type', announcement: 'Bark Type', requiresRideNowPrompt: false },
    { name: 'Go Back', announcement: 'Go Back', requiresRideNowPrompt: false },
  ],
  storybookRules: {
    decisionZonePreservesCompanion: true,
    courseEnforcesCompanion: 'Dymond Daisy Qin-Reynolds',
    exitRestoresPriorCompanion: true,
  },
  audioConstraints: {
    decoupleFromWorldRhythms: true,
    isolateFootstepAndGallopSounds: true,
    speechLocale: 'EN_US',
  },
  craftedCompanions: [
    'Abigay Rose Kone',
    'Anninne-Amelia Rose Julisus',
    'Dymond Daisy Qin-Reynolds',
    'Abigail Marigold Kenyatta',
  ],
  classicCompanions: [
    'Classic White Female Poodle',
  ],
};
