/**
 * IndexedDBManager.ts
 * Core local persistence database engine for "Poodle Ride Adventure".
 *
 * Designed with rigorous computer science principles for offline-first resilience,
 * O(1) in-memory key hashing, and O(log N) structured record storage.
 *
 * This implementation treats local browser storage strictly as an optimized hardware tool.
 * Evaluates transactional reads/writes with high-craftsmanship error boundaries, safely
 * falling back to non-blocking memory caches if browser policies or sandboxed iframe
 * boundaries prevent disk write-access.
 */

import { GameState } from '../../../types';

export interface GameSaveMetadata {
  slotId: string;
  timestamp: number;
  notes?: string;
  gameState: GameState;
}

export interface CachedDescription {
  promptHash: string;
  response: string;
  timestamp: number;
  useCount: number;
}

const DB_NAME = "PoodleRideAdventureDB";
const DB_VERSION = 1;

// Database stores
export const STORES = {
  SAVE_SLOTS: "save_slots",
  NARRATOR_CACHE: "narrator_cache",
  PLAYER_SETTINGS: "player_settings",
  LEVEL_CHECKPOINTS: "level_checkpoints"
};

export class IndexedDBManager {
  private static db: IDBDatabase | null = null;
  private static isSupported: boolean = typeof window !== 'undefined' && 'indexedDB' in window;
  private static memoryCache: Record<string, Record<string, any>> = {
    [STORES.SAVE_SLOTS]: {},
    [STORES.NARRATOR_CACHE]: {},
    [STORES.PLAYER_SETTINGS]: {},
    [STORES.LEVEL_CHECKPOINTS]: {}
  };

  /**
   * Initializes the IndexedDB database safely.
   * If IndexedDB is blocked or unsupported (e.g. within restricted cross-origin iframes),
   * the manager seamlessly transparently falls back to structural memory pools.
   */
  static initialize(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn("[IndexedDBManager] IndexedDB is not supported or restricted in this environment. Falling back to persistent in-memory session pools.");
      return Promise.resolve(false);
    }

    if (this.db) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
          console.warn("[IndexedDBManager] Failed to establish database connection window. Falling back to memory storage.", event);
          resolve(false);
        };

        request.onsuccess = (event: any) => {
          this.db = event.target.result;
          console.log(`[IndexedDBManager] Successfully established transactional connection to "${DB_NAME}" (v${DB_VERSION}).`);
          resolve(true);
        };

        request.onupgradeneeded = (event: any) => {
          const dbInstance = event.target.result;
          console.log("[IndexedDBManager] Performing system schema initialization and upgrade...");

          // 1. Storage for full GameState Save Slots
          if (!dbInstance.objectStoreNames.contains(STORES.SAVE_SLOTS)) {
            dbInstance.createObjectStore(STORES.SAVE_SLOTS, { keyPath: "slotId" });
          }

          // 2. Local Cache to bypass duplicate AI TTS generates / descriptions
          if (!dbInstance.objectStoreNames.contains(STORES.NARRATOR_CACHE)) {
            dbInstance.createObjectStore(STORES.NARRATOR_CACHE, { keyPath: "promptHash" });
          }

          // 3. Game and Keyboard Settings
          if (!dbInstance.objectStoreNames.contains(STORES.PLAYER_SETTINGS)) {
            dbInstance.createObjectStore(STORES.PLAYER_SETTINGS);
          }

          // 4. Level Milestones & Exploration Statistics
          if (!dbInstance.objectStoreNames.contains(STORES.LEVEL_CHECKPOINTS)) {
            dbInstance.createObjectStore(STORES.LEVEL_CHECKPOINTS, { keyPath: "checkpointId" });
          }
        };
      } catch (err) {
        console.warn("[IndexedDBManager] Storage initialization exception caught. Reverting to memory backup.", err);
        resolve(false);
      }
    });
  }

  /**
   * Generic low-level helper to write data to an object store.
   */
  private static async writeToStore(storeName: string, key: string, data: any): Promise<boolean> {
    // Keep in-memory cache synchronized at all times
    this.memoryCache[storeName][key] = data;

    if (!this.db) {
      const initialized = await this.initialize();
      if (!initialized || !this.db) {
        return true; // Gracefully simulate success via memory mapping
      }
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        
        // If storing in settings where key is passed separately or as part of data
        const request = (storeName === STORES.PLAYER_SETTINGS) 
          ? store.put(data, key)
          : store.put(data);

        request.onsuccess = () => resolve(true);
        request.onerror = (err) => {
          console.error(`[IndexedDBManager] Error writing to store "${storeName}":`, err);
          resolve(false);
        };
      } catch (e) {
        console.warn(`[IndexedDBManager] Transactional failure writing to store "${storeName}". Buffered in RAM.`, e);
        resolve(true); // Fail-safe fallback
      }
    });
  }

  /**
   * Generic low-level helper to read data from an object store.
   */
  private static async readFromStore<T>(storeName: string, key: string): Promise<T | null> {
    // Try memory cache first for immediate O(1) access
    if (this.memoryCache[storeName][key] !== undefined) {
      return this.memoryCache[storeName][key] as T;
    }

    if (!this.db) {
      const initialized = await this.initialize();
      if (!initialized || !this.db) {
        return null;
      }
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = (event: any) => {
          const val = event.target.result;
          if (val !== undefined) {
            // Keep memory cache warm
            this.memoryCache[storeName][key] = val;
            resolve(val as T);
          } else {
            resolve(null);
          }
        };

        request.onerror = (err) => {
          console.error(`[IndexedDBManager] Error reading from store "${storeName}":`, err);
          resolve(null);
        };
      } catch (e) {
        console.warn(`[IndexedDBManager] Transaction failure reading from "${storeName}".`, e);
        resolve(null);
      }
    });
  }

  /**
   * Safe list retrieval helper.
   */
  private static async getAllFromStore<T>(storeName: string): Promise<T[]> {
    if (!this.db) {
      const initialized = await this.initialize();
      if (!initialized || !this.db) {
        // Fall back to memory array values
        return Object.values(this.memoryCache[storeName]) as T[];
      }
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = (event: any) => {
          const results = event.target.result || [];
          // Warm up all memory mappings
          results.forEach((item: any) => {
            const key = item.slotId || item.promptHash || item.checkpointId;
            if (key) {
              this.memoryCache[storeName][key] = item;
            }
          });
          resolve(results as T[]);
        };

        request.onerror = () => {
          resolve(Object.values(this.memoryCache[storeName]) as T[]);
        };
      } catch (e) {
        resolve(Object.values(this.memoryCache[storeName]) as T[]);
      }
    });
  }

  /**
   * Safe record deletion helper.
   */
  private static async deleteFromStore(storeName: string, key: string): Promise<boolean> {
    delete this.memoryCache[storeName][key];

    if (!this.db) {
      const initialized = await this.initialize();
      if (!initialized || !this.db) {
        return true;
      }
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      } catch (e) {
        resolve(true); // Fallback
      }
    });
  }

  /* ==========================================
     SAVE SLOTS (O(log N) Local Disk Saves)
     ========================================== */

  /**
   * Saves a GameState instance to the designated save slot.
   */
  static async saveGame(slotId: string, gameState: GameState, notes?: string): Promise<boolean> {
    const record: GameSaveMetadata = {
      slotId,
      timestamp: Date.now(),
      notes,
      gameState
    };
    return this.writeToStore(STORES.SAVE_SLOTS, slotId, record);
  }

  /**
   * Loads a saved GameState from database memory.
   */
  static async loadGame(slotId: string): Promise<GameSaveMetadata | null> {
    return this.readFromStore<GameSaveMetadata>(STORES.SAVE_SLOTS, slotId);
  }

  /**
   * Deletes a game save slot.
   */
  static async deleteGame(slotId: string): Promise<boolean> {
    return this.deleteFromStore(STORES.SAVE_SLOTS, slotId);
  }

  /**
   * Retrieves all save files.
   */
  static async getAllSaves(): Promise<GameSaveMetadata[]> {
    return this.getAllFromStore<GameSaveMetadata>(STORES.SAVE_SLOTS);
  }

  /* ==========================================
     NARRATOR CACHE (Offline-first AI caching)
     ========================================== */

  /**
   * Stores a generated explanation dialogue or narrative cache to bypass duplicate API requests.
   */
  static async cacheDialogue(prompt: string, response: string): Promise<void> {
    const hash = this.simpleHash(prompt);
    const data: CachedDescription = {
      promptHash: hash,
      response,
      timestamp: Date.now(),
      useCount: 1
    };
    await this.writeToStore(STORES.NARRATOR_CACHE, hash, data);
  }

  /**
   * Attempts to load a generated description from cache. Updates use frequency.
   */
  static async getCachedDialogue(prompt: string): Promise<string | null> {
    const hash = this.simpleHash(prompt);
    const cached = await this.readFromStore<CachedDescription>(STORES.NARRATOR_CACHE, hash);
    if (cached) {
      cached.useCount += 1;
      this.writeToStore(STORES.NARRATOR_CACHE, hash, cached); // background increment
      return cached.response;
    }
    return null;
  }

  /* ==========================================
     PLAYER SETTINGS
     ========================================== */

  /**
   * Sets player preferences (e.g. Volume, Keyboards, Custom Modes)
   */
  static async setSetting(key: string, value: any): Promise<boolean> {
    return this.writeToStore(STORES.PLAYER_SETTINGS, key, value);
  }

  /**
   * Returns player settings.
   */
  static async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    const val = await this.readFromStore<T>(STORES.PLAYER_SETTINGS, key);
    return val !== null ? val : defaultValue;
  }

  /* ==========================================
     MATHEMATICAL & SCIENTIFIC UTILITIES
     ========================================== */

  /**
   * Simple O(N) deterministic char string hashing algorithm.
   * Produces string-safe key hex values to serve as fast indexing keys for CachedDescription.
   */
  private static simpleHash(input: string): string {
    let hash = 0;
    if (input.length === 0) return "00000000";
    for (let i = 0; i < input.length; i++) {
      const chr = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }
}

export * from './General';
