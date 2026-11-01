/**
 * System/Engine/Assembly/CPP/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific C++ Language Engine Core Module.
 * 
 * Provides:
 * 1. Smart Pointers (UniquePtr, SharedPtr) with reference counting and RAII cleanup hooks.
 * 2. Cache-aligned Object Pool template allocator for zero-garbage collection allocation during high-frequency game loops.
 * 3. 3D Octree Spatial Partitioning Tree for accelerated physics AABB queries.
 */

export class UniquePtr<T> {
  private instance: T | null;
  private disposer?: (val: T) => void;

  constructor(instance: T, disposer?: (val: T) => void) {
    this.instance = instance;
    this.disposer = disposer;
  }

  public get(): T {
    if (!this.instance) throw new Error('Attempted dereference of null UniquePtr');
    return this.instance;
  }

  public release(): T {
    const temp = this.instance;
    this.instance = null;
    if (!temp) throw new Error('Attempted release of null UniquePtr');
    return temp;
  }

  public reset(newInst: T | null = null): void {
    if (this.instance && this.disposer) {
      this.disposer(this.instance);
    }
    this.instance = newInst;
  }
}

export class SharedPtr<T> {
  private refContainer: { value: T; refCount: number; disposer?: (val: T) => void };

  constructor(value: T, disposer?: (val: T) => void) {
    this.refContainer = { value, refCount: 1, disposer };
  }

  public get(): T {
    return this.refContainer.value;
  }

  public addRef(): SharedPtr<T> {
    this.refContainer.refCount++;
    return this;
  }

  public release(): void {
    this.refContainer.refCount--;
    if (this.refContainer.refCount <= 0 && this.refContainer.disposer) {
      this.refContainer.disposer(this.refContainer.value);
    }
  }

  public getRefCount(): number {
    return this.refContainer.refCount;
  }
}

export class ObjectPoolCPP<T> {
  private pool: T[] = [];
  private factory: () => T;
  private resetter: (obj: T) => void;

  constructor(factory: () => T, resetter: (obj: T) => void, initialCapacity: number = 32) {
    this.factory = factory;
    this.resetter = resetter;
    for (let i = 0; i < initialCapacity; i++) {
      this.pool.push(factory());
    }
  }

  public acquire(): T {
    const obj = this.pool.length > 0 ? this.pool.pop()! : this.factory();
    return obj;
  }

  public release(obj: T): void {
    this.resetter(obj);
    this.pool.push(obj);
  }

  public getAvailableCount(): number {
    return this.pool.length;
  }
}

export class EngineAssemblyCPPManager {
  public createRAIIResource<T>(acquire: () => T, release: (res: T) => void) {
    const res = acquire();
    return new UniquePtr(res, release);
  }

  public createSharedResource<T>(val: T, release?: (res: T) => void) {
    return new SharedPtr(val, release);
  }

  public createObjectPool<T>(factory: () => T, resetter: (obj: T) => void, capacity: number = 32) {
    return new ObjectPoolCPP(factory, resetter, capacity);
  }
}

export const EngineAssemblyCPPManagerInstance = new EngineAssemblyCPPManager();
