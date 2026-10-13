/**
 * Poodle.tsx
 * Core component for Anninne-Amelia Rose Julisus.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */
import React from 'react';
import { drawAnninneAmeliaRiderView } from './Animations/2-D';
import { drawPoodlePOV } from '../../Riders/Fairy-Rider/POV';
import { ANNINNE_AMELIA_DESCRIPTION } from './General';

export { drawAnninneAmeliaRiderView, drawPoodlePOV };

export const AnninneAmeliaAsset = {
  name: "Anninne-Amelia Rose Julisus",
  description: ANNINNE_AMELIA_DESCRIPTION,
  color: "#ff4500", // Red-orange
  accessories: ["gold collar", "gold tiara", "diamond charm"],
};

export function AnninneAmeliaOverlay({ isLeaning, isGraspingCollar }: { isLeaning: boolean, isGraspingCollar: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-20">
      {isLeaning && (
        <div className="text-white/40 text-sm font-medium mb-4 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Leaning forward towards Anninne-Amelia's warm red-orange head...
        </div>
      )}
      {isGraspingCollar && (
        <div className="text-white/40 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Grasping the gold collar...
        </div>
      )}
    </div>
  );
}
