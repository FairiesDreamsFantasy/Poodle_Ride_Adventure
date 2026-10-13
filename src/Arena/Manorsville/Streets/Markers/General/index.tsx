export function getStreetMarkerDescription(direction: string, gridX: number): string {
  if (direction === 'East') {
    return "From markers 8000 to 16,000 from the west; Rasta-Manor is located on your right, south of this street. The Adventure house is located on your left, north of this street.";
  }
  if (direction === 'West') {
    return "From the markers of 16,000 to 24,000 from the east; Rasta-Manor is on your left, south of this street. The AdventureHouse is on your right, north of this street.";
  }
  return "";
}
