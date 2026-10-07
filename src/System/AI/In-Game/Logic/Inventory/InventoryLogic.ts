export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: 'equippable' | 'usable' | 'key' | 'material' | 'misc';
}

export interface Inventory {
  items: InventoryItem[];
  coins: number;
  maxItems: number;
}

export const INITIAL_INVENTORY: Inventory = {
  items: [
    {
      id: 'umbrella',
      name: 'Umbrella',
      description: 'White and pink umbrella with a large canopy, and a strong shaft. Keeps you dry during rainy days.',
      quantity: 1,
      type: 'equippable'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      description: 'A very important piece of inventory for holding your ID and cards.',
      quantity: 1,
      type: 'misc'
    }
  ],
  coins: 0,
  maxItems: 25,
};
