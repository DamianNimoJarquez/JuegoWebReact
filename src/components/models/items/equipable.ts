import { Item } from "./item";
import { BaseItemData } from "./type";

export interface EquipableData extends BaseItemData{
    category: 'weapon' | 'armor' | 'accessory';
    stats: {atk?:number; def?:number; agi?:number; con?:number};
}

export class Equipable extends Item{
    public readonly stats: EquipableData['stats'];
    constructor(data: EquipableData){
        super(data.id,data.name,data.category,data.priceBuy,data.priceSell,data.info,data.usable,data.action,data.func)
        this.stats = data.stats;
    }
    getDescription(): string {
        const parts: string[] = [];
        if (this.stats.atk) parts.push(`ATK: +${this.stats.atk}`);
        if (this.stats.def) parts.push(`DEF: +${this.stats.def}`);
        if (this.stats.agi) parts.push(`AGI: +${this.stats.agi}`);
        if (this.stats.con) parts.push(`CON: +${this.stats.con}`);
        return `${super.getDescription()}, ${parts.join(', ')}`;
    }
}