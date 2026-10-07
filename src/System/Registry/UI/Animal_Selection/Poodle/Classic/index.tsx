import { RegisteredPoodle } from '../General';

export const CLASSIC_POODLES: RegisteredPoodle[] = [
  {
    id: 'white_poodle',
    name: 'White Poodle',
    description: 'The default classic companion poodle. Sized conventionally with standard elegant white coat.',
    category: 'Classic',
    color: '#F8F8FF', // Ghost White
    supportsBarkToggle: false,
    barkTypes: ['Classic'],
  },
  {
    id: 'olga_olivia',
    name: 'Olga-Olivia',
    description: 'A Babylonian companion with chaotic, jerky 2-D movements and unique petting sounds. Expressive and vanity-focused.',
    category: 'Classic',
    color: '#708090', // Slate Grey
    supportsBarkToggle: false,
    barkTypes: ['Classic'],
  }
];
