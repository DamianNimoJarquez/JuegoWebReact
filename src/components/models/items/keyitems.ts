import { Item } from "./item";
import { KeyItemData } from "./type";

export class KeyItems extends Item{
    constructor(data: KeyItemData){
        super(data.id,
            data.name,
            data.category,
            data.priceBuy,
            data.priceSell,
            data.info,
            data.usable ?? false,
            data.action,
            data.func);
    }
}