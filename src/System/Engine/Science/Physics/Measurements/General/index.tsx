/**
 * Measurement_Manager - General Logic
 * Manages dynamic and static measurements for obstacles and world features.
 */

export interface Measurement {
  id: string;
  name: string;
  width: number; // in units (1 unit = 1 foot)
  height: number;
  depth: number;
  isDynamic: boolean;
}

export const WORLD_MEASUREMENTS: Record<string, Measurement> = {
  RAMP_WIDTH: {
    id: 'ramp_width',
    name: 'Ramp Width',
    width: 8, // 8 feet wide
    height: 25, // 25 feet high
    depth: 20, // 20 feet long (772 to 792)
    isDynamic: false
  },
  FOYER_DIMENSIONS: {
    id: 'foyer_dims',
    name: 'Foyer Dimensions',
    width: 800,
    height: 45, // 45 feet high ceiling
    depth: 800,
    isDynamic: false
  },
  GARDEN_DIMENSIONS: {
    id: 'garden_dims',
    name: 'Garden Dimensions',
    width: 800,
    height: 0, // Open sky
    depth: 800,
    isDynamic: false
  }
};

export function getFootage(units: number, system: 'Imperial' | 'Metric' = 'Imperial'): string {
  if (system === 'Metric') {
    return `${(units * 0.3048).toFixed(2)} meters`;
  }
  return `${units} feet`;
}

export function getMeasurementDescription(value: number, system: 'Imperial' | 'Metric', type: 'distance' | 'longDistance' | 'smallDistance' | 'height'): string {
  if (system === 'Imperial') {
    switch (type) {
      case 'distance': return `${value} feet`;
      case 'longDistance': return `${(value / 5280).toFixed(2)} miles`;
      case 'smallDistance': return `${value} inches`;
      case 'height': return `${value} feet`;
    }
  } else {
    switch (type) {
      case 'distance': return `${(value * 0.3048).toFixed(2)} meters`;
      case 'longDistance': return `${(value * 0.00160934).toFixed(2)} kilometers`;
      case 'smallDistance': return `${(value * 2.54).toFixed(2)} centimeters`;
      case 'height': return `${(value * 0.3048).toFixed(2)} meters`;
    }
  }
  return `${value}`;
}

export function getSpeedDescription(unitsPerSecond: number, system: 'Imperial' | 'Metric'): string {
  if (system === 'Imperial') {
    // 1 ft/s = 0.681818 mph
    const mph = unitsPerSecond * 0.681818;
    return `${mph.toFixed(3)} mph`;
  } else {
    // 1 ft/s = 1.09728 km/h
    const kmh = unitsPerSecond * 1.09728;
    return `${kmh.toFixed(3)} km/h`;
  }
}

export function getPerimeter(width: number, depth: number): number {
  return (width + depth) * 2;
}

export function convertText(text: string, system: 'Imperial' | 'Metric'): string {
  if (system === 'Imperial') return text;
  
  // Handle dimensions like 8000x8000 feet or 8000 by 8000 feet
  let processed = text.replace(/(\d+(\.\d+)?)\s*(x|by)\s*(\d+(\.\d+)?)\s*(-?\s*(feet|foot))/gi, (match, w, wd, sep, h, hd, unit) => {
    const width = parseFloat(w);
    const height = parseFloat(h);
    const wMeters = (width * 0.3048).toFixed(2);
    const hMeters = (height * 0.3048).toFixed(2);
    const hasHyphen = match.includes('-');
    return `${wMeters} by ${hMeters}${hasHyphen ? '-' : ' '}meters`;
  });

  // Regex to find patterns like "20 feet", "20-foot", "20-feet"
  return processed.replace(/(\d+(\.\d+)?)\s*(-?\s*(feet|foot))/gi, (match, val, decimal, unit) => {
    const feet = parseFloat(val);
    const meters = (feet * 0.3048).toFixed(2);
    // Preserve the hyphen if it was there
    const hasHyphen = match.includes('-');
    return `${meters}${hasHyphen ? '-' : ' '}meters`;
  });
}
