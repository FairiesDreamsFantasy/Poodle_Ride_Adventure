/**
 * System/Registry/UI/Inventory/Heart_Meter/index.tsx
 * Heart Meter Screen details registry.
 */

export const HEART_METER_DETAILS = [
  {
    id: 'kindness',
    title: 'Kindness Level',
    description: 'Tracks your overall benevolence and gentle care during your poodle rides.'
  },
  {
    id: 'hearts',
    title: 'Heart Count',
    description: 'The number of pure hearts you have earned. Keep petting and loving your poodles.'
  },
  {
    id: 'deeds',
    title: 'Recent Deeds',
    description: 'A summary of your latest actions reflecting your connection with your animal friends.'
  }
];

export const HEART_METER_TITLES = HEART_METER_DETAILS.map(d => d.title);

export default HEART_METER_DETAILS;
