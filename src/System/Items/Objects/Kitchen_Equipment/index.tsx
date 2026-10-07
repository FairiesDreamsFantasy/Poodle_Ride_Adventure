export interface KitchenEquipment {
  id: string;
  name: string;
  status: 'ON' | 'OFF';
  features: string[];
}

export const KITCHEN_EQUIPMENT_REGISTRY: KitchenEquipment[] = [
  {
    id: 'dishwasher_unit_1',
    name: 'Industrial Dishwasher',
    status: 'ON',
    features: ['Insulated Pipes', 'Red Valve Hot Water Supply']
  }
];
