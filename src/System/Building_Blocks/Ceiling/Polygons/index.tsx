import React from 'react';

export interface CeilingPolygon {
  points: { x: number; y: number }[];
  color: string;
  borderColor?: string;
  opacity?: number;
}

export interface CeilingPolygonsProps {
  polygons: CeilingPolygon[];
  width: number;
  height: number;
}

/**
 * Renders ceiling structures using highly robust vector polygons,
 * allowing sophisticated architectural panels to scale smoothly.
 */
export const CeilingPolygons: React.FC<CeilingPolygonsProps> = ({
  polygons,
  width,
  height
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute top-0 left-0 pointer-events-none"
      id="ceiling-polygons-svg"
    >
      {polygons.map((poly, idx) => {
        const pointsStr = poly.points.map(p => `${p.x},${p.y}`).join(' ');
        return (
          <polygon
            key={`ceiling-poly-${idx}`}
            points={pointsStr}
            fill={poly.color}
            stroke={poly.borderColor || 'transparent'}
            strokeWidth={1}
            opacity={poly.opacity ?? 1}
          />
        );
      })}
    </svg>
  );
};
