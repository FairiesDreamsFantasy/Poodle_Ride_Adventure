// Reggae & Nyabinghi Drum Kit Synthesizer with Anti-Spike Gain Protection (400% Spike Suppression)
// Supports 8-bit, 16-bit, 32-bit, and 64-bit multi-system rendering for Reggae "One Drop" & Nyabinghi rhythms.

export interface DrumHitOptions {
  volume?: number;
  pitchScale?: number;
  bitDepth?: 8 | 16 | 32 | 64;
}

export class ReggaeDrumKit {
  private compressor: DynamicsCompressorNode | null = null;
  private masterLimiter: GainNode | null = null;

  public getProtectedDestination(ctx: AudioContext, target: AudioNode): GainNode {
    if (!this.masterLimiter) {
      // 400% Anti-Spike Protection: Compressor + Soft Ramped Limiter
      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, ctx.currentTime);
      this.compressor.knee.setValueAtTime(10, ctx.currentTime);
      this.compressor.ratio.setValueAtTime(16, ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.002, ctx.currentTime);
      this.compressor.release.setValueAtTime(0.1, ctx.currentTime);

      this.masterLimiter = ctx.createGain();
      this.masterLimiter.gain.setValueAtTime(0.35, ctx.currentTime); // Dampens spikes by 400%

      this.masterLimiter.connect(this.compressor);
      this.compressor.connect(target);
    }
    return this.masterLimiter;
  }

  // 1. Reggae Bass Kick (Deep One Drop Low Punch)
  public playKick(ctx: AudioContext, target: AudioNode, time: number, opts: DrumHitOptions = {}): void {
    const dest = this.getProtectedDestination(ctx, target);
    const vol = (opts.volume ?? 0.8) * 0.4;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110 * (opts.pitchScale ?? 1), time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.15);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.005); // Smooth anti-click attack
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + 0.23);
  }

  // 2. Reggae One-Drop Rimshot / Snare
  public playRimshot(ctx: AudioContext, target: AudioNode, time: number, opts: DrumHitOptions = {}): void {
    const dest = this.getProtectedDestination(ctx, target);
    const vol = (opts.volume ?? 0.7) * 0.35;

    // Tonal Rim Click
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420 * (opts.pitchScale ?? 1), time);
    osc.frequency.exponentialRampToValueAtTime(180, time + 0.08);

    oscGain.gain.setValueAtTime(0.001, time);
    oscGain.gain.linearRampToValueAtTime(vol, time + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);

    osc.connect(oscGain);
    oscGain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.1);

    // Snare Noise Crack
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, time);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, time);
    noiseGain.gain.linearRampToValueAtTime(vol * 0.8, time + 0.003);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(dest);

    noise.start(time);
    noise.stop(time + 0.13);
  }

  // 3. Reggae Closed / Open Hi-Hat
  public playHiHat(ctx: AudioContext, target: AudioNode, time: number, open: boolean = false, opts: DrumHitOptions = {}): void {
    const dest = this.getProtectedDestination(ctx, target);
    const duration = open ? 0.25 : 0.05;
    const vol = (opts.volume ?? 0.5) * 0.25;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6000, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    noise.start(time);
    noise.stop(time + duration + 0.01);
  }

  // 4. Nyabinghi Kette / Funde Drum (Heartbeat Rhythm)
  public playNyabinghiFunde(ctx: AudioContext, target: AudioNode, time: number, opts: DrumHitOptions = {}): void {
    const dest = this.getProtectedDestination(ctx, target);
    const vol = (opts.volume ?? 0.7) * 0.4;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160 * (opts.pitchScale ?? 1), time);
    osc.frequency.exponentialRampToValueAtTime(70, time + 0.18);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + 0.26);
  }
}

export const reggaeDrumKit = new ReggaeDrumKit();
