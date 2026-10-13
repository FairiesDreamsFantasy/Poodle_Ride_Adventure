import * as CraftedAI from '../Crafted/General';

export * from '../Crafted/index.tsx';
export * from '../Classic/index.tsx';

export const handlePoodleAboutAI = (
  id: string,
  speak: (t: string, l?: string) => void
): void => {
  switch (id) {
    case 'abigay_rose_kone':
      CraftedAI.handleAbigayRoseKoneAboutAI(speak);
      break;
    case 'anninne_amelia_rose_julisus':
      CraftedAI.handleAnninneAmeliaRoseJulisusAboutAI(speak);
      break;
    case 'dymond_daisy_qin_reynolds':
      CraftedAI.handleDymondDaisyQinReynoldsAboutAI(speak);
      break;
    case 'abigail_marigold_kenyatta':
      CraftedAI.handleAbigailMarigoldKenyattaAboutAI(speak);
      break;
    default:
      speak("A majestic poodle companion.", 'EN_US');
      break;
  }
};
