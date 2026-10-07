import React from 'react';

export interface WeatherProps {
  weatherType?: 'Sunny' | 'Rain' | 'Snow' | 'Windy' | 'Foggy' | 'Cloudy';
}

/**
 * General Weather Renderer depicting active weather effects.
 */
export const GeneralWeatherRenderer: React.FC<WeatherProps> = ({
  weatherType = 'Sunny'
}) => {
  return (
    <div className="p-3 bg-sky-950/40 border border-sky-800/40 rounded-lg text-sky-100 flex items-center justify-between">
      <div>
        <span className="text-xs text-sky-400 block">Atmospheric Condition</span>
        <span className="font-bold text-sm text-sky-200">{weatherType}</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-sky-900/60 border border-sky-700/50 flex items-center justify-center text-xs font-mono">
        {weatherType[0]}
      </div>
    </div>
  );
};
