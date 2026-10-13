export * from './General';
export * from './Animations';
export * from './Plants';

export interface NatureElement {
  id: string;
  name: string;
  category: 'Flora' | 'Fauna' | 'Geology' | 'Hydrology';
}

export const NATURE_ELEMENTS: NatureElement[] = [
  { id: 'rose_bush', name: 'Royal Rose Bush', category: 'Flora' },
  { id: 'marigold_flower', name: 'Marigold Meadow Flower', category: 'Flora' },
  { id: 'stream_rock', name: 'Polished Creek Rock', category: 'Geology' }
];
