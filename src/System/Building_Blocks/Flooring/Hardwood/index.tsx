export interface Hardwood {
  id: string;
  name: string;
  woodType: 'Oak' | 'Maple' | 'Cherry' | 'Walnut';
  finish: 'Polished' | 'Matte';
  color: string;
}

export const HARDWOOD_FLOORS: Hardwood[] = [
  {
    id: 'polished_hardwood_oak',
    name: 'Polished Hardwood (Oak)',
    woodType: 'Oak',
    finish: 'Polished',
    color: '#A1887F'
  }
];
