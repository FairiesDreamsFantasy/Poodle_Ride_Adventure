/**
 * System/Items/Essential_Objects/ID_Cards/index.tsx
 * Modular representation of the ID Cards.
 */

export const ID_CARD_NAME = 'ID Card';
export const ID_CARD_DESCRIPTION = 'This is your ID Card proving you are a certified poodle rider.';

export const PRISCILLA_ID_CARD_NAME = 'Priscilla ID Card';
export const PRISCILLA_ID_CARD_DESCRIPTION = "This is Priscilla's unique ID Card showing her name, address at the Vanity House, with no picture of Abigay.";

export const ID_CARD_METADATA = {
  standard: {
    name: ID_CARD_NAME,
    description: ID_CARD_DESCRIPTION
  },
  priscilla: {
    name: PRISCILLA_ID_CARD_NAME,
    description: PRISCILLA_ID_CARD_DESCRIPTION
  }
};

export default ID_CARD_METADATA;
