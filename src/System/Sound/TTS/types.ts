export interface ITTSEngine {
  isAvailable(): boolean;
  speak(text: string, language: string): Promise<void>;
  stop(): void;
}
