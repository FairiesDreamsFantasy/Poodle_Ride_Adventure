/**
 * 64-bit Precision Audio Synthesis Engine
 * Generates sample waveforms with double-precision floating point math (Float64Array),
 * then translates them into standard AudioBuffers for jitter-free, click-free playbacks.
 * This provides ultra-precision and eliminates browser-specific AudioContext floating point drift.
 */

export function applyBiquadFilter64(
  input: Float64Array,
  sampleRate: number,
  frequency: number,
  Q: number,
  type: 'bandpass' | 'lowpass' = 'bandpass'
): Float64Array {
  const output = new Float64Array(input.length);
  const w0 = 2 * Math.PI * frequency / sampleRate;
  const cosW0 = Math.cos(w0);
  const sinW0 = Math.sin(w0);
  const alpha = sinW0 / (2 * Q);

  let b0 = 0, b1 = 0, b2 = 0, a0 = 1, a1 = 0, a2 = 0;

  if (type === 'bandpass') {
    b0 = sinW0 / 2;
    b1 = 0;
    b2 = -sinW0 / 2;
    a0 = 1 + alpha;
    a1 = -2 * cosW0;
    a2 = 1 - alpha;
  } else if (type === 'lowpass') {
    b0 = (1 - cosW0) / 2;
    b1 = 1 - cosW0;
    b2 = (1 - cosW0) / 2;
    a0 = 1 + alpha;
    a1 = -2 * cosW0;
    a2 = 1 - alpha;
  }

  const b0_n = b0 / a0;
  const b1_n = b1 / a0;
  const b2_n = b2 / a0;
  const a1_n = a1 / a0;
  const a2_n = a2 / a0;

  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;

  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    const y = b0_n * x + b1_n * x1 + b2_n * x2 - a1_n * y1 - a2_n * y2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
    output[i] = y;
  }

  return output;
}

export function generate64BitYip(
  sampleRate: number,
  pitch: number,
  volume: number,
  disableDescendingPitch: boolean = false
): Float64Array {
  const duration = 0.08;
  const length = Math.ceil(duration * sampleRate);
  const buffer = new Float64Array(length);
  
  const jitter = (Math.random() - 0.5) * (pitch * 0.0025);
  const naturalPitch = pitch + jitter;
  
  const sweepLogK = Math.log(0.7) / 0.08;
  
  for (let i = 0; i < length; i++) {
    const tau = i / sampleRate;
    
    let phase = 0;
    if (disableDescendingPitch) {
      phase = 2 * Math.PI * naturalPitch * tau;
    } else {
      phase = 2 * Math.PI * naturalPitch * (Math.pow(0.7, tau / 0.08) - 1) / sweepLogK;
    }
    
    let p = phase % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    const sawVal = 2 * (p / (2 * Math.PI)) - 1;
    
    let env = 0;
    if (tau < 0.01) {
      env = volume * (tau / 0.01);
    } else {
      const decayTau = tau - 0.01;
      env = volume * Math.pow(0.001 / volume, decayTau / 0.07);
    }
    
    buffer[i] = sawVal * env;
  }
  
  return applyBiquadFilter64(buffer, sampleRate, pitch, 1.0, 'bandpass');
}

export function generate64BitBow(
  sampleRate: number,
  f0: number, f1: number, f2: number,
  g0: number, g1: number, g2: number,
  filterFreq: number, Q: number,
  volume: number,
  hasOsc2: boolean = true
): Float64Array {
  const duration = 0.15;
  const length = Math.ceil(duration * sampleRate);
  
  const osc1Buffer = new Float64Array(length);
  const osc2Buffer = new Float64Array(length);
  
  const getPhaseAtTime = (tau: number, startF: number, midF: number, endF: number) => {
    if (tau <= 0.03) {
      const ratio = tau / 0.03;
      if (startF === midF) {
        return 2 * Math.PI * startF * tau;
      }
      return 2 * Math.PI * startF * (Math.pow(midF / startF, ratio) - 1) / (Math.log(midF / startF) / 0.03);
    } else if (tau <= 0.13) {
      const phaseAt03 = 2 * Math.PI * startF * (midF / startF - 1) / (Math.log(midF / startF) / 0.03);
      const ratio = (tau - 0.03) / 0.10;
      if (midF === endF) {
        return phaseAt03 + 2 * Math.PI * midF * (tau - 0.03);
      }
      return phaseAt03 + 2 * Math.PI * midF * (Math.pow(endF / midF, ratio) - 1) / (Math.log(endF / midF) / 0.10);
    } else {
      const phaseAt03 = 2 * Math.PI * startF * (midF / startF - 1) / (Math.log(midF / startF) / 0.03);
      const phaseAt13 = phaseAt03 + 2 * Math.PI * midF * (endF / midF - 1) / (Math.log(endF / midF) / 0.10);
      return phaseAt13 + 2 * Math.PI * endF * (tau - 0.13);
    }
  };

  for (let i = 0; i < length; i++) {
    const tau = i / sampleRate;
    
    const phase1 = getPhaseAtTime(tau, f0, f1, f2);
    let p1 = phase1 % (2 * Math.PI);
    if (p1 < 0) p1 += 2 * Math.PI;
    const normalizedP1 = p1 / (2 * Math.PI);
    const triVal = normalizedP1 < 0.5 ? 4 * normalizedP1 - 1 : 3 - 4 * normalizedP1;
    
    let env1 = 0;
    if (tau < 0.015) {
      env1 = volume * (tau / 0.015);
    } else {
      env1 = volume * Math.pow(0.01 / volume, (tau - 0.015) / 0.115);
    }
    osc1Buffer[i] = triVal * env1;
    
    if (hasOsc2) {
      const phase2 = getPhaseAtTime(tau, g0, g1, g2);
      const sineVal = Math.sin(phase2);
      
      let env2 = 0;
      if (tau < 0.015) {
        env2 = (volume * 0.45) * (tau / 0.015);
      } else {
        env2 = (volume * 0.45) * Math.pow(0.001 / (volume * 0.45), (tau - 0.015) / 0.115);
      }
      osc2Buffer[i] = sineVal * env2;
    }
  }
  
  const filteredOsc1 = applyBiquadFilter64(osc1Buffer, sampleRate, filterFreq, Q, 'bandpass');
  
  const combined = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    combined[i] = filteredOsc1[i] + osc2Buffer[i];
  }
  
  return combined;
}

export function createUnified64BitBarkBuffer(
  sampleRate: number,
  animal: string,
  barkType: string,
  disableInternalEcho: boolean,
  isInternalReverbEnabled: boolean,
  disableDescendingPitch: boolean = false
): Float64Array {
  let totalDuration = 0.5;
  if (barkType === 'BOW') {
    totalDuration = 0.6;
  }
  
  const length = Math.ceil(totalDuration * sampleRate);
  const buffer = new Float64Array(length);
  
  const mixIntoBuffer = (source: Float64Array, delaySec: number) => {
    const delaySamples = Math.floor(delaySec * sampleRate);
    for (let i = 0; i < source.length; i++) {
      if (delaySamples + i < buffer.length) {
        buffer[delaySamples + i] += source[i];
      }
    }
  };
  
  if (barkType === 'BOW') {
    if (animal === 'Anninne-Amelia Rose Julisus') {
      const bow = generate64BitBow(sampleRate, 650, 1200, 350, 1300, 1900, 480, 1400, 4, 0.55, true);
      mixIntoBuffer(bow, 0);
    } else if (animal === 'Abigail Marigold Kenyatta') {
      const bow = generate64BitBow(sampleRate, 520, 960, 280, 1040, 1520, 384, 1120, 4, 0.55, true);
      mixIntoBuffer(bow, 0);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      const volume = 0.55;
      const bow = generate64BitBow(sampleRate, 500, 900, 280, 0, 0, 0, 1000, 4, volume, false);
      mixIntoBuffer(bow, 0);
      if (!disableInternalEcho) {
        const echoVolume = isInternalReverbEnabled ? volume * 0.6 : volume * 0.4;
        const echo1 = generate64BitBow(sampleRate, 500, 900, 280, 0, 0, 0, 1000, 4, echoVolume, false);
        const echo2 = generate64BitBow(sampleRate, 500, 900, 280, 0, 0, 0, 1000, 4, echoVolume * 0.5, false);
        mixIntoBuffer(echo1, 0.15);
        mixIntoBuffer(echo2, 0.30);
      }
    } else if (animal === 'Classic White Poodle') {
      const bowLength = Math.ceil(0.18 * sampleRate);
      const osc = new Float64Array(bowLength);
      for (let i = 0; i < bowLength; i++) {
        const tau = i / sampleRate;
        const phase = 2 * Math.PI * 450 * (Math.pow(250 / 450, tau / 0.18) - 1) / (Math.log(250 / 450) / 0.18);
        let p = phase % (2 * Math.PI);
        if (p < 0) p += 2 * Math.PI;
        const normalized = p / (2 * Math.PI);
        const triVal = normalized < 0.5 ? 4 * normalized - 1 : 3 - 4 * normalized;
        
        let env = 0;
        if (tau < 0.02) {
          env = 0.65 * (tau / 0.02);
        } else {
          env = 0.65 * Math.pow(0.001 / 0.65, (tau - 0.02) / 0.16);
        }
        osc[i] = triVal * env;
      }
      const filtered = applyBiquadFilter64(osc, sampleRate, 550, 1.0, 'lowpass');
      mixIntoBuffer(filtered, 0);
    } else {
      const bow = generate64BitBow(sampleRate, 585, 1080, 315, 1170, 1710, 432, 1260, 4, 0.55, true);
      mixIntoBuffer(bow, 0);
    }
  } else {
    let p1 = 900, p2 = 850, v1 = 0.5438, v2 = 0.4352;
    let echoDelays = [0.15, 0.30];
    let isDymond = false;
    
    if (animal === 'Anninne-Amelia Rose Julisus') {
      p1 = 1000; p2 = 950; v1 = 0.5464; v2 = 0.4373;
      echoDelays = [0.12, 0.25];
    } else if (animal === 'Abigail Marigold Kenyatta') {
      p1 = 800; p2 = 750; v1 = 0.5542; v2 = 0.4435;
      echoDelays = [0.15, 0.30];
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      p1 = 868.5; p2 = 820.25; v1 = 0.4846; v2 = 0.4307;
      echoDelays = [0.15, 0.30];
      isDymond = true;
    } else if (animal === 'Classic White Poodle') {
      p1 = 700; p2 = 650; v1 = 0.5438; v2 = 0.4352;
      echoDelays = [0.15, 0.30];
    }
    
    let y1: Float64Array;
    let y2: Float64Array;
    
    if (isDymond) {
      const rawY1 = generate64BitYip(sampleRate, p1, v1, disableDescendingPitch);
      const rawY2 = generate64BitYip(sampleRate, p2, v2, disableDescendingPitch);
      y1 = applyBiquadFilter64(rawY1, sampleRate, p1 * 1.5, 1.0, 'lowpass');
      y2 = applyBiquadFilter64(rawY2, sampleRate, p2 * 1.5, 1.0, 'lowpass');
    } else {
      y1 = generate64BitYip(sampleRate, p1, v1, disableDescendingPitch);
      y2 = generate64BitYip(sampleRate, p2, v2, disableDescendingPitch);
    }
    
    mixIntoBuffer(y1, 0);
    mixIntoBuffer(y2, 0.01);
    
    if (!disableInternalEcho) {
      let echoVolume = 0;
      if (animal === 'Anninne-Amelia Rose Julisus') {
        echoVolume = isInternalReverbEnabled ? 0.3278 : 0.2187;
      } else if (animal === 'Abigail Marigold Kenyatta') {
        echoVolume = isInternalReverbEnabled ? 0.3426 : 0.2286;
      } else if (animal === 'Dymond Daisy Qin-Reynolds') {
        echoVolume = isInternalReverbEnabled ? 0.3229 : 0.2152;
      } else if (animal === 'Classic White Poodle') {
        echoVolume = isInternalReverbEnabled ? 0.3262 : 0.2176;
      } else {
        echoVolume = isInternalReverbEnabled ? 0.3262 : 0.2176;
      }
      
      let e1: Float64Array;
      let e2: Float64Array;
      
      if (isDymond) {
        const rawE1 = generate64BitYip(sampleRate, p1, echoVolume, disableDescendingPitch);
        const rawE2 = generate64BitYip(sampleRate, p1, echoVolume * 0.5, disableDescendingPitch);
        e1 = applyBiquadFilter64(rawE1, sampleRate, p1 * 1.5, 1.0, 'lowpass');
        e2 = applyBiquadFilter64(rawE2, sampleRate, p1 * 1.5, 1.0, 'lowpass');
      } else {
        e1 = generate64BitYip(sampleRate, p1, echoVolume, disableDescendingPitch);
        e2 = generate64BitYip(sampleRate, p1, echoVolume * 0.5, disableDescendingPitch);
      }
      
      mixIntoBuffer(e1, echoDelays[0]);
      mixIntoBuffer(e2, echoDelays[1]);
    }
  }
  
  return buffer;
}
