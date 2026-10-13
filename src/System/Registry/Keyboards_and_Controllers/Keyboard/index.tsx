import { CEDELLA_REGISTRY } from './Cedella';
import { ARDEN_DENIS_REGISTRY } from './Arden_Denis';

export const KEYBOARD_LAYOUT_REGISTRY = [
  CEDELLA_REGISTRY,
  ARDEN_DENIS_REGISTRY,
  {
    id: 'Standard',
    name: 'Standard Layout',
    description: 'Basic arrow key movement with discrete turns.',
    features: ['Arrow Keys: Move/Turn']
  }
];

export * from './Cedella';
export * from './Arden_Denis';
