/**
 * Scientific Engine CSV Tabular Record Stream Parser Core Module
 * Delimited data streaming, typed row casting, and CSV dataset generators.
 */



export class EngineCSVParser {

  public parseCSV(raw: string, delimiter: string = ","): string[][] {
    return raw
      .trim()
      .split("\n")
      .map(row => row.split(delimiter).map(cell => cell.trim().replace(/^"|"$/g, '')));
  }
        
}

export const EngineCSVParserInstance = new EngineCSVParser();
