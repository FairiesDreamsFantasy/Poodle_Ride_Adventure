import { RegisteredPoodle } from '../General';
import { POODLE_CORE as AbigayCore } from '@/src/Characters/Poodles/Abigay_Rose_Kone/General';
import { POODLE_CORE as AnninneAmeliaCore } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/General';
import { POODLE_CORE as DymondCore } from '@/src/Characters/Poodles/Dymond_Daisy_Qin-Reynolds/General';
import { POODLE_CORE as AbigailCore } from '@/src/Characters/Poodles/Abigail_Marigold_Kenyatta/General';

export const CRAFTED_POODLES: RegisteredPoodle[] = [
  {
    id: 'abigay_rose_kone',
    name: 'Abigay Rose Kone',
    description: AbigayCore.identity.description,
    category: 'Crafted',
    color: '#FFD1DC', // Pastel Pink / White
    supportsBarkToggle: true,
    barkTypes: ['Classic', 'Generic', 'BOW'],
  },
  {
    id: 'anninne_amelia_rose_julisus',
    name: 'Anninne-Amelia Rose Julisus',
    description: AnninneAmeliaCore.identity.description,
    category: 'Crafted',
    color: '#D2B48C', // Tan
    supportsBarkToggle: true,
    barkTypes: ['Classic', 'Generic', 'BOW'],
  },
  {
    id: 'dymond_daisy_qin_reynolds',
    name: 'Dymond Daisy Qin-Reynolds',
    description: DymondCore.identity.description,
    category: 'Crafted',
    color: '#E0B0FF', // Mauve/Lavender
    supportsBarkToggle: true,
    barkTypes: ['Classic', 'Generic', 'BOW'],
  },
  {
    id: 'abigail_marigold_kenyatta',
    name: 'Abigail Marigold Kenyatta',
    description: AbigailCore.identity.description,
    category: 'Crafted',
    color: '#F5DEB3', // Wheat/Marigold
    supportsBarkToggle: true,
    barkTypes: ['Classic', 'Generic', 'BOW'],
  }
];
