/**
 * System Registry Engine RAM Disk Core
 * Registry, metrics telemetry, and hardware device registration for the RAM Disk engine.
 */

import { GlobalHardwareRAMDisk, RAMDiskConfig } from '../../../../RAM_Disk';

export interface RAMDiskRegistryEntry {
  id: string;
  name: string;
  deviceType: 'Hardware_RAM_Disk' | 'Virtual_RAM_Drive' | 'Memory_Buffer_Array';
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
  capacityFormatted: string;
}

export class RAMDiskRegistryEngineCore {
  public getDeviceRegistration(): RAMDiskRegistryEntry {
    const config = GlobalHardwareRAMDisk.getConfig();
    const mb = Math.round(config.capacityBytes / (1024 * 1024));
    return {
      id: config.diskId,
      name: config.label,
      deviceType: 'Hardware_RAM_Disk',
      status: config.mounted ? 'ONLINE' : 'STANDBY',
      capacityFormatted: `${mb} MB`
    };
  }

  public getEngineInstance() {
    return GlobalHardwareRAMDisk;
  }
}

export const RAMDiskRegistry = new RAMDiskRegistryEngineCore();
