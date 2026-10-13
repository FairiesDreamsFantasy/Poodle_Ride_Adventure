/**
 * Scientific Keyboards & Controllers XML Mapping Parser Core Module
 * XML gamepad mapping parser and Cedella layout configuration loader.
 */



export class ControllerXMLMappingParser {

  public parseGamepadXML(xml: string): Array<{ button: string; key: string }> {
    const bindings: Array<{ button: string; key: string }> = [];
    const regex = /<bind\s+button="([^"]+)"\s+key="([^"]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(xml)) !== null) {
      bindings.push({ button: match[1], key: match[2] });
    }
    return bindings;
  }
        
}

export const ControllerXMLMappingParserInstance = new ControllerXMLMappingParser();
