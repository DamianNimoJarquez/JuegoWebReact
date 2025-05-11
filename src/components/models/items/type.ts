export type ItemCategory = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'key';

/**Base común de atributos de los items */
export interface BaseItemData{
    id: string;
    name: string;
    category: ItemCategory;
    priceBuy: number;
    priceSell: number;
    info: string;
    usable?: boolean;
    action?: string;
    func?: () => void;
}

/**Armas */
export interface WeaponData extends BaseItemData{
    category: 'weapon';
    atk: number;
}

/**Armaduras */
export interface ArmorData extends BaseItemData{
    category: 'armor';
    def: number;
}

/**Acessorios */
export interface AccessoryData extends BaseItemData{
    category: 'accessory';
    atk?: number;
    def?: number;
    agi?: number;
    con?: number;
}

/**Consumibles */
export interface ConsumableData extends BaseItemData{
    category: 'consumable';
    hpRecovered: number;
    mpRecovered: number;
}

/**Objetos Claves */
export interface KeyItemData extends BaseItemData{
    category: 'key';

}

export type RawItemData =  WeaponData | ArmorData | AccessoryData | ConsumableData | KeyItemData;