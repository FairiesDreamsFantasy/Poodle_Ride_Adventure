import React from 'react';
import { getCSTTime, formatTime, getLightingMode } from '../index';

export interface WorldClockProps {
  showSeconds?: boolean;
}

/**
 * General World Clock Component displaying game time and lighting phase.
 */
export const GeneralClockRenderer: React.FC<WorldClockProps> = () => {
  const [currentTime, setCurrentTime] = React.useState<Date>(getCSTTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCSTTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lighting = getLightingMode(currentTime);

  return (
    <div className="p-3 bg-indigo-950/60 border border-indigo-800/50 rounded flex items-center justify-between text-indigo-100">
      <div>
        <div className="text-xs text-indigo-400 font-medium">World Clock (CST)</div>
        <div className="font-mono text-lg font-bold">{formatTime(currentTime)}</div>
      </div>
      <div className="px-2 py-1 bg-indigo-900/60 rounded text-xs text-indigo-300 border border-indigo-700/40">
        {lighting} Mode
      </div>
    </div>
  );
};
