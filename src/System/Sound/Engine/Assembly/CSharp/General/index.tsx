/**
 * Scientific Sound Engine Assembly CSharp Audio Event Dispatcher Core Module
 * Hierarchical audio bus routing, dB-to-linear calibrated gain curves,
 * constant-power stereo panning, priority ducking, and timed event queue.
 */

export interface AudioBusNode {
  name: string;
  parent: string | null;
  volume: number;
  muted: boolean;
  pan: number;
}

export interface QueuedAudioEvent {
  eventId: string;
  bus: string;
  priority: number;
  scheduledTimeMs: number;
  gainScalar: number;
}

export class SoundAssemblyCSharpEvents {
  private volumeBindings: Map<string, number> = new Map();
  private busHierarchy: Map<string, AudioBusNode> = new Map([
    ['master', { name: 'master', parent: null, volume: 1.0, muted: false, pan: 0 }],
    ['music', { name: 'music', parent: 'master', volume: 0.85, muted: false, pan: 0 }],
    ['sfx', { name: 'sfx', parent: 'master', volume: 1.0, muted: false, pan: 0 }],
    ['tts', { name: 'tts', parent: 'master', volume: 1.0, muted: false, pan: 0 }],
  ]);
  private eventQueue: QueuedAudioEvent[] = [];

  public setBusVolume(bus: string, volume: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, volume));
    this.volumeBindings.set(bus, clamped);
    const existing = this.busHierarchy.get(bus);
    if (existing) {
      existing.volume = clamped;
    } else {
      this.busHierarchy.set(bus, { name: bus, parent: 'master', volume: clamped, muted: false, pan: 0 });
    }
  }

  public getBusVolume(bus: string): number {
    return this.volumeBindings.get(bus) ?? this.busHierarchy.get(bus)?.volume ?? 1.0;
  }

  public registerBus(name: string, parent: string | null = 'master', volume: number = 1.0): void {
    const clamped = Math.max(0.0, Math.min(1.0, volume));
    this.volumeBindings.set(name, clamped);
    this.busHierarchy.set(name, { name, parent, volume: clamped, muted: false, pan: 0 });
  }

  public setBusMute(bus: string, muted: boolean): void {
    const node = this.busHierarchy.get(bus);
    if (node) node.muted = muted;
  }

  public resolveEffectiveBusGain(bus: string): number {
    let gain = 1.0;
    let cursor: string | null = bus;
    const visited = new Set<string>();
    while (cursor && !visited.has(cursor)) {
      visited.add(cursor);
      const node = this.busHierarchy.get(cursor);
      if (!node) break;
      if (node.muted) return 0.0;
      gain *= node.volume;
      cursor = node.parent;
    }
    return gain;
  }

  public dbToLinear(decibels: number): number {
    if (decibels <= -96) return 0.0;
    return Math.pow(10, decibels / 20);
  }

  public linearToDb(linear: number): number {
    if (linear <= 1e-5) return -96.0;
    return 20 * Math.log10(linear);
  }

  /** Equal-power (-3dB center) stereo panning law */
  public computeConstantPowerPan(pan: number): { leftGain: number; rightGain: number } {
    const clamped = Math.max(-1.0, Math.min(1.0, pan));
    const theta = ((clamped + 1.0) * Math.PI) / 4.0;
    return { leftGain: Math.cos(theta), rightGain: Math.sin(theta) };
  }

  /** Computes ducking multiplier for music/sfx when TTS narration is active */
  public computeSpeechDuckingGain(isSpeechActive: boolean, duckDepthDb: number = -9.0, currentGain: number = 1.0, smoothingAlpha: number = 0.15): number {
    const target = isSpeechActive ? this.dbToLinear(duckDepthDb) : 1.0;
    return currentGain + (target - currentGain) * Math.max(0.01, Math.min(1.0, smoothingAlpha));
  }

  public enqueueEvent(event: QueuedAudioEvent): void {
    this.eventQueue.push(event);
    this.eventQueue.sort((a, b) => a.scheduledTimeMs - b.scheduledTimeMs || b.priority - a.priority);
  }

  public drainDueEvents(currentTimeMs: number): QueuedAudioEvent[] {
    const due: QueuedAudioEvent[] = [];
    while (this.eventQueue.length > 0 && this.eventQueue[0].scheduledTimeMs <= currentTimeMs) {
      const item = this.eventQueue.shift();
      if (item) due.push(item);
    }
    return due;
  }
}

export const SoundAssemblyCSharpEventsInstance = new SoundAssemblyCSharpEvents();
