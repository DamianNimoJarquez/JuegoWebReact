import { Objective } from "./objective";
import { ObjectiveType, UpdateData } from "./types";

export class killObjective extends Objective{
    public readonly type: ObjectiveType = 'kill';
    constructor(public readonly enemyId: string, required:number){super(required,'kill');}
    update(data?: UpdateData): void {
        super.update(data);
    }
}