/**
 * Scientific Sound Engine ASP Ambient Session State Core Module
 * Ambient background sound state sessions and environment audio profiles.
 */



export class SoundASPAmbientSession {

  private activeTheme: string = "RastaManorDay";

  public setActiveTheme(theme: string): void {
    this.activeTheme = theme;
  }

  public getActiveTheme(): string {
    return this.activeTheme;
  }
        
}

export const SoundASPAmbientSessionInstance = new SoundASPAmbientSession();
