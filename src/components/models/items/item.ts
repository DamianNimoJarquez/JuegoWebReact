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
        public readonly usable: boolean = false,
        public readonly action?: string,
        public readonly func?: () => void
    ){}

    getInfo(): string{
        return this.info;
    }
    getDescription():string{
        return `${this.name} (${this.category}) - Compra: ${this.priceBuy} - Venta ${this.priceSell}`;
    }
}