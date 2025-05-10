import { Objective } from "./objective";
import { ObjectiveType, UpdateData } from "./types";

export class TargetObjective extends Objective{
    public readonly type: ObjectiveType;
    constructor(
        public readonly targetId:string,
        required: number,
        type: 'collection' | 'kill'
    ){super(required,type); this.type=type}

    update(data?: UpdateData): void {
        if(
            data?.type === this.type &&
            data.id === this.targetId &&
            data.amount !== null
        ){this.progress = Math.min(this.progress + data.amount!, this.required);}
    }
}