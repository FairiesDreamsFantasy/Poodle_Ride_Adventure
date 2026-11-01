/**
 * System/AI/In-Game/Engine/BASIC/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific AI BASIC-Level Procedural Macro Engine.
 */

export const executeAIBasicSubroutine = (lineNum: number, command: string): string => {
  return `${lineNum} ${command}`;
};

export const basicEngine = {
  print: (msg: string) => executeAIBasicSubroutine(10, `PRINT "${msg}"`),
  goto: (line: number) => executeAIBasicSubroutine(20, `GOTO ${line}`)
};
