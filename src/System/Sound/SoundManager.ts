/**
 * Rabbit Rider: Zion Garden - Sound Manager
 * Located in src/Sound/SoundManager.ts
 */

import { GoogleGenAI } from "@google/genai";
import { TTSLanguage, BitMode, SynthMode } from '../../types';
import { TTSManager } from './TTS/General/TTSManager';
import { ClassicSynth, AdvancedSynth, ISynth } from "./Synths";
import { VoiceManager } from "./Synth_Voices/VoiceManager";

import { A_Sounds } from './SFX/Alphabetical/A/A_Sounds';
import { B_Sounds } from './SFX/Alphabetical/B/B_Sounds';
import { C_Sounds } from './SFX/Alphabetical/C/C_Sounds';
import { D_Sounds } from './SFX/Alphabetical/D';
import { F_Sounds } from './SFX/Alphabetical/F/F_Sounds';
import { G_Sounds } from './SFX/Alphabetical/G/G_Sounds';
import { I_Sounds } from './SFX/Alphabetical/I/I_Sounds';
import { J_Sounds } from './SFX/Alphabetical/J/J_Sounds';
import { L_Sounds } from './SFX/Alphabetical/L/L_Sounds';
import { M_Sounds } from './SFX/Alphabetical/M/M_Sounds';
import { N_Sounds } from './SFX/Alphabetical/N/N_Sounds';
import { O_Sounds } from './SFX/Alphabetical/O/O_Sounds';
import { P_Sounds } from './SFX/Alphabetical/P/P_Sounds';
import { R_Sounds } from './SFX/Alphabetical/R/R_Sounds';
import { S_Sounds } from './SFX/Alphabetical/S/S_Sounds';
import { T_Sounds } from './SFX/Alphabetical/T/T_Sounds';
import { W_Sounds } from './SFX/Alphabetical/W/W_Sounds';
import { Y_Sounds } from './SFX/Alphabetical/Y/Y_Sounds';

import { AmbienceRegistry } from './BGM/Ambience';
import { InstrumentSampleRegistry } from './BGM/Instrument_Sample';
import { CaribbeanRegistry } from './BGM/Caribbean';

import { 
  GENERIC_REVERB, HALLWAY_REVERB, STONE_ROOM_REVERB, STONE_CORRIDOR_REVERB, 
  CAVE_REVERB, CITIES_REVERB, FORESTS_REVERB, MOUNTAINS_REVERB, 
  PARKING_LOT_REVERB, ALLEY_REVERB, HANGER_REVERB, NO_REVERB 
} from "./Reverberation_Effects_List";

const GARDEN_WARP_ROOM_CONSTANTS = {
  RUG: { X: 100, Y: 100, WIDTH: 200, HEIGHT: 200 }
};

import { E_Sounds } from './SFX/Alphabetical/E/ElevatorSounds';

export class SoundManager {
  private ctx!: AudioContext;
  private masterGain!: GainNode;
  private musicGain!: GainNode;
  private sfxGain!: GainNode;
  private ttsGain!: GainNode;
  private reverbGain!: GainNode;
  private reverbDelay!: DelayNode;
  private reverbFilter!: BiquadFilterNode;
  private reverbFeedback!: GainNode;
  private listener!: AudioListener;
  private ai!: GoogleGenAI;
  private musicInterval: any = null;
  private currentBitMode: BitMode = '64-bit';
  private currentSynthMode: SynthMode = 'Classic';
  private ttsManager!: TTSManager;
  private lastScheduledTime: number = 0;

  private classicSynth!: ClassicSynth;
  private advancedSynth!: AdvancedSynth;
  private voiceManager!: VoiceManager;

  constructor() {
    // Bind all public methods to 'this' to prevent context loss in callbacks
    this.init = this.init.bind(this);
    this.createPanner = this.createPanner.bind(this);
    this.connectSFX = this.connectSFX.bind(this);
    this.setBitMode = this.setBitMode.bind(this);
    this.setSynthMode = this.setSynthMode.bind(this);
    this.setReverbProfile = this.setReverbProfile.bind(this);
    this.setMuted = this.setMuted.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.playPoodleBark = this.playPoodleBark.bind(this);
    this.playPoodleThump = this.playPoodleThump.bind(this);
    this.playPoodleGallop = this.playPoodleGallop.bind(this);
    this.playPoodleWalk = this.playPoodleWalk.bind(this);
    this.playPoodleSlowWalk = this.playPoodleSlowWalk.bind(this);
    this.playPoodleVerySlowWalk = this.playPoodleVerySlowWalk.bind(this);
    this.playPoodleCanter = this.playPoodleCanter.bind(this);
    this.playPoodleTrot = this.playPoodleTrot.bind(this);
    this.playPoodleScoot = this.playPoodleScoot.bind(this);
    this.playOpossumVocal = this.playOpossumVocal.bind(this);
    this.playOpossumHunt = this.playOpossumHunt.bind(this);
    this.playOpossumSound = this.playOpossumSound.bind(this);
    this.playOpossumMoveSound = this.playOpossumMoveSound.bind(this);
    this.playOpossumHiss = this.playOpossumHiss.bind(this);
    this.playOpossumJumpSound = this.playOpossumJumpSound.bind(this);
    this.playOpossumPetSound = this.playOpossumPetSound.bind(this);
    this.playAmbientChimes = this.playAmbientChimes.bind(this);
    this.playAmbientFarm = this.playAmbientFarm.bind(this);
    this.playAmbientStreet = this.playAmbientStreet.bind(this);
    this.playAmbientGarden = this.playAmbientGarden.bind(this);
    this.playArchwayReverb = this.playArchwayReverb.bind(this);
    this.playPianoMusic = this.playPianoMusic.bind(this);
    this.playBulldogBark = this.playBulldogBark.bind(this);
    this.playYellowPoodleBark = this.playYellowPoodleBark.bind(this);
    this.playSubwayPass = this.playSubwayPass.bind(this);
    this.playWindInBushes = this.playWindInBushes.bind(this);
    this.speak = this.speak.bind(this);
    this.stopSpeech = this.stopSpeech.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.playCollisionSound = this.playCollisionSound.bind(this);
    this.playWallHit = this.playWallHit.bind(this);
    this.playElevatorButtonIntersection = this.playElevatorButtonIntersection.bind(this);
    this.playElevatorFloorBeep = this.playElevatorFloorBeep.bind(this);
    this.playElevatorMovement = this.playElevatorMovement.bind(this);
    this.playRotationTick = this.playRotationTick.bind(this);
    this.playSqueak = this.playSqueak.bind(this);
    this.playPageTurn = this.playPageTurn.bind(this);
    this.playDoorShut = this.playDoorShut.bind(this);
    this.playSimulatedGardenSlidingDoorSound = this.playSimulatedGardenSlidingDoorSound.bind(this);
    this.playSimulatedGardenSlidingDoorCloseSound = this.playSimulatedGardenSlidingDoorCloseSound.bind(this);
    this.playBlueDoorOpenSound = this.playBlueDoorOpenSound.bind(this);
    this.playBlueDoorCloseSound = this.playBlueDoorCloseSound.bind(this);
    this.playRuggedWestArcadeDoorOpenSound = this.playRuggedWestArcadeDoorOpenSound.bind(this);
    this.playRuggedWestArcadeDoorCloseSound = this.playRuggedWestArcadeDoorCloseSound.bind(this);
    this.playRuggedEastArcadeDoorOpenSound = this.playRuggedEastArcadeDoorOpenSound.bind(this);
    this.playRuggedEastArcadeDoorCloseSound = this.playRuggedEastArcadeDoorCloseSound.bind(this);
    this.playDymondElegantBark = this.playDymondElegantBark.bind(this);

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
      // @ts-ignore
      this.ai = null;
    }
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.ttsGain = this.ctx.createGain();
      this.reverbGain = this.ctx.createGain();
      this.reverbDelay = this.ctx.createDelay(2.0); // Max delay 2s
      this.reverbFilter = this.ctx.createBiquadFilter();
      this.reverbFeedback = this.ctx.createGain();
      
      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.ttsGain.connect(this.masterGain);
      
      // Reverb Chain: SFX -> Reverb Delay -> Reverb Filter -> Reverb Gain -> Master
      // Feedback loop: Filter -> Feedback Gain -> Delay
      this.reverbDelay.delayTime.value = 0.1; 
      this.reverbFilter.type = 'lowpass';
      this.reverbFilter.frequency.value = 2000;
      this.reverbFeedback.gain.value = 0.2;
      this.reverbGain.gain.value = 0.33; // Amplified 10% for ambient depth

      this.reverbDelay.connect(this.reverbFilter);
      this.reverbFilter.connect(this.reverbGain);
      this.reverbGain.connect(this.masterGain);
      
      // Feedback loop
      this.reverbFilter.connect(this.reverbFeedback);
      this.reverbFeedback.connect(this.reverbDelay);
      
      this.masterGain.connect(this.ctx.destination);

      // Spatial Audio: Listener
      this.listener = this.ctx.listener;
      if (this.listener.positionX) {
        this.listener.positionX.setValueAtTime(0, this.ctx.currentTime);
        this.listener.positionY.setValueAtTime(0, this.ctx.currentTime);
        this.listener.positionZ.setValueAtTime(0, this.ctx.currentTime);
        this.listener.forwardX.setValueAtTime(0, this.ctx.currentTime);
        this.listener.forwardY.setValueAtTime(0, this.ctx.currentTime);
        this.listener.forwardZ.setValueAtTime(-1, this.ctx.currentTime);
        this.listener.upX.setValueAtTime(0, this.ctx.currentTime);
        this.listener.upY.setValueAtTime(1, this.ctx.currentTime);
        this.listener.upZ.setValueAtTime(0, this.ctx.currentTime);
      } else {
        // Fallback for older browsers
        this.listener.setPosition(0, 0, 0);
        this.listener.setOrientation(0, 0, -1, 0, 1, 0);
      }

      // Set initial volumes (BGM -25%, SFX +12.5%, Ambience +10%)
      this.musicGain.gain.value = 0.375; 
      this.sfxGain.gain.value = 1.06875; 
      this.ttsGain.gain.value = 0.75; 

      this.ttsManager = new TTSManager(this.ctx, this.ttsGain);
      this.ttsManager.setEngine('native');

      // Initialize Synths
      const pannerFactory = (x: number, y: number, z: number) => this.createPanner(x, y, z);
      const sfxConnector = (node: AudioNode, hasReverb: boolean) => this.connectSFX(node, hasReverb);
      
      this.classicSynth = new ClassicSynth(pannerFactory, sfxConnector);
      this.advancedSynth = new AdvancedSynth(pannerFactory, sfxConnector);
      this.voiceManager = new VoiceManager(this.ctx, this.sfxGain);
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.error("Failed to resume AudioContext:", e));
    }
  }

  private createPanner(x: number, y: number, z: number): PannerNode {
    const panner = this.ctx.createPanner();
    panner.panningModel = 'equalpower';
    panner.distanceModel = 'linear';
    panner.refDistance = 10000; // Effectively no attenuation for most distances
    panner.maxDistance = 10000;
    panner.rolloffFactor = 0; // No attenuation
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;

    // We still set position for simple stereo panning if needed, 
    // but with rolloffFactor 0 it won't affect volume.
    if (panner.positionX) {
      panner.positionX.setValueAtTime(x, this.ctx.currentTime);
      panner.positionY.setValueAtTime(y, this.ctx.currentTime);
      panner.positionZ.setValueAtTime(z, this.ctx.currentTime);
    } else {
      panner.setPosition(x, y, z);
    }
    return panner;
  }

  private connectSFX(node: AudioNode, hasReverb: boolean = false) {
    node.connect(this.sfxGain);
    if (hasReverb) {
      node.connect(this.reverbDelay);
    }
  }

  setBitMode(mode: BitMode) {
    S_Sounds.setBitMode(this, mode);
  }

  setSynthMode(mode: SynthMode) {
    S_Sounds.setSynthMode(this as any, mode);
  }

  setReverbProfile(profile: any | null) {
    S_Sounds.setReverbProfile(this as any, profile);
  }

  setMuted(muted: boolean) {
    S_Sounds.setMuted(this as any, muted);
  }

  setVolume(volume: number) {
    S_Sounds.setVolume(this as any, volume);
  }

  private duckMusic(duration: number) {
    D_Sounds.duckMusic(this as any, duration);
  }

  // SFX from src/Sound/Sound_Effects
  async playDoorShut(x: number = 0, y: number = 0, z: number = 0) {
    await D_Sounds.playDoorShut(this as any, x, y, z);
  }

  async playSimulatedGardenSlidingDoorSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playSimulatedGardenSlidingDoorOpen(this as any, x, y, z);
  }

  async playSimulatedGardenSlidingDoorCloseSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playSimulatedGardenSlidingDoorClose(this as any, x, y, z);
  }

  async playBlueDoorOpenSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playBlueDoorOpen(this as any, x, y, z);
  }

  async playBlueDoorCloseSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playBlueDoorClose(this as any, x, y, z);
  }

  async playRuggedWestArcadeDoorOpenSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRedEmeraldSlidingDoorOpen(this as any, x, y, z);
  }

  async playRuggedWestArcadeDoorCloseSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRedEmeraldSlidingDoorClose(this as any, x, y, z);
  }

  async playRuggedEastArcadeDoorOpenSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRedEmeraldSlidingDoorOpen(this as any, x, y, z);
  }

  async playRuggedEastArcadeDoorCloseSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRedEmeraldSlidingDoorClose(this as any, x, y, z);
  }

  async playRainbowGlassSlidingDoorOpenSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRainbowGlassSlidingDoorOpen(this as any, x, y, z);
  }

  async playRainbowGlassSlidingDoorCloseSound(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await D_Sounds.playRainbowGlassSlidingDoorClose(this as any, x, y, z);
  }

  async playDymondElegantBark() {
    this.init();
    await D_Sounds.playDymondElegantBark(this as any);
  }

  async playOpossumVocal(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumVocal(this as any, x, y, z);
  }

  playRabbitGrunt() {
    R_Sounds.playRabbitGrunt(this as any);
  }

  async playRabbitJumpSound(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRabbitJumpSound(this as any, x, y, z);
  }

  async playThump(time: number, x: number, y: number, z: number) {
    await T_Sounds.playThump(this as any, time, x, y, z);
  }

  async playOpossumHiss(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumHiss(this as any, x, y, z);
  }

  public async playWithSynth(method: keyof ISynth, ...args: any[]) {
    this.init();
    const area = args[0] || 'Foyer';
    // The last argument is usually the animal if it was passed from the public method
    const animal = args[args.length - 1];
    
    // Map areas to reverb profiles
    const reverbMap: Record<string, any> = {
      'Foyer': GENERIC_REVERB,
      'AdventureHouseFoyer': HALLWAY_REVERB,
      'AdventureHouseHallway': HALLWAY_REVERB,
      'Cellar': STONE_ROOM_REVERB,
      'CellarRamp': STONE_CORRIDOR_REVERB,
      'RastafariCave': CAVE_REVERB,
      'Street': CITIES_REVERB,
      'Forest': FORESTS_REVERB,
      'Mountains': MOUNTAINS_REVERB,
      'ParkingLot': PARKING_LOT_REVERB,
      'Alley': ALLEY_REVERB,
      'Hanger': HANGER_REVERB,
      'GrandBallroom': HANGER_REVERB,
      'TheGrandPlayground': HALLWAY_REVERB,
      'GrandDiningRoom': HALLWAY_REVERB,
      'RastaManor2ndFloor': HALLWAY_REVERB,
      'RastaManor3rdFloor': HALLWAY_REVERB,
      'Barn': HANGER_REVERB,
      'Barn2ndFloor': HANGER_REVERB,
      'GrandDiningRoomExtra': HALLWAY_REVERB,
      'GrandDiningRoomEast': HALLWAY_REVERB,
      'RecyclingRoom': HALLWAY_REVERB,
      'MeditationRoomPlaceholder': HALLWAY_REVERB,
      'GrandPlaygroundPlaceholder1': HALLWAY_REVERB,
      'GrandPlaygroundPlaceholder2': HALLWAY_REVERB,
      'CommunalStore': HALLWAY_REVERB,
      'RuggedPlayFieldPlaceholderEast': HALLWAY_REVERB,
      'RuggedPlayFieldPlaceholderWest': HALLWAY_REVERB,
      'ManorTransitionPlaceholder': HALLWAY_REVERB,
      'EastGrandArcade': HALLWAY_REVERB,
      'EastCommunalSpace': HALLWAY_REVERB,
      'WestCommunalSpace': HALLWAY_REVERB,
      'GrandArcadeExtension': HALLWAY_REVERB,
      'VendingMachineRoomEast': HALLWAY_REVERB,
      'VendingMachineRoomWest': HALLWAY_REVERB,
      'TheGrandGym': CAVE_REVERB,
      'NarrowDressageGym': HALLWAY_REVERB,
      'MeditationHall': HALLWAY_REVERB,
      'MeditationHallWest': NO_REVERB,
      'MeditationHallEast': NO_REVERB,
      'MeditationHallLibrary': NO_REVERB,
      'MeditationHallLibraryArch': NO_REVERB,
      'MeditationHallMeditationRoomArch': NO_REVERB,
    };

    const profile = reverbMap[area] || null;
    if (profile) {
      this.setReverbProfile(profile);
    } else {
      // If no profile, we might want to disable reverb or use a default
      // For now, let's keep the current reverb if it's not explicitly mapped
    }

    const hardSurfaces = [
      'Foyer', 'FoyerWest1', 'FoyerWest2', 'FoyerEast1', 'FoyerEast2', 
      'FrontPorch', 'BackPorch', 'Porch', 'Sidewalk', 'Street', 
      'AdventureHouseFoyer', 'AdventureHouseHallway', 'AdventureHouseTeaRoom', 
      'AdventureHouseMusicRoom', 'AdventureHouseBridgeHallway', 'AdventureHouseTrenchHallway', 
      'AdventureHouseNarrowHallway', 'Cellar', 'CellarRamp', 
      'MeditationHall', 'MeditationHallWest', 'MeditationHallEast', 'RastafariCave', 
      'PlaceholderRoom', 'Soca_Path', 'AllisonsPorch', 'AllisonsFoyer', 
      'Allisons2ndFloor', 'Allisons3rdFloor', 'AllisonsRooftop', 'Kitchen', 'DishWasherArea',
      'GrandBallroom', 'TheGrandPlayground', 'GrandDiningRoom', 'GrandDiningRoomExtra', 
      'GrandDiningRoomEast', 'RecyclingRoom', 'MeditationRoomPlaceholder', 
      'GrandPlaygroundPlaceholder1', 'GrandPlaygroundPlaceholder2', 'CommunalStore', 
      'RastaManor2ndFloor', 'RastaManor3rdFloor', 'ManorTransitionPlaceholder',
      'Barn', 'Barn2ndFloor', 'AllisonsAmusementParkHouse',
      'EastGrandArcade', 'WestGrandArcade', 'EastCommunalSpace', 'WestCommunalSpace', 
      'GrandArcadeExtension', 'VendingMachineRoomEast', 'VendingMachineRoomWest',
      'SimulatedGardenArea', 'NarrowDressageGym', 'TheGrandGym', 'MeditationHallLibrary',
      'LobbyStairwayAndRamps', 'SouthwestMezzanineStairwayAndRamps',
      'WesternWarpRoom', 'WesternTarsisEffect', 'PablotsFarm', 'PablotsPonyField',
      'WestManorPath', 'EastManorPath', 'MiniWestManorPath', 'MiniEastManorPath',
      'GardenSpecificWarpRoom', 'RuggedPlayField', 'RuggedPlayFieldWest1', 'RuggedPlayFieldWest2',
      'RuggedPlayFieldEast1', 'RuggedPlayFieldEast2', 'RuggedPlayFieldPlaceholderEast',
      'RuggedPlayFieldPlaceholderWest', 'PortalTunnel', 'WandasWarpHouse',
      'WandaEastBrickHallway', 'WandaEastSquareHouse',
      'PixelGardenGallopDecisionZone',
      'PixelGardenGallop_Course_1', 'PixelGardenGallop_Course_2', 'PixelGardenGallop_Course_3',
      'PixelGardenGallop_Course_4', 'PixelGardenGallop_Course_5', 'PixelGardenGallop_Course_6',
      'PixelGardenGallop_Course_7', 'PixelGardenGallop_Course_8',
      'PoodleRideStoryBookCourse', 'PinkHouseFoyer', 'PinkHouseTeaRoom',
      'PinkHouseDiningRoom', 'PinkHouseKitchen', 'Garden', 'MiniGarden', 'Staging Garden',
      'PoodleRideStoryBookInitialPath', 'PoodleRideStoryBookCourse1_Seg1', 'PoodleRideStoryBookCourse1_Seg2',
      'PoodleRideStoryBookCourse1_Seg3', 'PoodleRideStoryBookCourse1_Seg4', 'PoodleRideStoryBookGoalZone',
      'PoodleRideStoryBookDecisionZone'
    ];
    let surfaceType: 'hard' | 'soft' = hardSurfaces.includes(area) ? 'hard' : 'soft';

    // Check for Rug in GardenSpecificWarpRoom
    if (area === 'GardenSpecificWarpRoom') {
      const x = args[1] || 0;
      const y = args[2] || 0;
      const rug = GARDEN_WARP_ROOM_CONSTANTS.RUG;
      if (x >= rug.X && x <= rug.X + rug.WIDTH && y >= rug.Y && y <= rug.Y + rug.HEIGHT) {
        surfaceType = 'soft'; // Ride on rug
      }
    }

    const hasReverb = !!profile;

    if (this.currentSynthMode === 'Classic' || this.currentSynthMode === 'Mix') {
      // @ts-ignore
      this.classicSynth[method](this.ctx, this.sfxGain, surfaceType, hasReverb, area, animal);
    }
    if (this.currentSynthMode === 'Advanced' || this.currentSynthMode === 'Mix') {
      // @ts-ignore
      this.advancedSynth[method](this.ctx, this.sfxGain, surfaceType, hasReverb, area, animal);
    }
  }

  public playSynthVoice(id: number, freq: number, duration: number, volume: number) {
    S_Sounds.playSynthVoice(this as any, id, freq, duration, volume);
  }

  async playPoodleGallop(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleGallop(this as any, area, x, y, z, animal);
  }

  async playPoodleWalk(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleWalk(this as any, area, x, y, z, animal);
  }

  async playPoodleSlowWalk(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleSlowWalk(this as any, area, x, y, z, animal);
  }

  async playPoodleVerySlowWalk(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleVerySlowWalk(this as any, area, x, y, z, animal);
  }

  async playPoodleCanter(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleCanter(this as any, area, x, y, z, animal);
  }

  async playPoodleTrot(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleTrot(this as any, area, x, y, z, animal);
  }

  async playPoodleScoot(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleScoot(this as any, area, x, y, z, animal);
  }

  async playRunningJumpSound(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await J_Sounds.playRunningJumpSound(this as any, area, x, y, z, animal);
  }

  async playPoodleThump(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await P_Sounds.playPoodleThump(this as any, area, x, y, z, animal);
  }

  async playOpossumHunt(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await O_Sounds.playOpossumHunt(this as any, x, y, z);
  }

  async playAmbientChimes(x: number = 0, y: number = 0, z: number = 0, volume: number = 0.06) {
    this.init();
    await AmbienceRegistry.WindChimes.Classic.playAmbientChimes(this as any, x, y, z, volume);
  }

  async playArchwayReverb(x: number = 0, y: number = 0, z: number = 0, volume: number = 0.4) {
    this.init();
    await A_Sounds.playArchwayReverb(this as any, x, y, z, volume);
  }

  async playRockingHorse(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRockingHorse(this as any, x, y, z);
  }

  async playRockingGoat(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRockingGoat(this as any, x, y, z);
  }

  async playPianoMusic(x: number = 0, y: number = 0, z: number = 0) {
    await InstrumentSampleRegistry.Piano.Short.Generic.playPianoMusic(this as any, x, y, z);
  }

  async playBulldogBark(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await B_Sounds.playBulldogBark(this as any, x, y, z);
  }

  async playYellowPoodleBark(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await Y_Sounds.playYellowPoodleBark(this as any, x, y, z);
  }

  async playAmbientFarm(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await AmbienceRegistry.Farm.playAmbientFarm(this as any, x, y, z);
  }

  async playAmbientStreet(x: number = 0, y: number = 0, z: number = 0, volume: number = 0.055, filterFreq: number = 400) {
    this.init();
    await AmbienceRegistry.Streets.playAmbientStreet(this as any, x, y, z, volume, filterFreq);
  }

  async playAmbientGarden(x: number = 0, y: number = 0, z: number = 0, volume: number = 0.04) {
    this.init();
    await AmbienceRegistry.Garden.playAmbientGarden(this as any, x, y, z, volume);
  }

  async playSubwayPass(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await S_Sounds.playSubwayPass(this as any, x, y, z);
  }

  async playWindInBushes(x: number = 0, y: number = 0, z: number = 0) {
    this.init();
    await W_Sounds.playWindInBushes(this as any, x, y, z);
  }

  async playGoatMunch(x: number = 0, y: number = 0, z: number = 0) {
    await G_Sounds.playGoatMunch(this as any, x, y, z);
  }

  async playGoatSound(isLong: boolean = false, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0) {
    await G_Sounds.playGoatSound(this as any, isLong, area, x, y, z);
  }

  async playPoodleBark(x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone', barkType: string = 'Generic') {
    this.init();
    await P_Sounds.playPoodleBark(this as any, x, y, z, area, animal, barkType);
  }

  async playMagicWand() {
    await M_Sounds.playMagicWand(this as any);
  }

  async playMultipleBarks(count: number, x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone', barkType: string = 'Generic') {
    await M_Sounds.playMultipleBarks(this as any, count, x, y, z, area, animal, barkType);
  }

  async playAscendingBeep(step: number, x: number = 0, y: number = 0, z: number = 0) {
    await A_Sounds.playAscendingBeep(this as any, step, x, y, z);
  }

  async playCustomBeep(freq: number, x: number = 0, y: number = 0, z: number = 0) {
    await C_Sounds.playCustomBeep(this as any, freq, x, y, z);
  }

  async playBushHit(x: number = 0, y: number = 0, z: number = 0) {
    await B_Sounds.playBushHit(this as any, x, y, z);
  }

  async playPointEarned(x: number = 0, y: number = 0, z: number = 0) {
    await P_Sounds.playPointEarned(this as any, x, y, z);
  }

  async playStartSound(x: number = 0, y: number = 0, z: number = 0) {
    await S_Sounds.playStartSound(this as any, x, y, z);
  }

  async playJumpSound(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    this.init();
    await J_Sounds.playJumpSound(this as any, area, x, y, z, animal);
  }

  async playForwardSound(x: number = 0, y: number = 0, z: number = 0) {
    await F_Sounds.playForwardSound(this as any, x, y, z);
  }

  async playRampBeep(step: number, isDescending: boolean = false, x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRampBeep(this as any, step, isDescending, x, y, z);
  }

  async playPetSound(x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    await P_Sounds.playPetSound(this as any, x, y, z, volumeMultiplier, animal);
  }

  async playRailwayRumble(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRailwayRumble(this as any, x, y, z);
  }

  async playCollarGraspSound(x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    await C_Sounds.playCollarGraspSound(this as any, x, y, z, volumeMultiplier, animal);
  }

  async playDefaultGraspSound(x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0) {
    await D_Sounds.playDefaultGraspSound(this as any, x, y, z, volumeMultiplier);
  }

  async playRibbonGraspSound(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRibbonGraspSound(this as any, x, y, z);
  }

  async playLeanForwardSound(x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    await L_Sounds.playLeanForwardSound(this as any, x, y, z, volumeMultiplier, animal);
  }

  async playReturnUprightSound(x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    await R_Sounds.playReturnUprightSound(this as any, x, y, z, volumeMultiplier, animal);
  }

  async playOpossumSound(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumSound(this as any, x, y, z);
  }

  async playInteractSound(x: number = 0, y: number = 0, z: number = 0) {
    await I_Sounds.playInteractSound(this as any, x, y, z);
  }

  async playOpossumMoveSound(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumMoveSound(this as any, x, y, z);
  }

  async playOpossumJumpSound(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumJumpSound(this as any, x, y, z);
  }

  async playOpossumPetSound(x: number = 0, y: number = 0, z: number = 0) {
    await O_Sounds.playOpossumPetSound(this as any, x, y, z);
  }

  async playRampAscend(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRampAscend(this as any, x, y, z);
  }

  async playRampDescend(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRampDescend(this as any, x, y, z);
  }

  async playMagicWandSound(x: number = 0, y: number = 0, z: number = 0) {
    await M_Sounds.playMagicWandSound(this as any, x, y, z);
  }

  async playPointDing(count: number = 1, x: number = 0, y: number = 0, z: number = 0) {
    await P_Sounds.playPointDing(this as any, count, x, y, z);
  }

  async playNoInteractionSound(x: number = 0, y: number = 0, z: number = 0) {
    await N_Sounds.playNoInteractionSound(this as any, x, y, z);
  }

  async playRabbitMoveSound(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRabbitMoveSound(this as any, x, y, z);
  }

  async playRabbitPurrSound(x: number = 0, y: number = 0, z: number = 0) {
    await R_Sounds.playRabbitPurrSound(this as any, x, y, z);
  }

  async playRabbitCluckingSound(x: number = 0, y: number = 0, z: number = 0, count: number = 5) {
    await R_Sounds.playRabbitCluckingSound(this as any, x, y, z, count);
  }

  async playCollisionSound(x: number = 0, y: number = 0, z: number = 0) {
    await C_Sounds.playCollisionSound(this as any, x, y, z);
  }

  async playWallHit(area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0) {
    await W_Sounds.playWallHit(this as any, area, x, y, z);
  }

  async playPassSound(x: number = 0, y: number = 0, z: number = 0) {
    await P_Sounds.playPassSound(this as any, x, y, z);
  }

  async playElevatorButtonIntersection(x: number = 0, y: number = 0, z: number = 0) {
    await E_Sounds.playButtonIntersection(this as any, x, y, z);
  }

  async playElevatorFloorBeep(x: number = 0, y: number = 0, z: number = 0) {
    await E_Sounds.playFloorBeep(this as any, x, y, z);
  }

  async playElevatorMovement(duration: number = 1.0) {
    await E_Sounds.playElevatorMovement(this as any, duration);
  }

  async playRotationTick(isMajor: boolean = false) {
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Major tick (15 degrees) is higher and louder
    osc.frequency.setValueAtTime(isMajor ? 1200 : 800, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(isMajor ? 0.08 : 0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  async playSqueak(x: number = 0, y: number = 0, z: number = 0) {
    await S_Sounds.playSqueak(this as any, x, y, z);
  }

  async playPageTurn(x: number = 0, y: number = 0, z: number = 0) {
    await P_Sounds.playPageTurn(this as any, x, y, z);
  }

  async playProximityBeep(distance: number, x: number = 0, y: number = 0, z: number = 0) {
    await P_Sounds.playProximityBeep(this as any, distance, x, y, z);
  }

  async speak(text: string, language: TTSLanguage = 'EN_En-RP') {
    await S_Sounds.speak(this as any, text, language);
  }

  setTTSEngine(type: 'native' | 'gemini') {
    S_Sounds.setTTSEngine(this as any, type);
  }

  stopSpeech() {
    S_Sounds.stopSpeech(this as any);
  }

  toggleMute() {
    T_Sounds.toggleMute(this as any);
  }

  // Background Music from src/Sound/Back_Music
  startAmbientGarden() {
    AmbienceRegistry.Garden.startAmbientGarden(this as any);
  }

  startReggae() {
    CaribbeanRegistry.Reggae.startReggae(this as any);
  }

  stopReggae() {
    CaribbeanRegistry.Reggae.stopReggae(this as any);
  }

  startSocaMusic() {
    CaribbeanRegistry.Soca.startSocaMusic(this as any);
  }

  stopSocaMusic() {
    CaribbeanRegistry.Soca.stopSocaMusic(this as any);
  }
}
