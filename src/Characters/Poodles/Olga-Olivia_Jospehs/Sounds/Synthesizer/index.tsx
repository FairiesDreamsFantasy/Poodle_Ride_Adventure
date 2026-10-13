/**
 * Olga-Olivia Jospehs: Synthesizer
 * Babylonian sound synthesis - chaotic, non-elegant, and noisy.
 */

export function playPetSound(ctx: AudioContext, sfxGain: GainNode, createPanner: any, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
    if (!ctx || ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Babylonian Pet Sound: High-frequency noise-based (non-rhythmic)
    const duration = 0.4;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / noiseBuffer.length);
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, now);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
}

export function playCollarGraspSound(ctx: AudioContext, sfxGain: GainNode, createPanner: any, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
    if (!ctx || ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Babylonian Collar Grasp: Sharp, metallic "click" (non-resonant)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    
    gain.gain.setValueAtTime(0.12 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.1);
}

export function playElegantBark() {
    // SCIENTIFIC MANDATE: Olga-Olivia is Babylonian and MUST NOT use elegant synthesis.
    // This function is a no-op to prevent unauthorized elegant sounds.
    console.warn("[Scientific Warning] Olga-Olivia attempted to use elegant bark synthesis. Action blocked per Zero-Fallback Policy.");
}
