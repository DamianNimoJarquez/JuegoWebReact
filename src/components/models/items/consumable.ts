import { Item } from "./item";
import { ConsumableData } from "./type";

export class Consumable extends Item{
    public readonly hpRecovered: number;
    public readonly mpRecovered: number;
    constructor(data: ConsumableData){
        super(data.id, data.name, data.category, data.priceBuy,data.priceSell, data.info,true,data.action);
        this.hpRecovered = data.hpRecovered;
        this.mpRecovered = data.mpRecovered;
    }
    getDescription(): string {
        return `${super.getDescription()}, Recupera HP: ${this.hpRecovered}, MP: ${this.mpRecovered}`;
    }
}