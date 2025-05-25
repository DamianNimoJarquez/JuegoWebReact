import { Atributos } from "../player/type";
import { QuestStep } from "./questSetp";
import { UpdateData } from "./types";

type TypeQuests = 'main' | 'side';

export class Quest{
    public currentStepIndex = 0;
    public completed = false;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly shortdesc: string,
        public readonly typequest: TypeQuests,
        public readonly requirement: Atributos,
        public readonly steps: QuestStep[],
        public readonly reward: Record<string, number>
    ){}
    public get currentStep(): QuestStep{
        return this.steps[this.currentStepIndex];
    }
    private completeQuest(): void{
        this.completed = true;
    }
    private advanceStep(): void{
        if(this.currentStepIndex < this.steps.length - 1)
            this.currentStepIndex++;
        else
            this.completeQuest();
    }
    public updateProgress(data: UpdateData): void{
        if(this.completed) return;
        const step = this.currentStep;
        step.objective.update(data);
        if(step.checkCompleted())
            this.advanceStep();
    }
}