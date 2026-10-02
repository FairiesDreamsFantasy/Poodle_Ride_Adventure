/**
 * Poodle.tsx
 * Core component for Abigay Rose Kone.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */
import React from 'react';
import { drawPoodleRiderView } from './Animations/2-D';
import { drawPoodlePOV } from '../../Riders/Fairy-Rider/POV';
import { ABIGAY_DESCRIPTION } from './General';

export { drawPoodleRiderView, drawPoodlePOV };

export const PoodleAsset = {
  name: "Poodle",
  description: ABIGAY_DESCRIPTION,
  color: "#ffffff",
  accessories: ["pink collar", "pink tiara", "diamond charm"],
};

export function PoodleOverlay({ isLeaning, isGraspingCollar }: { isLeaning: boolean, isGraspingCollar: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-20">
      {isLeaning && (
        <div className="text-white/40 text-sm font-medium mb-4 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Leaning forward towards the poodle's warm furry head...
        </div>
      )}
      {isGraspingCollar && (
        <div className="text-white/40 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Grasping the pink collar...
        </div>
      )}
    </div>
  );
}
