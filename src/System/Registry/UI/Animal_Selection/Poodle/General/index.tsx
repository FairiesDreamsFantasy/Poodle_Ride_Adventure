export interface RegisteredPoodle {
  id: string;
  name: string;
  description: string;
  category: 'Crafted' | 'Classic';
  color: string;
  supportsBarkToggle?: boolean;
  barkTypes?: string[];
  isSpecial?: boolean;
  requiredArea?: string[];
}
