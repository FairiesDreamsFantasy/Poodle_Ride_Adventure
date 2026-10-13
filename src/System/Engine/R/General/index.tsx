/**
 * Scientific Engine R Vectorized Mathematics & Statistics Core Module
 * Vectorized array computations, regression formulas, and statistical distributions.
 */



export class EngineRStatistics {

  public mean(data: number[]): number {
    if (data.length === 0) return 0;
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  public variance(data: number[]): number {
    if (data.length < 2) return 0;
    const m = this.mean(data);
    return data.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (data.length - 1);
  }

  public normalDistribution(x: number, mean: number = 0, stdDev: number = 1): number {
    const factor = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    return factor * Math.exp(exponent);
  }
        
}

export const EngineRStatisticsInstance = new EngineRStatistics();
