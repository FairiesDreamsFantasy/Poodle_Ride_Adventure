/**
 * Scientific Visuals Engine Assembly CPP Render Batch Pool Core Module
 * Render batch geometry memory pooling, 2D AABB frustum culling,
 * Z-layer sort key encoding, and dirty-uniform state tracking.
 */

export interface RenderDrawCommand {
  sortKey: number;
  zOrder: number;
  materialId: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export class VisualsAssemblyCPPRenderBatch {
  private batchSize: number = 2048;
  private commands: RenderDrawCommand[] = [];
  private dirtyUniformMask: number = 0;

  public getBatchCapacity(): number {
    return this.batchSize;
  }

  public setBatchCapacity(capacity: number): void {
    this.batchSize = Math.max(64, Math.min(65536, Math.floor(capacity)));
  }

  public encodeSortKey(zOrder: number, materialId: number): number {
    const zBits = (Math.max(0, Math.min(0xffff, Math.round(zOrder + 32768))) & 0xffff) * 0x10000;
    return zBits + (materialId & 0xffff);
  }

  public submitCommand(cmd: Omit<RenderDrawCommand, 'sortKey'>): boolean {
    if (this.commands.length >= this.batchSize) return false;
    this.commands.push({
      ...cmd,
      sortKey: this.encodeSortKey(cmd.zOrder, cmd.materialId),
    });
    return true;
  }

  /** Frustum AABB visibility culling + deterministic depth-then-material sort */
  public flushVisibleSorted(
    viewMinX: number,
    viewMinY: number,
    viewMaxX: number,
    viewMaxY: number
  ): RenderDrawCommand[] {
    const visible = this.commands.filter(
      (c) => c.maxX >= viewMinX && c.minX <= viewMaxX && c.maxY >= viewMinY && c.minY <= viewMaxY
    );
    visible.sort((a, b) => a.sortKey - b.sortKey);
    this.commands = [];
    return visible;
  }

  public markUniformDirty(bitIndex: number): void {
    this.dirtyUniformMask |= 1 << (bitIndex & 31);
  }

  public consumeDirtyUniformMask(): number {
    const mask = this.dirtyUniformMask;
    this.dirtyUniformMask = 0;
    return mask;
  }
}

export const VisualsAssemblyCPPRenderBatchInstance = new VisualsAssemblyCPPRenderBatch();
