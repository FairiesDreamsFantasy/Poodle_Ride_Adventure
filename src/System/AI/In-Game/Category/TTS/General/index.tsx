/**
 * System/AI/In-Game/Category/TTS/General/index.tsx
 * Ultra-Scientific Text-To-Speech Queuing, Directional Cadence Balancing,
 * and Speech Priority Control.
 */

export interface TTSMessage {
  id: string;
  text: string;
  language: string;
  priority: number;
  timestamp: number;
}

export class TTSQueueAI {
  private queue: TTSMessage[] = [];
  private isSpeaking: boolean = false;

  public enqueue(text: string, language: string = 'EN_US', priority: number = 1): void {
    const msg: TTSMessage = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      language,
      priority,
      timestamp: Date.now(),
    };
    this.queue.push(msg);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  public getNext(): TTSMessage | null {
    if (this.queue.length === 0) return null;
    return this.queue.shift() || null;
  }

  public clear(): void {
    this.queue = [];
    this.isSpeaking = false;
  }

  public getQueueLength(): number {
    return this.queue.length;
  }
}

export const ttsQueueAI = new TTSQueueAI();
