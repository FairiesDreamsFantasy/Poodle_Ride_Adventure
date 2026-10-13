/**
 * Registry Keyboard and Controllers Engine Core
 * Handles registration and key binding mapping for physical and emulated input devices.
 */

export interface KeyboardControllerRegistryEntry {
  id: string;
  name: string;
  mode: 'Cedella_Joystick' | 'Standard_Arrow' | 'Gamepad' | 'ScreenReader';
  keyMap: Record<string, string>;
}

export class KeyboardControllerRegistryEngineCore {
  private inputEntries: Map<string, KeyboardControllerRegistryEntry> = new Map();

  public registerInput(entry: KeyboardControllerRegistryEntry): void {
    this.inputEntries.set(entry.id, entry);
  }

  public getInput(id: string): KeyboardControllerRegistryEntry | undefined {
    return this.inputEntries.get(id);
  }
}

export const KeyboardControllerRegistryEngine = new KeyboardControllerRegistryEngineCore();
