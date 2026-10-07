/**
 * MOVEMENT POWERHOUSE
 * Rhythms and motion logic for Anninne-Amelia Rose Julisus.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */

export interface GallopRhythmAA {
    timing: number[];
    volumes: number[];
    pitches: number[];
}

export const ANNINNE_AMELIA_GALLOP: GallopRhythmAA = {
    timing: [0, 0.08, 0.2], // 1-2-3 iconic rhythm
    volumes: [0.28, 0.35, 0.55], // Slightly more powerful than Abigay
    pitches: [60, 55, 50] // Slightly higher pitch
};

export const ANNINNE_AMELIA_NYHABINGHI_WALK = {
    timing: [0, 0.5, 1.0, 1.5], // Slow ceremonial rhythm
    volumes: [0.15, 0.15, 0.2, 0.2],
    pitches: [45, 45, 40, 40]
};

export function getAnninneAmeliaRhythm(mode: string): GallopRhythmAA {
    switch (mode) {
        case 'Walk': return ANNINNE_AMELIA_NYHABINGHI_WALK as any;
        default: return ANNINNE_AMELIA_GALLOP;
    }
}
