/**
 * Scientific System Plugins Controller Engine
 * @intrinsic
 * @protected
 * Centralized Operational Controller for Essential Build Plugins and Compiler Extensions.
 * Fortified under 50,000% Ultra-Scientific Computer Science Rigor.
 */

import {
  PluginRegistry,
  PluginSpecification,
  PluginCategory,
} from '../../Registry/Plugins/General';

export interface PluginHealthStatus {
  readonly pluginId: string;
  readonly name: string;
  readonly verified: boolean;
  readonly category: PluginCategory;
  readonly message: string;
}

export interface PluginSystemAuditReport {
  readonly timestamp: string;
  readonly totalPlugins: number;
  readonly verifiedPluginsCount: number;
  readonly systemIntegrityPercentage: number;
  readonly zeroPruningInvariantMaintained: boolean;
  readonly protectionLevel: string;
  readonly statuses: readonly PluginHealthStatus[];
}

export class PluginSystemController {
  public static evaluatePluginHealth(): PluginHealthStatus[] {
    const catalog = PluginRegistry.listPlugins();
    return catalog.map((spec: PluginSpecification) => {
      const isVerified = spec.activeInProduction && Boolean(spec.packageIdentifier);
      return {
        pluginId: spec.id,
        name: spec.name,
        verified: isVerified,
        category: spec.category,
        message: isVerified
          ? `Plugin ${spec.packageIdentifier} active and verified under ${spec.protectionLevel}.`
          : `CRITICAL: Plugin ${spec.packageIdentifier} missing or inactive!`,
      };
    });
  }

  public static assertZeroPruningInvariant(): boolean {
    const statuses = this.evaluatePluginHealth();
    const allVerified = statuses.every((s) => s.verified);
    if (!allVerified) {
      throw new Error(
        'CRITICAL SYSTEM INVARIANT VIOLATION: One or more essential build plugins were pruned or tampered with!'
      );
    }
    return true;
  }

  public static generatePluginAuditReport(): PluginSystemAuditReport {
    const statuses = this.evaluatePluginHealth();
    const total = statuses.length;
    const verifiedCount = statuses.filter((s) => s.verified).length;
    const integrityPct = total > 0 ? (verifiedCount / total) * 100 : 0;

    return {
      timestamp: new Date().toISOString(),
      totalPlugins: total,
      verifiedPluginsCount: verifiedCount,
      systemIntegrityPercentage: integrityPct,
      zeroPruningInvariantMaintained: integrityPct === 100,
      protectionLevel: '50,000% Ultra-Scientific Computer Science Rigor',
      statuses: statuses,
    };
  }
}

export const PluginSystemControllerInstance = new PluginSystemController();
export * from '../../Registry/Plugins/General';
