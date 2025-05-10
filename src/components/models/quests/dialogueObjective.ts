import { Objective } from "./objective";
import { ObjectiveType, UpdateData } from "./types";

export class DialogueObjective extends Objective{
    public readonly type: ObjectiveType = 'dialogue';
    constructor(public readonly npcId: string){ super(1,'dialogue')};
    update(data?: UpdateData): void {
        if(data?.type === this.type && data.id === this.npcId)
            this.progress = this.required;
    }
}