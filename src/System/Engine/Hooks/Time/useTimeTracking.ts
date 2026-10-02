import { useEffect } from 'react';
import { GameState } from '../../../AI/In-Game/Logic/GameLogic';

export function useTimeTracking(
  gameState: GameState,
  gameStateRef: React.MutableRefObject<GameState>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  useEffect(() => {
    let interval: any;
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        const state = gameStateRef.current;
        const isAdventurePathArea = ['AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'].includes(state.area);
        if (isAdventurePathArea) {
          setGameState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying, setGameState, gameStateRef]);
}
