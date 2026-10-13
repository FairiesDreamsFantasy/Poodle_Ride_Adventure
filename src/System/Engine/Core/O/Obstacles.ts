import { GRID_SIZE } from '../Constants/Dimensions';
import { FOYER_DESCRIPTIONS } from '../../../../Description_List/F/Foyer';

export interface Obstacle {
  id: string;
  area: string;
  level?: 'Floor' | 'Sky' | 'Cellar';
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  description: string;
  isWall?: boolean; // If true, it's a thin wall (line)
}

export const FOYER_OBSTACLES: Obstacle[] = [
  {
    id: 'ramp_wall_right',
    area: 'Foyer',
    level: 'Floor',
    xMin: 20, xMax: 20, yMin: 1320, yMax: 2000,
    description: "A decorative wall with embossed light-blue and black triangles connects the side of the ramp below the perimeter walkway.",
    isWall: true
  },
  {
    id: 'ramp_wall_left',
    area: 'Foyer',
    level: 'Floor',
    xMin: 0, xMax: 0, yMin: 1320, yMax: 2000,
    description: "You have reached the West wall of the Foyer, which supports the Sky Ramp here.",
    isWall: true
  }
];

export const GRAND_PLAYGROUND_OBSTACLES: Obstacle[] = [
  {
    id: 'playground_ramp_railing_left',
    area: 'TheGrandPlayground',
    xMin: 1980.5, xMax: 1980.5, yMin: 1361, yMax: 1959, // Left room for both warp zones
    description: "A decorative glass barrier with a shiny brass rail that connects the side of the ramp structure.",
    isWall: true
  },
  {
    id: 'playground_ramp_railing_right',
    area: 'TheGrandPlayground',
    xMin: 2000, xMax: 2000, yMin: 1361, yMax: 1959, // Left room
    description: "A decorative glass barrier with a shiny brass rail that connects the side of the ramp structure.",
    isWall: true
  }
];

export const ALLISONS_MANOR_OBSTACLES: Obstacle[] = [
  {
    id: 'allisons_manor_fence',
    area: 'AllisonsPorch',
    xMin: 0, xMax: 2000, yMin: 0, yMax: 0,
    description: "A tall fence built with a brass and steel mix. It is painted red and decorated with yellow flowers, green vines, and brown twigs. The ornate gate is part of this structure.",
    isWall: true
  }
];

export const GARDEN_OBSTACLES: Obstacle[] = [
  {
    id: 'south_barrier',
    area: 'Garden',
    xMin: 0, xMax: 8000, yMin: 0, yMax: 0,
    description: "The 40-foot barrier stops you. Below, you can hear the sound of railway tracks. It stretches 8000 feet across.",
    isWall: true
  },
  {
    id: 'east_fence',
    area: 'Garden',
    xMin: 8000, xMax: 8000, yMin: 0, yMax: 2000,
    description: "You have reached the East garden wall. A 4-foot fence is here. A berry bush sits next to a table.",
    isWall: true
  },
  {
    id: 'west_fence',
    area: 'Garden',
    xMin: 0, xMax: 0, yMin: 0, yMax: 2000,
    description: "You have reached the West garden wall. A 4-foot fence is here. A bench sits next to the fence, and you can hear bushes in the wind.",
    isWall: true
  },
  {
    id: 'north_wall_garden_west',
    area: 'Garden',
    xMin: 0, xMax: 3990, yMin: 2000, yMax: 2000,
    description: "You have reached the North garden wall. The massive house looms above you. To the East is the entrance.",
    isWall: true
  },
  {
    id: 'north_wall_garden_east',
    area: 'Garden',
    xMin: 4010, xMax: 8000, yMin: 2000, yMax: 2000,
    description: "You have reached the North garden wall. The massive house looms above you. To the West is the entrance.",
    isWall: true
  }
];

export const ANIMAL_RIDE_OBSTACLES: Obstacle[] = [
  { id: 'rabbit', area: 'AnimalRideMeditationRoom', xMin: 20, xMax: 40, yMin: 20, yMax: 40, description: "A large white toy rabbit, ready to ride." },
  { id: 'cat', area: 'AnimalRideMeditationRoom', xMin: 60, xMax: 80, yMin: 20, yMax: 40, description: "A large orange toy cat, ready to ride." },
  { id: 'poodle', area: 'AnimalRideMeditationRoom', xMin: 100, xMax: 120, yMin: 20, yMax: 40, description: "A large pink toy poodle, ready to ride." },
  { id: 'mouse', area: 'AnimalRideMeditationRoom', xMin: 140, xMax: 160, yMin: 20, yMax: 40, description: "A large white toy mouse, ready to ride." },
  { id: 'tea_table', area: 'AnimalRideMeditationRoom', xMin: 80, xMax: 120, yMin: 60, yMax: 80, description: "A table set for a tea party." },
];
