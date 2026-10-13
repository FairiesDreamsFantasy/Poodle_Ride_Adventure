/**
 * Scientific Keyboards & Controllers R Latency Distribution Core Module
 * Input response latency distributions and button mash frequency statistics.
 */



export class ControllerRLatencyAnalyzer {

  public computeAverageLatency(latenciesMs: number[]): number {
    if (latenciesMs.length === 0) return 0;
    return latenciesMs.reduce((a, b) => a + b, 0) / latenciesMs.length;
  }
        
}

export const ControllerRLatencyAnalyzerInstance = new ControllerRLatencyAnalyzer();
