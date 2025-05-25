import { Item } from "../components/models/items/item";
import { RawItemData } from "../components/models/items/type";
import { Player } from "../components/models/player/player";
import { InventorySlot } from "../components/models/player/type";
import { Skill } from "../components/models/skills";

import { createItem } from "./createItem";

export const ListItems: Record<string, Record<string, RawItemData>> = {
    weapon:{
        espada_corta:{
            id: 'espada_corta', name: 'Espada Corta', category: 'weapon', priceBuy: 100, priceSell: 100, info: 'Una espada corta y afilada.', str: 5
        },
        espada_larga: {
            id: 'espada_larga', name: 'Espada Larga', category: 'weapon',priceBuy: 200, priceSell: 100, info: 'Una espada larga que inflige más daño.',str: 7
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
            str: 3, def: 1, agi: 0, con: 0
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
        libro_fuego: {
            id: 'libro_fuego',
            name: 'Libro de Fuego',
            category: 'key',
            priceBuy: 500,
            priceSell: 0,
            usable: true,
            info: 'Aprendes la habilidad Fireball.',
            action: (player: Player) => {
                // Crea la skill y la añade al jugador
                const fireball = new Skill(
                    'fireball',
                    'Fireball',
                    'Lanzas una bola de fuego',
                    'Bola de fuego',
                    'magia',
                    { agi: 0, conc: 0, def: 0, str: 0, level: 1 },
                    'inactive'
                );
                return player.addSkill(fireball);
            }
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

export function getItemsSlots(): InventorySlot[]{
    const items: InventorySlot[] = [];

    for(const categoryKey in ListItems){
        const categoryGroup = ListItems[categoryKey];
        for(const idKey in categoryGroup){
            const rawData = categoryGroup[idKey];
            const itemInstance = createItem(rawData);
            if(itemInstance){
                items.push({item: itemInstance, qty: 1});
            }
        }
    }
    return items;

}