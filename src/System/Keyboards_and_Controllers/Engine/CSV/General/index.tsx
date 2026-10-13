/**
 * Scientific Keyboards & Controllers CSV Macro Streamer Core Module
 * Input macro replay sequences (timestamp, key, duration, state).
 */



export class ControllerCSVMacroStreamer {

  public parseInputMacro(csv: string): Array<{ timeMs: number; key: string; isDown: boolean }> {
    return csv.trim().split("\n").map(l => {
      const [t, k, d] = l.split(",");
      return { timeMs: parseInt(t) || 0, key: (k || "").trim(), isDown: d?.trim() === "1" };
    });
  }
        
}

export const ControllerCSVMacroStreamerInstance = new ControllerCSVMacroStreamer();
