/**
 * Chloe Joseph Gray-Michaels: Synthesizer
 * Babylonian sound synthesis - raspier and less elegant than crafted counterparts.
 */

export function playPetSound(ctx: AudioContext, sfxGain: GainNode, createPanner: any, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
    if (!ctx || ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Chloe Pet Sound: Slightly raspy sawtooth modulation
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    
    gain.gain.setValueAtTime(0.05 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.3);
}

export function playCollarGraspSound(ctx: AudioContext, sfxGain: GainNode, createPanner: any, x: number, y: number, z: number, volumeMultiplier: number = 1.0) {
    if (!ctx || ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const panner = createPanner(x, y, z);
    
    // Chloe Collar Grasp: Less refined, square wave click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
    
    gain.gain.setValueAtTime(0.08 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    osc.start();
    osc.stop(now + 0.1);
}

export function playElegantBark() {
    // Chloe is Babylonian Class and MUST NOT use elegant synthesis.
    console.warn("[Scientific Warning] Chloe attempted to use elegant bark synthesis. Action blocked.");
}
