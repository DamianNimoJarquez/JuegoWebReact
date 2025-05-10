import { Objective } from "./objective";
import { ObjectiveType, UpdateData } from "./types";

export class collectionObjective extends Objective{
    public readonly type: ObjectiveType = 'collection';
    constructor(public readonly itemID: string, required: number){super(required,'collection');}

    update(data?: UpdateData): void {
        super.update(data);
    }
}