export const isOutdoorArea = (area: string): boolean => {
  const outdoorAreas = ['Garden', 'Porch', 'Sidewalk', 'Street', 'AdventurePath', 'HedgePath', 'RastafariCave', 'Overpass', 'Suburb', 'OpenTrench'];
  return outdoorAreas.includes(area);
};
