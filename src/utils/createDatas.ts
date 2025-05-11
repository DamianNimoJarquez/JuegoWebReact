import { Item } from "../components/models/items/item";
import { RawItemData } from "../components/models/items/type";
import { createItem } from "./createItem";

export const ListItems: Record<string, Record<string, RawItemData>> = {
    weapon:{
        espada_corta:{
            id: 'espada_corta', name: 'Espada Corta', category: 'weapon', priceBuy: 100, priceSell: 100, info: 'Una espada corta y afilada.', atk: 5
        },
        espada_larga: {
            id: 'espada_larga', name: 'Espada Larga', category: 'weapon',priceBuy: 200, priceSell: 100, info: 'Una espada larga que inflige más daño.',atk: 7
        }
    },
    armor: {
        armadura_cuero: {
            id: 'armadura_cuero', name: 'Armadura de Cuero', category: 'armor',
            priceBuy: 150, priceSell: 75, info: 'Protección básica de cuero.',
            def: 5
        },
        armadura_plata: {
            id: 'armadura_plata', name: 'Armadura de Plata', category: 'armor',
            priceBuy: 350, priceSell: 175, info: 'Protección de plata.',
            def: 15
        }
    },
    accessory: {
        anillo_fuerza: {
            id: 'anillo_fuerza', name: 'Anillo de Fuerza', category: 'accessory',
            priceBuy: 120, priceSell: 60, info: 'Aumenta levemente el ataque.',
            atk: 3, def: 1, agi: 0, con: 0
        }
    },
    consumable: {
        pocion_salud: {
            id: 'pocion_salud', name: 'Poción de Salud', category: 'consumable',
            priceBuy: 50, priceSell: 25, info: 'Recupera 50 puntos de vida.',
            hpRecovered: 50, mpRecovered: 0
        },
        pocion_mana: {
            id: 'pocion_mana', name: 'Poción de Maná', category: 'consumable',
            priceBuy: 50, priceSell: 25, info: 'Recupera 50 puntos de maná.',
            hpRecovered: 0, mpRecovered: 50
        }
    },
    key: {
        piedra_misteriosa: {
            id: 'piedra_misteriosa', name: 'Piedra Misteriosa', category: 'key',
            priceBuy: 0, priceSell: 0, info: 'Una piedra misteriosa.',
            usable: true, action: 'Habilidad',
            func: () => createItem(ListItems.weapon.espada_corta)
        }
    }
}

export function getItems(): Item[]{
    const items: ReturnType<typeof createItem>[] = [];
    for(const categoryKey in ListItems){
        const categoryGroup = ListItems[categoryKey];
        for(const idKey in categoryGroup){
            const rawData = categoryGroup[idKey];
            const itemInstance = createItem(rawData);
            if(itemInstance)
                items.push(itemInstance);
        }
    }
    return items;
}