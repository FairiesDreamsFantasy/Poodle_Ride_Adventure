import React from 'react';

export interface ClimateProps {
  zoneName?: string;
  temperatureCelsius?: number;
  humidityPercent?: number;
}

/**
 * General Climate Renderer representing global atmospheric and ecological zone metrics.
 */
export const GeneralClimateRenderer: React.FC<ClimateProps> = ({
  zoneName = 'Tropical Highland',
  temperatureCelsius = 24,
  humidityPercent = 65
}) => {
  return (
    <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-lg text-emerald-100">
      <h4 className="text-sm font-bold text-emerald-400 mb-2">{zoneName} Zone</h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-emerald-900/30 p-2 rounded">
          <span className="text-emerald-500 block">Temperature</span>
          <span className="font-mono text-sm">{temperatureCelsius}°C</span>
        </div>
        <div className="bg-emerald-900/30 p-2 rounded">
          <span className="text-emerald-500 block">Humidity</span>
          <span className="font-mono text-sm">{humidityPercent}%</span>
        </div>
      </div>
    </div>
  );
};
