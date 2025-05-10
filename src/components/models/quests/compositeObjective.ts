import { IObjective, ObjectiveType, UpdateData } from "./types";

export class CompositeObjective implements IObjective{
    public readonly type: ObjectiveType = 'composite';
    public progress!: number;
    public readonly required!: number;
    constructor(public readonly objectives: IObjective[]){}
    isComplete(): boolean {
        return this.objectives.every(obj => obj.isComplete());
    }
    update(data?: UpdateData): void {
        this.objectives.forEach(obj => obj.update(data));
    }
}