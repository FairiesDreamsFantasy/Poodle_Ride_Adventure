import { useEffect, useRef } from 'react';
import { GameState, AREA_DIMENSIONS, getCSTTime, isOutdoorArea } from '../../../AI/In-Game/Logic/GameLogic';
import { SoundManager } from '../../../Sound/SoundManager';
import { getObstacleBeepInterval } from '../../../Building_Blocks/Obstacles/ObstacleManager';
import { triggerAmbientSounds } from '../../Scientific_Imports/A/Ambient';

export function useAudioEnvironment(
  gameState: GameState,
  gameStateRef: React.MutableRefObject<GameState>,
  audio: SoundManager,
  announceToScreenReader: (text: string) => void
) {
  const ambientIntervalRef = useRef<any>(null);

  // Obstacle beep logic
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isMuted) {
      const interval = setInterval(() => {
        const state = gameStateRef.current;
        const beepInterval = getObstacleBeepInterval(state, state.obstacles);
        if (beepInterval) {
          audio.playAscendingBeep(1); // Play a beep to indicate proximity
        }
      }, 500); // Check every 500ms
      return () => clearInterval(interval);
    }
  }, [gameState.isPlaying, gameState.isMuted, audio, gameStateRef]);

  // Ambient sound mixing
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isMuted) {
      ambientIntervalRef.current = setInterval(() => {
        triggerAmbientSounds(gameStateRef.current, audio);
      }, 3000);
    } else {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
    }
    return () => {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
    };
  }, [gameState.isPlaying, gameState.isMuted, audio, gameStateRef]);

  // Goat sound interval logic
  useEffect(() => {
    if (!gameState.isPlaying) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // Goat schedule: 17:00 to 07:00
      const isGoatActive = hour >= 17 || hour < 7;
      const currentArea = gameStateRef.current.area;
      const isOutdoor = isOutdoorArea(currentArea);

      // Every 15 minutes (0, 15, 30, 45) - Non-negotiable schedule
      if (isGoatActive && isOutdoor && minutes % 15 === 0 && seconds === 0) {
        const isHourly = minutes === 0;
        audio.playGoatSound(isHourly, currentArea);
        if (currentArea === 'Garden' && isHourly) {
          const msg = "A goat lets out a long, resonant bleat across the garden. It is exactly on the hour.";
          announceToScreenReader(msg);
        }
      }
      
      // Random munching in garden
      if (isGoatActive && currentArea === 'Garden' && Math.random() < 0.05) {
        audio.playGoatMunch();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState.isPlaying, announceToScreenReader, audio, gameStateRef]);
}
