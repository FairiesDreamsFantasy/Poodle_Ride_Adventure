/**
 * System/AI/In-Game/Category/UI/Inventory_Screen/General/index.tsx
 * 
 * Master Inventory Screen AI Pipeline.
 * Formulates tab state indexes, item selection boundaries, 
 * action validations, and accessibility voice feedback for inventory UI.
 */

export type InventoryTabType = 'Items' | 'Heart' | 'Map' | 'Storybook' | 'Exit';
export type InventoryActionType = 'Use' | 'Check' | 'Combine' | 'Equip' | 'Cancel';

export interface InventoryScreenState {
  activeTab: InventoryTabType;
  selectedItemIndex: number;
  totalItems: number;
  activeAction: InventoryActionType;
}

export interface InventoryItemDefinition {
  id: string;
  name: string;
  type: 'usable' | 'key' | 'collectible' | 'companion_boost';
  description: string;
}

/**
 * Calculates next tab rotation cleanly (wrapping bounds).
 */
export const rotateInventoryTab = (
  current: InventoryTabType,
  direction: 'NEXT' | 'PREV'
): InventoryTabType => {
  const tabs: InventoryTabType[] = ['Items', 'Heart', 'Map', 'Storybook', 'Exit'];
  const currentIndex = tabs.indexOf(current);
  let nextIndex = direction === 'NEXT' ? currentIndex + 1 : currentIndex - 1;
  
  if (nextIndex >= tabs.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = tabs.length - 1;
  
  return tabs[nextIndex];
};

/**
 * Formulates the active item description and details text.
 */
export const getInventoryItemDescription = (
  item: InventoryItemDefinition | null,
  walletCoins: number
): string => {
  if (!item) {
    return `Inventory Empty. Pocket contains ${walletCoins} coins.`;
  }
  return `${item.name}. ${item.description}`;
};

/**
 * Validates if a target action is compatible with an item.
 */
export const validateInventoryItemAction = (
  item: InventoryItemDefinition,
  action: InventoryActionType
): boolean => {
  if (action === 'Cancel') return true;
  
  switch (item.type) {
    case 'usable':
      return action === 'Use' || action === 'Check';
    case 'key':
      return action === 'Check';
    case 'companion_boost':
      return action === 'Use' || action === 'Check' || action === 'Equip';
    case 'collectible':
      return action === 'Check' || action === 'Combine';
    default:
      return false;
  }
};

/**
 * Formulates acoustic screen-reader feedback when navigating or executing actions.
 */
export const handleInventorySpeechAnnouncement = (
  event: 'TAB_CHANGE' | 'ITEM_NAV' | 'ACTION_EXECUTE' | 'INVENTORY_OPEN' | 'INVENTORY_CLOSE',
  detail: string,
  speak: (text: string, locale?: string) => void
): void => {
  switch (event) {
    case 'INVENTORY_OPEN':
      speak('Inventory Menu Opened. Items tab selected.', 'EN_US');
      break;
    case 'INVENTORY_CLOSE':
      speak('Closing Inventory.', 'EN_US');
      break;
    case 'TAB_CHANGE':
      speak(`Tab changed to: ${detail}.`, 'EN_US');
      break;
    case 'ITEM_NAV':
      speak(`Selected item: ${detail}`, 'EN_US');
      break;
    case 'ACTION_EXECUTE':
      speak(`Action executed: ${detail}`, 'EN_US');
      break;
    default:
      break;
  }
};
