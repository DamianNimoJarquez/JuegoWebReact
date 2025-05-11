import { Consumable } from "../components/models/items/consumable";
import { Equipable } from "../components/models/items/equipable";
import { Item } from "../components/models/items/item";
import { KeyItems } from "../components/models/items/keyitems";
import { RawItemData } from "../components/models/items/type";

export function createItem(data: RawItemData): Item{
    switch(data.category){
        case "weapon":
        case "armor":
        case "accessory":
            return new Equipable({
                ...data,
                stats:{
                    atk: (data as any).atk,
                    def: (data as any).def,
                    agi: (data as any).agi,
                    con: (data as any).con,
                }
            });
        case "consumable":
            return new Consumable(data);
        case "key":
            return new KeyItems(data);
    }
}