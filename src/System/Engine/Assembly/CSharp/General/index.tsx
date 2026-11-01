/**
 * System/Engine/Assembly/CSharp/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific C# Language Engine Core Module.
 * 
 * Provides:
 * 1. LINQ declarative entity querying engine (Where, Select, OrderBy, FirstOrDefault, Aggregate).
 * 2. Multicast delegate system with typed event args and priority invocation order.
 * 3. Emulated Span<T> and ReadOnlySpan<T> memory window slices.
 */

export class SpanCSharp<T> {
  private array: T[];
  private startOffset: number;
  public readonly length: number;

  constructor(array: T[], startOffset: number = 0, length?: number) {
    this.array = array;
    this.startOffset = startOffset;
    this.length = length !== undefined ? length : array.length - startOffset;
  }

  public get(index: number): T {
    if (index < 0 || index >= this.length) throw new Error('Index out of range in SpanCSharp');
    return this.array[this.startOffset + index];
  }

  public set(index: number, val: T): void {
    if (index < 0 || index >= this.length) throw new Error('Index out of range in SpanCSharp');
    this.array[this.startOffset + index] = val;
  }

  public slice(start: number, count?: number): SpanCSharp<T> {
    const effectiveCount = count !== undefined ? count : this.length - start;
    return new SpanCSharp(this.array, this.startOffset + start, effectiveCount);
  }
}

export class LINQQueryEngineCSharp<T> {
  private items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  public where(predicate: (item: T) => boolean): LINQQueryEngineCSharp<T> {
    return new LINQQueryEngineCSharp(this.items.filter(predicate));
  }

  public select<R>(selector: (item: T) => R): LINQQueryEngineCSharp<R> {
    return new LINQQueryEngineCSharp(this.items.map(selector));
  }

  public orderBy<K>(keySelector: (item: T) => K): LINQQueryEngineCSharp<T> {
    const sorted = [...this.items].sort((a, b) => {
      const ka = keySelector(a);
      const kb = keySelector(b);
      if (ka < kb) return -1;
      if (ka > kb) return 1;
      return 0;
    });
    return new LINQQueryEngineCSharp(sorted);
  }

  public firstOrDefault(predicate?: (item: T) => boolean): T | null {
    if (predicate) {
      return this.items.find(predicate) || null;
    }
    return this.items.length > 0 ? this.items[0] : null;
  }

  public aggregate<A>(initialValue: A, accumulator: (acc: A, item: T) => A): A {
    return this.items.reduce(accumulator, initialValue);
  }

  public toArray(): T[] {
    return [...this.items];
  }
}

export class EngineAssemblyCSharpManager {
  private delegates: Map<string, Array<(...args: any[]) => void>> = new Map();

  public subscribe(event: string, handler: (...args: any[]) => void): void {
    const list = this.delegates.get(event) || [];
    list.push(handler);
    this.delegates.set(event, list);
  }

  public invoke(event: string, ...args: any[]): void {
    (this.delegates.get(event) || []).forEach(fn => fn(...args));
  }

  public query<T>(items: T[]): LINQQueryEngineCSharp<T> {
    return new LINQQueryEngineCSharp(items);
  }

  public createSpan<T>(array: T[], offset: number = 0, length?: number): SpanCSharp<T> {
    return new SpanCSharp(array, offset, length);
  }
}

export const EngineAssemblyCSharpManagerInstance = new EngineAssemblyCSharpManager();
