/**
 * Scientific Engine Basic Sequential Command Engine Core Module
 * Deterministic BASIC line-number sequential command execution engine.
 */



export class EngineBasicInterpreter {

  private programLines: Map<number, string> = new Map();
  private variables: Map<string, number> = new Map();

  public setLine(lineNum: number, statement: string): void {
    this.programLines.set(lineNum, statement);
  }

  public setVariable(name: string, value: number): void {
    this.variables.set(name, value);
  }

  public getVariable(name: string): number {
    return this.variables.get(name) ?? 0;
  }

  public executeStep(lineNum: number): { nextLine: number | null; output?: string } {
    const stmt = this.programLines.get(lineNum);
    if (!stmt) return { nextLine: null };
    return { nextLine: lineNum + 10, output: stmt };
  }
        
}

export const EngineBasicInterpreterInstance = new EngineBasicInterpreter();
