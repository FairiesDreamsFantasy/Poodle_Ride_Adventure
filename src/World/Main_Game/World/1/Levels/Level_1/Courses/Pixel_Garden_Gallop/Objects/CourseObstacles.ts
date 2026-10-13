/**
 * CourseObstacles.ts
 * 
 * Defines interactive level assets such as:
 * - Lucky golden horseshoes (collectible score)
 * - Aesthetic pixel borders
 * - Speed boosting flower petals
 */

export interface CourseObstacle {
  id: string;
  x: number; // 0 to 100 feet
  y: number; // 0 to 1000 feet
  type: 'horseshoe' | 'petal_boost' | 'decorative_hedge' | 'finish_banner';
  radius: number;
  collected?: boolean;
}

export function loadDefaultCourseObstacles(courseId: number): CourseObstacle[] {
  // Return pristine arrays of obstacles per course
  return [
    { id: 'shoe_1', x: 44, y: 250, type: 'horseshoe', radius: 1.5 },
    { id: 'shoe_2', x: 56, y: 500, type: 'horseshoe', radius: 1.5 },
    { id: 'boost_1', x: 50, y: 750, type: 'petal_boost', radius: 2 },
    { id: 'finish', x: 50, y: 990, type: 'finish_banner', radius: 10 }
  ];
}
