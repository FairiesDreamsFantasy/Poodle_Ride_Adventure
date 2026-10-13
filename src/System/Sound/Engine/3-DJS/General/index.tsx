/**
 * Scientific Sound Engine 3-DJS Spatial Panning & HRTF Core Module
 * 3D spatial audio coordinate transformation, distance attenuation, and stereo panning.
 */



export class Sound3DJSSpatialEngine {

  public computeStereoPan(listenerX: number, soundX: number, maxDistance: number = 1000): number {
    const dx = soundX - listenerX;
    return Math.max(-1.0, Math.min(1.0, dx / maxDistance));
  }

  public computeDistanceAttenuation(dist: number, maxDist: number = 1000, rolloff: number = 1.0): number {
    if (dist <= 0) return 1.0;
    return Math.max(0.0, 1.0 - (dist / maxDist) * rolloff);
  }
        
}

export const Sound3DJSSpatialEngineInstance = new Sound3DJSSpatialEngine();
