import { Item } from "./item";
import { BaseItemData, EquipSlot } from "./type";

export interface EquipableData extends BaseItemData{
    category: 'weapon' | 'armor' | 'accessory';
    stats: {str?:number; def?:number; agi?:number; con?:number};
    equipped: boolean;
    //equipSlots: EquipSlot[];
}

export class Equipable extends Item{
    public readonly stats: EquipableData['stats'];
    //public readonly equipSlots: EquipableData['equipSlots'];
    constructor(data: EquipableData){
        super(data.id,data.name,data.category,data.priceBuy,data.priceSell,data.info,data.usable,data.action,data.func)
        this.stats = data.stats;
        this.equipped = data.equipped?? false;
        //this.equipSlots = data.equipSlots;
    }
    getDescription(): string {
        const parts: string[] = [];
        if (this.stats.str) parts.push(`str: +${this.stats.str}`);
        if (this.stats.def) parts.push(`DEF: +${this.stats.def}`);
        if (this.stats.agi) parts.push(`AGI: +${this.stats.agi}`);
        if (this.stats.con) parts.push(`CON: +${this.stats.con}`);
        return `${super.getDescription()}, ${parts.join(', ')}`;
    }
}