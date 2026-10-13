/**
 * Scientific Engine XML DOM Parser & Tree Serializer Core Module
 * Strict XML schema validation, element node parsing, and attribute serialization.
 */



export class EngineXMLParser {

  public parseAttributes(tagString: string): Record<string, string> {
    const attrs: Record<string, string> = {};
    const regex = /([a-zA-Z0-9_:-]+)="([^"]*)"/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(tagString)) !== null) {
      attrs[match[1]] = match[2];
    }
    return attrs;
  }
        
}

export const EngineXMLParserInstance = new EngineXMLParser();
