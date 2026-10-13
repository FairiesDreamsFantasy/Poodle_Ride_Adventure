/**
 * Scientific Sound Engine XL Audio Meter & Gain Sheet Core Module
 * Tabular audio VU meter decibel calculations and dynamic range compression formulas.
 */



export class SoundXLMeterGrid {

  public amplitudeToDecibels(amp: number): number {
    if (amp <= 0) return -100.0;
    return 20 * Math.log10(amp);
  }
        
}

export const SoundXLMeterGridInstance = new SoundXLMeterGrid();
