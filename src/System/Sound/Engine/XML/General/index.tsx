/**
 * Scientific Sound Engine XML Soundbank Manifest Parser Core Module
 * Parsing XML audio sprite manifests, loop points, and volume envelopes.
 */



export class SoundXMLManifestParser {

  public parseAudioSpriteXML(xmlString: string): Array<{ name: string; start: number; end: number }> {
    const sprites: Array<{ name: string; start: number; end: number }> = [];
    const regex = /<sprite\s+name="([^"]+)"\s+start="([0-9.]+)"\s+end="([0-9.]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(xmlString)) !== null) {
      sprites.push({ name: match[1], start: parseFloat(match[2]), end: parseFloat(match[3]) });
    }
    return sprites;
  }
        
}

export const SoundXMLManifestParserInstance = new SoundXMLManifestParser();
