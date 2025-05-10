import { IObjective } from "./types";

export class QuestStep{
    public completed = false;
    constructor(
        public readonly description: string,
        public readonly objective: IObjective
    ){}
    /**
     * Comprobar si el paso está completado
     * @return true si el objetivo está completo
     */
    public checkCompleted(): boolean{
        this.completed = this.objective.isComplete();
        return this.completed;
    }
}