import { SoundManager } from '../../../Sound/SoundManager';

/**
 * Goat sound schedule and behavior.
 * Part of the "G" section of the modular Imports library.
 */

export function handleGoatSchedule(area: string, audio: SoundManager, announce: (msg: string) => void) {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Goat schedule: 17:00 to 07:00
  const isGoatActive = hour >= 17 || hour < 7;

  // Every 15 minutes (0, 15, 30, 45)
  if (isGoatActive && area === 'Garden' && minutes % 15 === 0 && seconds === 0) {
    const isHourly = minutes === 0;
    audio.playGoatSound(isHourly, area);
    if (isHourly) {
      const msg = "A goat lets out a long, resonant bleat across the garden. It is exactly on the hour.";
      announce(msg);
    }
  }
  
  // Random munching in garden
  if (isGoatActive && area === 'Garden' && Math.random() < 0.05) {
    audio.playGoatMunch();
  }
}
