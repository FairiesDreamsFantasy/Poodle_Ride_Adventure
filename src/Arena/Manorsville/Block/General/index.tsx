/**
 * Manorsville Block General Configuration & Dimensions
 */

export const SUPER_BLOCK_DIMENSIONS = {
  lengthNS: 32000, // 32,000 feet long (North/South edges)
  lengthEW: 19200, // 19,200 feet long (East/West sides)
  rastaManorWestOffset: 8000,  // 8,000 feet marker from West edge
  rastaManorEastOffset: 16000, // 16,000 feet marker from East edge
  safetyFenceOffsetN: 9500,     // 9,500 feet marker from North sidewalk
  safetyFenceOffsetS: 9500,     // 9,500 feet marker from South sidewalk
  safetyFenceSpan: 200,         // Spans 200 feet for subway track view
  safetyFenceHeight: 40,        // 40 feet high climb-resistant fence
};

export function getBlockDescription(blockNumber: number): string {
  if (blockNumber === 1900) {
    return "This is the 1900 Block of Manorsville, featuring Rasta-Manor on the south and brick sidewalks around the super block.";
  }
  if (blockNumber === 2000) {
    return "This is the 2000 Block of Manorsville, positioned across 1900 street to the north, featuring the Adventure House at its south end.";
  }
  return `This is Block ${blockNumber} of Manorsville.`;
}
