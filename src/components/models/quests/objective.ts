import { IObjective, ObjectiveType, UpdateData } from "./types";

export abstract class Objective implements IObjective{
    public progress: number = 0;
    constructor(
        public readonly required: number,
        public readonly type: ObjectiveType
    ){}
    isComplete(): boolean {
        return this.progress >= this.required;
    }
    update(data?: UpdateData): void {
        if(!data || data.type != this.type || data.amount === null) return;
        this.progress = Math.min(this.progress + data.amount!, this.required );
    }
}