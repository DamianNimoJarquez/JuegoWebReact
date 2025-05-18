import { Item } from "../items/item";

export interface Atributos{
    str: number;
    def: number;
    agi: number;
    conc: number;
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