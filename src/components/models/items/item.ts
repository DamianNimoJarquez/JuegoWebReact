import { Player } from "../player/player";
import { BaseItemData } from "./type";

export abstract class Item{
    public equipped = false;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly category: BaseItemData['category'],
        public readonly priceBuy: number,
        public readonly priceSell: number,
        public readonly info: string,
        public usable: boolean = false,
        public readonly action?: (jugador: Player) => Player
    ){}

    getInfo(): string{
        return this.info;
    }
    getDescription():string{
        return `${this.name} (${this.category}) - Compra: ${this.priceBuy} - Venta ${this.priceSell}`;
    }
}