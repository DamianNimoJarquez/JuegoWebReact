import { Item } from "../items/item";

export interface Atributos{
    agi: number
    conc: number
    def: number
    str: number
}
export interface InventorySlot{
    item: Item;
    qty: number;
}

export interface EquipmentSlots {
  weapon: Item | null;
  armor: Item | null;
  accessory: Item | null;
}