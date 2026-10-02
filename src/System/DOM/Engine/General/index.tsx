/**
 * System/DOM/Engine/General/index.tsx
 * DOM Engine Core - Optimized DOM queries, event isolation, focus management,
 * frame batching, and accessibility controls for fast DOM performance.
 */

export class DOMEngineGeneral {
  private static elementCache: Map<string, HTMLElement> = new Map();
  private static interactiveTargetCache: WeakMap<HTMLElement, boolean> = new WeakMap();
  private static maxCacheSize = 256;

  private static readQueue: Array<() => void> = [];
  private static writeQueue: Array<() => void> = [];
  private static isRafScheduled = false;

  /**
   * Fast element lookup with caching and LRU bound eviction to prevent memory spikes.
   */
  public static getElementFast(id: string): HTMLElement | null {
    if (this.elementCache.has(id)) {
      const cached = this.elementCache.get(id)!;
      if (document.body.contains(cached)) {
        return cached;
      }
      this.elementCache.delete(id);
    }

    const el = document.getElementById(id);
    if (el) {
      if (this.elementCache.size >= this.maxCacheSize) {
        // Prune stale or first item to enforce upper memory limit
        const firstKey = this.elementCache.keys().next().value;
        if (firstKey) this.elementCache.delete(firstKey);
      }
      this.elementCache.set(id, el);
    }
    return el;
  }

  /**
   * Clears all cached DOM elements and target memoizations
   */
  public static clearCache(): void {
    this.elementCache.clear();
    this.interactiveTargetCache = new WeakMap();
  }

  /**
   * High-performance WeakMap-memoized check if an event target is interactive.
   * Eliminates querySelector/closest CPU overhead on rapid keydown events.
   */
  public static isMenuOrUIInteractive(target: EventTarget | null): boolean {
    if (!target || !(target instanceof HTMLElement)) return false;

    if (this.interactiveTargetCache.has(target)) {
      return this.interactiveTargetCache.get(target)!;
    }

    const result = this.computeIsInteractive(target);
    this.interactiveTargetCache.set(target, result);
    return result;
  }

  private static computeIsInteractive(target: HTMLElement): boolean {
    const interactiveTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'];
    if (interactiveTags.includes(target.tagName)) return true;
    if (target.isContentEditable) return true;

    const role = target.getAttribute('role');
    if (role === 'button' || role === 'menuitem' || role === 'menu' || role === 'menubar' || role === 'option') {
      return true;
    }

    if (
      target.closest('[role="menu"]') !== null ||
      target.closest('[role="menubar"]') !== null ||
      target.closest('#play-area-menu-bar') !== null ||
      target.closest('#collapsed-menu-trigger') !== null ||
      target.closest('#cozy-floating-menu-wrapper') !== null ||
      target.closest('#comfortable-top-hud-bar') !== null
    ) {
      return true;
    }

    return false;
  }

  /**
   * Schedules a DOM read task in the RAF pipeline to avoid forced sync reflow.
   */
  public static scheduleRead(fn: () => void): void {
    this.readQueue.push(fn);
    this.requestFrameFlush();
  }

  /**
   * Schedules a DOM write task in the RAF pipeline to batch style/layout changes.
   */
  public static scheduleWrite(fn: () => void): void {
    this.writeQueue.push(fn);
    this.requestFrameFlush();
  }

  private static requestFrameFlush(): void {
    if (this.isRafScheduled) return;
    this.isRafScheduled = true;
    requestAnimationFrame(() => this.flushQueues());
  }

  private static flushQueues(): void {
    this.isRafScheduled = false;

    // Phase 1: Batch Reads
    const reads = this.readQueue;
    this.readQueue = [];
    for (let i = 0; i < reads.length; i++) {
      try {
        reads[i]();
      } catch (err) {
        console.error('DOMEngine read task error:', err);
      }
    }

    // Phase 2: Batch Writes
    const writes = this.writeQueue;
    this.writeQueue = [];
    for (let i = 0; i < writes.length; i++) {
      try {
        writes[i]();
      } catch (err) {
        console.error('DOMEngine write task error:', err);
      }
    }
  }

  /**
   * Ensures aria-label is set on canvas element for accessibility without redundant DOM mutations.
   */
  public static ensureCanvasAccessibility(
    canvasId: string = 'game-canvas',
    label: string = 'Poodle Ride Adventure Play Area'
  ): void {
    const canvas = this.getElementFast(canvasId);
    if (!canvas) return;

    if (canvas.getAttribute('aria-label') !== label) {
      canvas.setAttribute('aria-label', label);
    }
    if (canvas.getAttribute('role') !== 'application') {
      canvas.setAttribute('role', 'application');
    }
    if (canvas.tabIndex < 0) {
      canvas.tabIndex = 0;
    }
  }
}

