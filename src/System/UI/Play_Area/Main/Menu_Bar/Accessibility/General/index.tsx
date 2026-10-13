export type TTSOption = 'ON' | 'ON (as local TTS)' | 'OFF';

export interface NotificationOption {
  id: 'bark' | 'jump' | 'pettingDescription' | 'collarGraspDescription' | 'leanDescription' | 'describeLoveLogic';
  label: string;
}

export const NOTIFICATION_OPTIONS: NotificationOption[] = [
  { id: 'bark', label: 'Bark Alerts' },
  { id: 'jump', label: 'Jump Alerts' },
  { id: 'pettingDescription', label: 'Petting Description' },
  { id: 'collarGraspDescription', label: 'Collar Grasp Description' },
  { id: 'leanDescription', label: 'Lean Description' },
  { id: 'describeLoveLogic', label: 'Describe Love Logic' }
];
