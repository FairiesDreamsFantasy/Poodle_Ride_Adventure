/**
 * System Hardware RAM Disk Engine
 * Dedicated ultra-high-speed in-memory storage subsystem for physical and virtual machines.
 * Provides zero-latency asset caching, fast buffer swaps, volatile memory banks,
 * and hardware RAM-backed temporary drive mounting.
 */

export interface RAMDiskConfig {
  diskId: string;
  label: string;
  capacityBytes: number;
  sectorSizeBytes: number;
  mounted: boolean;
  volatile: true;
}

export interface RAMDiskBlock {
  address: number;
  size: number;
  data: Uint8Array | null;
  timestamp: number;
}

export class HardwareRAMDiskEngine {
  private config: RAMDiskConfig;
  private memoryBlocks: Map<number, RAMDiskBlock> = new Map();
  private allocatedBytes: number = 0;

  constructor(capacityMB: number = 64) {
    this.config = {
      diskId: 'RAM_DISK_0',
      label: 'POODLE_HIGH_SPEED_RAM_DISK',
      capacityBytes: capacityMB * 1024 * 1024,
      sectorSizeBytes: 4096,
      mounted: true,
      volatile: true
    };
  }

  public getConfig(): RAMDiskConfig {
    return { ...this.config };
  }

  public writeBlock(address: number, data: Uint8Array): boolean {
    if (this.allocatedBytes + data.byteLength > this.config.capacityBytes) {
      console.warn('RAM Disk capacity limit reached');
      return false;
    }
    const block: RAMDiskBlock = {
      address,
      size: data.byteLength,
      data: new Uint8Array(data),
      timestamp: Date.now()
    };
    this.memoryBlocks.set(address, block);
    this.allocatedBytes += data.byteLength;
    return true;
  }

  public readBlock(address: number): Uint8Array | null {
    const block = this.memoryBlocks.get(address);
    return block ? block.data : null;
  }

  public clear(): void {
    this.memoryBlocks.clear();
    this.allocatedBytes = 0;
  }

  public getAllocatedBytes(): number {
    return this.allocatedBytes;
  }

  public getFreeBytes(): number {
    return this.config.capacityBytes - this.allocatedBytes;
  }
}

export const GlobalHardwareRAMDisk = new HardwareRAMDiskEngine();
