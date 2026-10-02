/**
 * System/Registry/AI/In-Game/Category/UI/Inventory_Screen/General/index.tsx
 * 
 * Declarative master configuration and defaults for Inventory UI screens.
 * Contains tab parameters, action maps, and static descriptions.
 */

export interface InventoryTabConfig {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface InventoryScreenRegistryConfigType {
  subsystem: 'UI_Inventory_Screen';
  tabs: InventoryTabConfig[];
  itemCapacities: {
    maxUsableItems: number;
    maxKeyItems: number;
  };
  audioFeedback: {
    locale: string;
    onSelectionBeepFrequency: number;
  };
}

export const InventoryScreenRegistryConfig: InventoryScreenRegistryConfigType = {
  subsystem: 'UI_Inventory_Screen',
  tabs: [
    { id: 'Items', label: 'Items & Pockets', description: 'View and use active inventory items', enabled: true },
    { id: 'Heart', label: 'Companion Hearts', description: 'Bonding stats and companion meters', enabled: true },
    { id: 'Map', label: 'GPS Map Tracker', description: 'Topographical coordinates and perimeter locator', enabled: true },
    { id: 'Storybook', label: 'Story Book pages', description: 'Unlocked stories and course pages', enabled: true },
    { id: 'Exit', label: 'Close Menu', description: 'Return to active Poodle Ride exploration', enabled: true },
  ],
  itemCapacities: {
    maxUsableItems: 16,
    maxKeyItems: 8,
  },
  audioFeedback: {
    locale: 'EN_US',
    onSelectionBeepFrequency: 440, // Standard selection cue pitch
  },
};
