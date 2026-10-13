/**
 * System/Items/Objects/Umbrellas/index.tsx
 * Modular representation of the Umbrella item to reduce hardcoding.
 */

export const UMBRELLA_ITEM_ID = 'umbrella';
export const UMBRELLA_NAME = 'Umbrella';
export const UMBRELLA_DESCRIPTION = 'White and pink umbrella with a large canopy, and a strong shaft. Keeps you dry during rainy days.';

export function getUmbrellaActionMsg(isEquipped: boolean): string {
  return `Action menu for Umbrella opened. It is currently ${
    isEquipped ? 'equipped' : 'not equipped'
  }. Use arrows to pick: Open, Close, Check, Combine, or Equip.`;
}

export const UMBRELLA_METADATA = {
  id: UMBRELLA_ITEM_ID,
  name: UMBRELLA_NAME,
  description: UMBRELLA_DESCRIPTION,
  actions: ['Open', 'Close', 'Check', 'Combine', 'Equip']
};

export default UMBRELLA_METADATA;
