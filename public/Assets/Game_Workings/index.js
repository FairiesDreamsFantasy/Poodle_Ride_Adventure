/**
 * Poodle Ride Adventure - Main Entry Point (index.js)
 * Coordinates character initialization, interactive movement, and audio.
 */
console.log("Poodle Ride Adventure engine: Initializing...");
export const GameConfig = {
  version: "1.0.0",
  startingPoint: "Level 0 (Rasta-Manor Portal)",
  poodles: {
    Abigay: { name: "Abigay Rose Kone", gallopRhythm: 400, soundAmplification: 1.040, noseType: "Warm and Dry" },
    AnninneAmelia: { name: "Anninne-Amelia Rose Julisus", gallopRhythm: 400, soundAmplification: 1.040, tailAngle: 45, noseType: "Warm and Dry" },
    Dymond: { name: "Dymond Daisy Qin-Reynolds", elegantBarkTone: "Warm", soundAmplification: 1.040, noseType: "Warm and Dry" },
    Abigail: { name: "Abigail Marigold Kenyatta", gallopRhythm: 300, soundAmplification: 1.050, noseType: "Warm and Dry" }
  }
};

