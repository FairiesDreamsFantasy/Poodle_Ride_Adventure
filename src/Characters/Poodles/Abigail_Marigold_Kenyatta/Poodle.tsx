/**
 * Poodle.tsx
 * Core component for Abigail Marigold Kenyatta.
 */
import React from 'react';
import { drawAbigailRiderView } from './Animations/2-D';
import { ABIGAIL_DESCRIPTION } from './General';

export { drawAbigailRiderView };

export const AbigailAsset = {
  name: "Abigail Marigold Kenyatta",
  description: ABIGAIL_DESCRIPTION,
  color: "#f5f5dc", // Cream
  accessories: ["rose-gold collar", "rose-gold tiara"],
};

export function AbigailOverlay({ isLeaning }: { isLeaning: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-20">
      {isLeaning && (
        <div className="text-white/40 text-sm font-medium mb-4 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Leaning forward towards Abigail's warm cream head...
        </div>
      )}
    </div>
  );
}
