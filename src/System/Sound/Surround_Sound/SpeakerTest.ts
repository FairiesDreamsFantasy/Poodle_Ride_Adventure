import { SurroundSpatializer, SurroundChannel } from './SurroundSystem';

export async function playSurroundSoundTest(ctx: AudioContext, destination: AudioNode) {
  const spatializer = new SurroundSpatializer(ctx, 6);
  spatializer.connect(destination);

  const channels = [
    { name: 'Left', id: SurroundChannel.LEFT },
    { name: 'Right', id: SurroundChannel.RIGHT },
    { name: 'Center', id: SurroundChannel.CENTER },
    { name: 'LFE', id: SurroundChannel.LFE },
    { name: 'Surround Left', id: SurroundChannel.SURROUND_LEFT },
    { name: 'Surround Right', id: SurroundChannel.SURROUND_RIGHT },
  ];

  for (const channel of channels) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const map = new Map<SurroundChannel, number>();
    map.set(channel.id, 1.0);

    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

    spatializer.routeToChannels(gain, map);
    osc.connect(gain);

    osc.start();
    osc.stop(ctx.currentTime + 1.0);

    // Wait for the sound to finish before the next channel
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
}
