/**
 * System/Visuals/Index/Assembly/CPP/General/index.tsx
 * Topological render pass dependency resolver and telemetry index slot allocator.
 */

export interface RenderPassNode {
  id: string;
  dependsOn: string[];
}

export class VisualsIndexAssemblyCPPGraph {
  public resolvePassOrder(passes: readonly RenderPassNode[]): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();
    const map = new Map(passes.map((p) => [p.id, p]));

    const visit = (id: string, stack: Set<string>) => {
      if (visited.has(id) || stack.has(id)) return;
      stack.add(id);
      const node = map.get(id);
      if (node) {
        for (const dep of node.dependsOn) visit(dep, stack);
        visited.add(id);
        resolved.push(id);
      }
      stack.delete(id);
    };

    for (const p of passes) visit(p.id, new Set());
    return resolved;
  }
}

export const VisualsIndexAssemblyCPPInstance = new VisualsIndexAssemblyCPPGraph();
