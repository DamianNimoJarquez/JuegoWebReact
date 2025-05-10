/** Tipos de objetivos */
export type ObjectiveType = 'dialogue' | 'collection' | 'kill' | 'composite';

/** Actualización de objetivos */
export interface UpdateData{
    type: ObjectiveType;
    id: string;
    amount?: number; 
    // los diálogos, por ahora no tienen cantidad
}

/** Estructura común para todos los objetivos de una quest */
export interface IObjective{
    readonly required: number; //Cantidad de objetos o enemigos requeridos
    progress: number; //Cantidad de objetos o enemigos actuales
    readonly type: ObjectiveType; //Tipo de misión
    isComplete(): boolean; //Para saber si está completa la misión o no
    update(data?: UpdateData): void; //para actualizar el progresos
}