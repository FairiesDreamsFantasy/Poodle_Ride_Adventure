export interface Carpet {
  id: string;
  name: string;
  color: string;
  pile: 'Low' | 'Medium' | 'High';
}

export const CARPETS: Carpet[] = [
  {
    id: 'plush_carpet_cream',
    name: 'Plush Carpet (Cream)',
    color: '#FFF9C4',
    pile: 'Medium'
  }
];
