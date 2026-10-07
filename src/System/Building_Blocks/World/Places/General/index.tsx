import React from 'react';

export interface PlaceProps {
  placeName?: string;
  description?: string;
}

/**
 * General Places Renderer depicting landmark structures and locations.
 */
export const GeneralPlacesRenderer: React.FC<PlaceProps> = ({
  placeName = 'Rasta Manor Foyer',
  description = 'A majestic foyer connecting the Sky Ramp to the inner gardens.'
}) => {
  return (
    <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-lg text-amber-100">
      <h4 className="font-bold text-amber-300 text-sm mb-1">{placeName}</h4>
      <p className="text-xs text-amber-200/80">{description}</p>
    </div>
  );
};
