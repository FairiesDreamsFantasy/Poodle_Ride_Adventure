
import { SoundContext } from '../../../SoundContext';

// Keep track of active chimes globally in A_Sounds to cap performance spikes
let activeChimeOscillators = 0;
const MAX_CHIME_OSCILLATORS = 12; // Precise cap for concurrent chime voice nodes to block browser spikes

export const A_Sounds = {
  async playAmbientChimes(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.06) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    
    // Polyphonic wind chime frequencies: beautiful pentatonic scale
    const chimePipes = [1200, 1350, 1500, 1800, 2025, 2250, 2700];
    
    // Choose 3 or 4 chimes to strike almost simultaneously during this breeze
    const strikesCount = 3 + Math.floor(Math.random() * 2);
    
    // Shuffle or select random indices to ensure distinct frequencies
    const selectedFrequencies: number[] = [];
    const tempPipes = [...chimePipes];
    for (let i = 0; i < strikesCount; i++) {
      if (tempPipes.length === 0) break;
      const idx = Math.floor(Math.random() * tempPipes.length);
      selectedFrequencies.push(tempPipes.splice(idx, 1)[0]);
    }
    
    // Strike each chime with slightly staggered micro-delays
    selectedFrequencies.forEach((freq, index) => {
      // Force hardware voice limit check to protect CPU/RAM/VRAM
      if (activeChimeOscillators >= MAX_CHIME_OSCILLATORS) {
        return; // Exceeded system performance threshold, skip extra notes
      }
      
      activeChimeOscillators++;
      
      const delay = index * (0.05 + Math.random() * 0.12); // Stagger interval (50ms - 170ms)
      const strikeTime = now + delay;
      const chimeDuration = 2.5 + Math.random() * 1.0; // Dynamic ring decay time
      
      // Secondary overtones to simulate realistic metal tubes (metallic shimmer)
      const primaryOsc = ctx.createOscillator();
      const overtoneOsc = ctx.createOscillator();
      const primaryGain = ctx.createGain();
      const overtoneGain = ctx.createGain();
      
      const panner = createPanner(x, y, z);
      
      // 1. Primary fundamental tone (pure, sweet bell-like sine)
      primaryOsc.type = 'sine';
      primaryOsc.frequency.setValueAtTime(freq, strikeTime);
      // Subtle detune modulation over time for a dreamy natural resonance
      primaryOsc.frequency.linearRampToValueAtTime(freq + (Math.random() * 4 - 2), strikeTime + chimeDuration);
      
      primaryGain.gain.setValueAtTime(0, strikeTime);
      primaryGain.gain.linearRampToValueAtTime(volume * 0.8, strikeTime + 0.01); // sharp strike attack
      primaryGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + chimeDuration); // slow warm ring decay
      
      // 2. High metallic overtone (sine at 2.76x fundamental frequency, replicating physical metallophone modes)
      const overtoneFreq = freq * 2.76;
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(overtoneFreq, strikeTime);
      
      overtoneGain.gain.setValueAtTime(0, strikeTime);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.22, strikeTime + 0.005); // immediate hot strike metal resonance
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.6); // dampens much faster than fundamental
      
      // Node connections
      primaryOsc.connect(primaryGain);
      primaryGain.connect(panner);
      
      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(panner);
      
      panner.connect(sfxGain);
      
      // Trigger schedules
      primaryOsc.start(strikeTime);
      overtoneOsc.start(strikeTime);
      
      primaryOsc.stop(strikeTime + chimeDuration);
      overtoneOsc.stop(strikeTime + 0.6);
      
      // Advanced strict cleanup for GC (prevents memory leaks and CPU/RAM/VRAM hogging)
      let nodesCleaned = false;
      const cleanup = () => {
        if (nodesCleaned) return;
        nodesCleaned = true;
        activeChimeOscillators = Math.max(0, activeChimeOscillators - 1);
        try {
          primaryOsc.disconnect();
          overtoneOsc.disconnect();
          primaryGain.disconnect();
          overtoneGain.disconnect();
          panner.disconnect();
        } catch (e) {
          // Guard against multiple calls or already closed context
        }
      };
      
      primaryOsc.onended = cleanup;
      overtoneOsc.onended = cleanup;
      
      // Fallback timer if onended event does not fire (safeguard)
      setTimeout(() => {
        cleanup();
      }, (chimeDuration + delay + 0.5) * 1000);
    });
  },

  async playAmbientFarm(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain } = context;
    const now = ctx.currentTime;
    const duration = 5.0;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(filter); filter.connect(gain); gain.connect(sfxGain);
    noise.start();

    if (Math.random() > 0.5) {
        const chirp = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        chirp.type = 'sine';
        chirp.frequency.setValueAtTime(2500, now);
        chirp.frequency.exponentialRampToValueAtTime(3500, now + 0.1);
        chirpGain.gain.setValueAtTime(0.02, now);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        chirp.connect(chirpGain); chirpGain.connect(sfxGain);
        chirp.start(); chirp.stop(now + 0.1);
    }
  },

  async playAmbientStreet(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.055, filterFreq: number = 400) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
    noise.stop(now + 2);
  },

  async playArchwayReverb(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.4) {
    const { ctx, sfxGain, reverbDelay, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.5);
    
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(reverbDelay);
    panner.connect(sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.8);
  },

  async playAscendingBeep(context: SoundContext, step: number, x: number = 0, y: number = 0, z: number = 0) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);

    const freq = 440 + (step * 40);
    osc.frequency.setValueAtTime(freq, now);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  },

  startAmbientGarden(context: SoundContext) {
    // Elegant lowpass filtered wind & birds
    this.playAmbientGarden(context, 0, 0, 0, 0.04);
  },

  async playAmbientGarden(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volume: number = 0.04) {
    const { ctx, sfxGain, createPanner } = context;
    const now = ctx.currentTime;
    
    // Lowpass filtered noise for warm wind rustle: 3 seconds long
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    
    const gain = ctx.createGain();
    const panner = createPanner(x, y, z);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(sfxGain);
    
    noise.start();
    noise.stop(now + 3);

    // Occasionally add a sweet bird chirp dynamically
    if (Math.random() < 0.6) {
      const bird = ctx.createOscillator();
      const birdGain = ctx.createGain();
      bird.type = 'sine';
      bird.frequency.setValueAtTime(2800, now + 0.5);
      bird.frequency.exponentialRampToValueAtTime(3800, now + 0.65);
      
      birdGain.gain.setValueAtTime(0, now);
      birdGain.gain.linearRampToValueAtTime(0.008, now + 0.5);
      birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
      
      bird.connect(birdGain);
      birdGain.connect(panner);
      
      bird.start(now + 0.5);
      bird.stop(now + 0.65);
    }
  }
};
