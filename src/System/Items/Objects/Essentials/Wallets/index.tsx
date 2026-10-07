/**
 * System/Items/Essential_Objects/Wallets/index.tsx
 * Modular representation of the Wallet and Credit Card items.
 */

export const WALLET_ITEM_ID = 'wallet';
export const WALLET_NAME = 'Wallet';
export const WALLET_DESCRIPTION = 'A sleek leather wallet for holding cards and treasured photos.';

export const CREDIT_CARD_NAME = 'Credit Card';
export const CREDIT_CARD_DESCRIPTION = 'A golden card with infinite credit for elite canine styling.';

export const PRISCILLA_GOLD_CARD_NAME = 'Priscilla Gold Card';
export const PRISCILLA_GOLD_CARD_DESCRIPTION = 'This is a shiny solid-gold credit card designed for premium vanity and extreme financial greed.';

export const WALLET_METADATA = {
  id: WALLET_ITEM_ID,
  name: WALLET_NAME,
  description: WALLET_DESCRIPTION,
  items: {
    standard: ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'],
    priscilla: ['Priscilla ID Card', 'Priscilla Gold Card']
  }
};

export default WALLET_METADATA;
