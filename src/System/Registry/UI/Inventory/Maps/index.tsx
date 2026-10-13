/**
 * System/Registry/UI/Inventory/Maps/index.tsx
 * Maps Screen details registry.
 */

export const MAPS_DETAILS = [
  {
    id: 'building',
    title: 'Current Building',
    description: 'Displays the name and level of the grand structure or estate you are currently traversing.'
  },
  {
    id: 'landmarks',
    title: 'Nearby Landmarks',
    description: 'Lists architectural, floral, or geographic markers of significance in your immediate vicinity.'
  },
  {
    id: 'description',
    title: 'Area Description',
    description: 'Provides a rich acoustic and spatial summary of the current play space.'
  }
];

export const MAPS_TITLES = MAPS_DETAILS.map(d => d.title);

export default MAPS_DETAILS;
