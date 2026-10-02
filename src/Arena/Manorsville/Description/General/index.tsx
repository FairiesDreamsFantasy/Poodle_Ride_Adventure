/**
 * Manorsville Street Descriptions General Module
 */
export const MANORSVILLE_STREET_DESCRIPTION = "This is the street that enables you to go anywhere in this city. Each street has a name associated. If you are familiar with a city; each street is unique, so you can know where you are actually going.";
export const MANORSVILLE_INFO_DESCRIPTION = "Manorsville is a \"Car-free city, it has streets that are peaceful, brick sidewalks, large manors (that's how this city gots its name), and it has a community of people who lived in this city. Officially, this is a \"Babylon free\" city.";

export const MANORSVILLE_PORCH_AHEAD_DESCRIPTION = "This is the front porch of your Rasta-Manor; it has a pink and white checked flooring, skylights that are located at the overhang of this porch, and it has a set of blue doors ahead.";
export const MANORSVILLE_PORCH_BEHIND_DESCRIPTION = "The front porch of your manor is behind you. You are currently on the sidewalk. The street is ahead of you.";

export const MANORSVILLE_STREET_EDGE_DESCRIPTION = "This is the edge of the sidewalk, the street is like any other street. However; this car-free street is wide enough to support use of public transit vehicles, trucks that deliver food and supplies,--and other gooes via delivery, and emergency vehicles.";
export const MANORSVILLE_STREET_BEHIND_DESCRIPTION = "The street is behind you, and you on an sidewalk.. Rasta-Manor is ahead of you.";

export const MANORSVILLE_SIDEWALK_GENERAL_DESCRIPTION = "This is the streets of manorsville. It's a 'car-free' community that is composed of super blocks. It has a subway to help reduce traffic, large gardens for growing plants, and they have lots of manors. Its called 'Manorsville' because, there are large manors in this community";

export function getManorsvilleStreetInfoDescription(): string {
  return MANORSVILLE_STREET_DESCRIPTION;
}

export function getManorsvilleSidewalkInfoDescription(sidewalkLength: number = 8000): string {
  return MANORSVILLE_SIDEWALK_GENERAL_DESCRIPTION;
}
