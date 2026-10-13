import { GameState } from '../../Engine/Core/Types';
import { InventoryItem } from '../../AI/In-Game/Logic/Inventory/InventoryLogic';

export function addItemToInventory(state: GameState, item: Omit<InventoryItem, 'quantity'>): GameState {
  const existingItemIndex = state.inventory.items.findIndex(i => i.id === item.id);
  
  if (existingItemIndex !== -1) {
    const newItems = [...state.inventory.items];
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      quantity: newItems[existingItemIndex].quantity + 1
    };
    return {
      ...state,
      inventory: {
        ...state.inventory,
        items: newItems
      }
    };
  } else {
    if (state.inventory.items.length >= state.inventory.maxItems) {
      return state; // Inventory full
    }
    return {
      ...state,
      inventory: {
        ...state.inventory,
        items: [...state.inventory.items, { ...item, quantity: 1 }]
      }
    };
  }
}

export function removeItemFromInventory(state: GameState, itemId: string): GameState {
  const itemIndex = state.inventory.items.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return state;

  const newItems = [...state.inventory.items];
  if (newItems[itemIndex].quantity > 1) {
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      quantity: newItems[itemIndex].quantity - 1
    };
  } else {
    newItems.splice(itemIndex, 1);
  }

  return {
    ...state,
    inventory: {
      ...state.inventory,
      items: newItems
    }
  };
}

export function combineItems(state: GameState, item1Id: string, item2Id: string): GameState {
  // Example combinations
  if ((item1Id === 'magic_wand' && item2Id === 'fairy_dust') || (item1Id === 'fairy_dust' && item2Id === 'magic_wand')) {
    let newState = removeItemFromInventory(state, 'magic_wand');
    newState = removeItemFromInventory(newState, 'fairy_dust');
    return addItemToInventory(newState, {
      id: 'empowered_wand',
      name: 'Empowered Magic Wand',
      description: 'A magic wand glowing with fairy dust.',
      type: 'equippable'
    });
  }
  return state;
}

export * from './General';
