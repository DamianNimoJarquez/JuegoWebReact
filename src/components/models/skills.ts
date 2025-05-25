import { Atributos } from "./player/type";

interface AttributesRequired extends Atributos{
  level: number;
}

export class Skill{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public shortDesc: string,
        public type: string,
        public requirements: AttributesRequired,
        public state: "active" | "inactive" | "bloqued"
      ) {}

      unLock(atrib: Atributos): boolean{
        return Object.entries(this.requirements).every(([key, value]) =>{
          return atrib[key as keyof Atributos] >= value;
        })
      }
}