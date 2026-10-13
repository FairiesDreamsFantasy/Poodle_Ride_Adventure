/**
 * Scientific Sound Engine CSV Rhythm Timing Parser Core Module
 * Parsing BPM cue points, gallop interval timestamps, and footstep audio triggers.
 */



export class SoundCSVRhythmParser {

  public parseRhythmTrack(csv: string): Array<{ beat: number; soundKey: string }> {
    return csv.trim().split("\n").map(line => {
      const [b, k] = line.split(",");
      return { beat: parseFloat(b) || 0, soundKey: (k || "").trim() };
    });
  }
        
}

export const SoundCSVRhythmParserInstance = new SoundCSVRhythmParser();
