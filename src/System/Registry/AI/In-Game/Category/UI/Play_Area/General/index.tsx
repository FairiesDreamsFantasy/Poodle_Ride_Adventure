/**
 * System/Registry/AI/In-Game/Category/UI/Play_Area/General/index.tsx
 * 
 * Master Registry Definitions for Play Area UI Subsystems.
 * Encapsulates declarative layout hierarchy, viewport specifications,
 * z-index layering rules, and lifecycle overlay invariants.
 */

export interface PlayAreaLayerDefinition {
  name: string;
  zIndex: number;
  description: string;
  rendersAboveCanvas: boolean;
}

export interface PlayAreaRegistryDefinition {
  subsystem: 'UI_Play_Area';
  viewport: {
    baseWidth: number;
    baseHeight: number;
    aspectRatio: string;
    hudStrictlyAboveCanvas: boolean;
  };
  layers: PlayAreaLayerDefinition[];
  overlayPriorities: string[];
  audioIsolation: {
    speechLocale: string;
    muteOnLanding: boolean;
    muteOnAds: boolean;
  };
}

export const PlayAreaRegistryConfig: PlayAreaRegistryDefinition = {
  subsystem: 'UI_Play_Area',
  viewport: {
    baseWidth: 800,
    baseHeight: 600,
    aspectRatio: '4:3',
    hudStrictlyAboveCanvas: true, // v0.9.9.7 Scientific Preservation Invariant
  },
  layers: [
    { name: 'Canvas_World', zIndex: 1, description: '2D/3D World graphical rendering surface', rendersAboveCanvas: false },
    { name: 'HUD_Layer', zIndex: 10, description: 'Head-Up Display positioned strictly above the canvas', rendersAboveCanvas: true },
    { name: 'Storybook_Modal', zIndex: 20, description: 'Story Book interactive course reader', rendersAboveCanvas: true },
    { name: 'Menu_Selection_Modal', zIndex: 30, description: 'Companion and animal selection menu', rendersAboveCanvas: true },
    { name: 'Inventory_Modal', zIndex: 40, description: 'Inventory and item inspection view', rendersAboveCanvas: true },
    { name: 'Keyboard_Help_Modal', zIndex: 50, description: 'Keyboard commands and shortcut modal', rendersAboveCanvas: true },
    { name: 'Lifecycle_Screens', zIndex: 60, description: 'Landing Page, Thanks For Playing, Final Score', rendersAboveCanvas: true },
    { name: 'Screen_Reader_TTS', zIndex: 100, description: 'Accessibility screen reader and acoustic announcements', rendersAboveCanvas: true },
  ],
  overlayPriorities: [
    'LandingPage',
    'InterstitialAd',
    'FinalScore',
    'ThanksForPlaying',
    'PauseMenu',
    'Storybook',
    'PoodleSelection',
    'Inventory',
    'KeyboardModal',
  ],
  audioIsolation: {
    speechLocale: 'EN_US',
    muteOnLanding: true,
    muteOnAds: true,
  },
};
