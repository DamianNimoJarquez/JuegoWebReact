import { Dialogues } from "./dialogues";

export class NPC{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly dialgoues: Dialogues[],
        public readonly imgUrl?: string,
        public readonly position?: {weight: string, hight: string},
        //event
    ){};
}