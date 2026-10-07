import React from 'react';

export interface HUDStats {
  score: number;
  level: number | string;
  coins: number;
}

export function GeneralHUDStats({ score, level, coins }: HUDStats) {
  return (
    <div id="general-hud-stats" className="flex items-center gap-6 text-zinc-300 font-mono text-xs">
      <div id="hud-level-indicator">LEVEL: <span className="text-white font-bold">{level}</span></div>
      <div id="hud-score-indicator">SCORE: <span className="text-pink-500 font-bold">{score}</span></div>
      <div id="hud-coins-indicator">COINS: <span className="text-amber-400 font-bold">{coins}</span></div>
    </div>
  );
}
