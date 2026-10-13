/**
 * System/AI/In-Game/Category/Arena/General/index.tsx
 * 
 * Master Arena AI Pipeline.
 * Formulates area metrics, boundary enforcement, and 
 * environmental acoustics based on registry blueprints.
 */

import { ArenaRegistryConfig, AreaRegistryDefinition } from '../../../../../Registry/AI/In-Game/Category/Arena';

export interface AreaMetrics {
  width: number;
  height: number;
  collisionMargin: number;
  renderThreshold: number;
  isOutdoor: boolean;
  material: string;
}

export interface AcousticProfile {
  echoDelay: number;
  reverbGain: number;
  spatialPresence: 'High' | 'Medium' | 'Low';
}

/**
 * Formulates detailed area metrics from raw dimensions.
 * Calculates safety margins and render distance thresholds.
 */
export const formulateAreaMetrics = (areaId: string): AreaMetrics => {
  const area = ArenaRegistryConfig.areas.find(a => a.id === areaId);
  
  if (!area) {
    // Zero-Fallback Policy: Return standard manor defaults if area is missing
    return {
      width: 2000,
      height: 2000,
      collisionMargin: 20,
      renderThreshold: 5000,
      isOutdoor: false,
      material: 'Hardwood'
    };
  }

  return {
    width: area.width,
    height: area.height,
    collisionMargin: 20, // Standardized safety buffer
    renderThreshold: Math.max(area.width, area.height) * 1.5,
    isOutdoor: area.isOutdoor,
    material: area.material
  };
};

/**
 * Calculates environmental acoustic parameters based on area volume and material.
 */
export const getEnvironmentalAcoustics = (areaId: string): AcousticProfile => {
  const area = ArenaRegistryConfig.areas.find(a => a.id === areaId);
  
  if (!area) {
    return { echoDelay: 150, reverbGain: 0.2, spatialPresence: 'Medium' };
  }

  // Formulation based on material properties
  switch (area.material) {
    case 'Stone':
      return { echoDelay: 300, reverbGain: 0.5, spatialPresence: 'High' };
    case 'Hardwood':
      return { echoDelay: 150, reverbGain: 0.3, spatialPresence: 'Medium' };
    case 'Grass':
    case 'Dirt':
      return { echoDelay: 50, reverbGain: 0.05, spatialPresence: 'Low' };
    case 'Concrete':
      return { echoDelay: 200, reverbGain: 0.4, spatialPresence: 'High' };
    default:
      return { echoDelay: 150, reverbGain: 0.2, spatialPresence: 'Medium' };
  }
};

/**
 * Mathematically validates if coordinates are within the legal bounds of an area.
 * Prevents "quantum tunneling" or hardcoding drift errors.
 */
export const validateCoordinateIntegrity = (
  x: number, 
  y: number, 
  areaId: string
): { isValid: boolean; clampedX: number; clampedY: number } => {
  const metrics = formulateAreaMetrics(areaId);
  const margin = metrics.collisionMargin;
  
  const clampedX = Math.max(margin, Math.min(metrics.width - margin, x));
  const clampedY = Math.max(margin, Math.min(metrics.height - margin, y));
  
  return {
    isValid: x === clampedX && y === clampedY,
    clampedX,
    clampedY
  };
};

/**
 * Formulates a dynamic wall description based on distance to boundaries.
 */
export const formulateWallDescription = (
  x: number,
  y: number,
  areaId: string,
  direction: 'North' | 'South' | 'East' | 'West'
): string => {
  const metrics = formulateAreaMetrics(areaId);
  const areaName = ArenaRegistryConfig.areas.find(a => a.id === areaId)?.name || areaId;
  
  let distance = 0;
  switch (direction) {
    case 'North': distance = y; break;
    case 'South': distance = metrics.height - y; break;
    case 'East': distance = metrics.width - x; break;
    case 'West': distance = x; break;
  }

  if (distance < metrics.collisionMargin * 2) {
    return `You are touching the ${direction} wall of the ${areaName}.`;
  } else if (distance < 100) {
    return `You are very close to the ${direction} wall of the ${areaName}.`;
  }
  
  return `The ${direction} wall of the ${areaName} is ahead.`;
};
