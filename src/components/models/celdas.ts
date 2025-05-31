interface CellConent{
    type: 'npc' | 'puzzle'
}
export class Celdas{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly x: number,
        public readonly y: number,
        public visited: boolean,
        public readonly type: 'normal' | 'town',
        public readonly backgroundImage?:string,
        public readonly enemyLevels?: string,
        public content?: CellConent,
        //eventos
    ){}
}