/**
 * Registry Sound Engine Core
 * Handles registration and synthesis parameter indexing for SFX, BGM, Voice Synthesizers, and Sound language engines.
 */

export interface SoundRegistryEntry {
  id: string;
  name: string;
  category: 'SFX' | 'BGM' | 'TTS' | 'Synth' | 'Hybrid';
  bitMode: '16-bit' | '32-bit' | '64-bit';
  languageEngine?: string;
  active: boolean;
}

export const REGISTERED_SOUND_ENGINES: SoundRegistryEntry[] = [
  { id: 'snd-3djs', name: '3-DJS Spatial Sound Engine', category: 'Synth', bitMode: '32-bit', languageEngine: '3-DJS', active: true },
  { id: 'snd-assembly', name: 'Assembly Low-Level Sound Engine', category: 'Hybrid', bitMode: '64-bit', languageEngine: 'Assembly', active: true },
  { id: 'snd-basic', name: 'Basic Chiptune Sound Engine', category: 'SFX', bitMode: '16-bit', languageEngine: 'Basic', active: true },
  { id: 'snd-cotlin', name: 'Cotlin Audio Buffer Engine', category: 'Synth', bitMode: '32-bit', languageEngine: 'Cotlin', active: true },
  { id: 'snd-java', name: 'Java Sound Synthesizer Engine', category: 'Synth', bitMode: '32-bit', languageEngine: 'Java', active: true },
  { id: 'snd-php', name: 'PHP Stream Sound Engine', category: 'BGM', bitMode: '32-bit', languageEngine: 'PHP', active: true },
  { id: 'snd-python', name: 'Python SciSound DSP Engine', category: 'Synth', bitMode: '64-bit', languageEngine: 'Python', active: true },
  { id: 'snd-r', name: 'R Acoustic Harmonic Engine', category: 'Synth', bitMode: '64-bit', languageEngine: 'R', active: true },
  { id: 'snd-rust', name: 'Rust Zero-Latency Sound Engine', category: 'Hybrid', bitMode: '64-bit', languageEngine: 'Rust', active: true },
  { id: 'snd-sql', name: 'SQL Sample Database Engine', category: 'SFX', bitMode: '32-bit', languageEngine: 'SQL', active: true },
  { id: 'snd-swift', name: 'Swift CoreAudio Engine', category: 'Synth', bitMode: '32-bit', languageEngine: 'Swift', active: true },
  { id: 'snd-xml', name: 'XML MusicXML Score Engine', category: 'BGM', bitMode: '32-bit', languageEngine: 'XML', active: true },
  { id: 'snd-csv', name: 'CSV Sequence Sound Engine', category: 'SFX', bitMode: '16-bit', languageEngine: 'CSV', active: true },
  { id: 'snd-xl', name: 'XL Sound Matrix Engine', category: 'Synth', bitMode: '32-bit', languageEngine: 'XL', active: true },
  { id: 'snd-asp', name: 'ASP Sound Pipeline Engine', category: 'SFX', bitMode: '32-bit', languageEngine: 'ASP', active: true },
  { id: 'snd-codec', name: 'Codec PCM/ADPCM Audio Engine', category: 'Hybrid', bitMode: '32-bit', languageEngine: 'Codec', active: true }
];

export class SoundRegistryEngineCore {
  private soundEntries: Map<string, SoundRegistryEntry> = new Map();

  constructor() {
    for (const entry of REGISTERED_SOUND_ENGINES) {
      this.soundEntries.set(entry.id, entry);
    }
  }

  public registerSound(entry: SoundRegistryEntry): void {
    this.soundEntries.set(entry.id, entry);
  }

  public getSound(id: string): SoundRegistryEntry | undefined {
    return this.soundEntries.get(id);
  }

  public getAllSoundEngines(): SoundRegistryEntry[] {
    return Array.from(this.soundEntries.values());
  }
}

export const SoundRegistryEngine = new SoundRegistryEngineCore();

