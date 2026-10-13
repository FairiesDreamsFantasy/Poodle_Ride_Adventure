/**
 * System/Registry/UI/Inventory/Items/index.tsx
 * Inventory Items registry, utilizing modular object definitions.
 */

import { UMBRELLA_METADATA } from '../../../../Items/Objects/Umbrellas';
import { WALLET_METADATA } from '../../../../Items/Objects/Essentials/Wallets';

export const PHOTO_OF_ABIGAY_NAME = 'Photo of Abigay';
export const PHOTO_OF_ABIGAY_DESCRIPTION = 'A beautiful picture of your massive white poodle partner Abigay.';

export const INVENTORY_ITEMS_REGISTRY = {
  umbrella: UMBRELLA_METADATA,
  wallet: WALLET_METADATA,
  photoOfAbigay: {
    name: PHOTO_OF_ABIGAY_NAME,
    description: PHOTO_OF_ABIGAY_DESCRIPTION
  }
};

export default INVENTORY_ITEMS_REGISTRY;
