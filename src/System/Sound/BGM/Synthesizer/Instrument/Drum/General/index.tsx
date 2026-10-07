import { reggaeDrumKit } from '../Kit';

export * from '../Kit';

export class DrumInstrumentEngine {
  public playHit(ctx: AudioContext, target: AudioNode, type: 'kick' | 'rimshot' | 'hihat' | 'open_hihat' | 'funde', time: number, vol: number = 0.8): void {
    switch (type) {
      case 'kick':
        reggaeDrumKit.playKick(ctx, target, time, { volume: vol });
        break;
      case 'rimshot':
        reggaeDrumKit.playRimshot(ctx, target, time, { volume: vol });
        break;
      case 'hihat':
        reggaeDrumKit.playHiHat(ctx, target, time, false, { volume: vol });
        break;
      case 'open_hihat':
        reggaeDrumKit.playHiHat(ctx, target, time, true, { volume: vol });
        break;
      case 'funde':
        reggaeDrumKit.playNyabinghiFunde(ctx, target, time, { volume: vol });
        break;
    }
  }
}

export const drumInstrumentEngine = new DrumInstrumentEngine();
