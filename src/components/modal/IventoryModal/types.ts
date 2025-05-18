export type TabKey =
  | 'equipped'
  | 'weapon'
  | 'armor'
  | 'accessory'
  | 'consumable'
  | 'key';

export const tabLabels: Record<TabKey, string> = {
  equipped: 'Equipado',
  weapon: 'Armas',
  armor: 'Armadura',
  accessory: 'Accesorios',
  consumable: 'Consumibles',
  key: 'Llaves'
};