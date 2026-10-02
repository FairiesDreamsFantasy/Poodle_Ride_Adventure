/**
 * Scientific Sound Engine Basic MML Tone Sequencer Core Module
 * Deterministic Music Macro Language (MML) tone frequency sequencing.
 */



export class SoundBasicMMLSequencer {

  public noteToFrequency(note: string, octave: number = 4): number {
    const noteMap: Record<string, number> = {
      C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11
    };
    const semitone = noteMap[note.toUpperCase()] ?? 9;
    return 440 * Math.pow(2, (semitone - 9 + (octave - 4) * 12) / 12);
  }
        
}

export const SoundBasicMMLSequencerInstance = new SoundBasicMMLSequencer();
