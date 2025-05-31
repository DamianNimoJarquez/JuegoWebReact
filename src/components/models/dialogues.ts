export class Dialogues{
    constructor(
        public readonly type: 'story' | 'quest' | 'generic',
        public readonly id: string,
        public readonly text: string[],
        public index: number,
        public completed: boolean,
    ){};
}