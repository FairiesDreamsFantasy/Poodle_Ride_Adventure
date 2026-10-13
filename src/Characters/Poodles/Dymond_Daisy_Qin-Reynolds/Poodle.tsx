/**
 * Poodle.tsx
 * Core component for Dymond Daisy Qin-Reynolds.
 */
import React from 'react';
import { drawDymondRiderView } from './Animations/2-D';
import { DYMOND_DESCRIPTION } from './General';

export { drawDymondRiderView };

export const DymondAsset = {
  name: "Dymond Daisy Qin-Reynolds",
  description: DYMOND_DESCRIPTION,
  color: "#ffff00", // Light yellow
  accessories: ["dynamic collar", "heart tiara", "diamond charm"],
};

export function DymondOverlay({ isLeaning }: { isLeaning: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-20">
      {isLeaning && (
        <div className="text-white/40 text-sm font-medium mb-4 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Leaning forward towards Dymond's warm light-yellow head...
        </div>
      )}
    </div>
  );
}
