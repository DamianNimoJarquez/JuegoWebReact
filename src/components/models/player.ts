import { Skill } from "./skills"

export interface Atributos{
    agi: number
    conc: number
    def: number
    str: number
    level: number
}
export class Player{
    constructor(
        public name: string,
        public atributos: Atributos,
        public limiteSkillActivas: number,
        public skills: Skill[],
        public quests: null,
        public exp: number,
        public expLvlUp: number
        
    ){}

    toggleSkills(id: string): Player{
        const numSkillActive = this.skills.filter((s)=> s.state === 'active').length;
        const changedSkill = this.skills.map((skill) =>{
            if(skill.id !== id) return skill;
            if(skill.state === 'bloqued') return skill;
            if(skill.state === 'active' && numSkillActive >= this.limiteSkillActivas) return skill;
            return new Skill(skill.id,skill.name, skill.description, skill.shortDesc, skill.type, skill.requirements, skill.state === 'active' ? 'inactive' : 'active');
        });
        return new Player(this.name, {...this.atributos}, this.limiteSkillActivas,changedSkill,this.quests,this.exp,this.expLvlUp)
    }

    unLockSkills(): Player{
        const changedSkill = this.skills.map((skill) =>{
            let newState = skill.state;

            if (skill.state === 'bloqued' && skill.unLock(this.atributos)){
                console.log("Desbloquea");
                newState = 'inactive';
            }
            else{
                console.log("No desbloquea: ", skill.unLock(this.atributos));
            }
            return new Skill(skill.id,skill.name, skill.description, skill.shortDesc, skill.type, skill.requirements, newState);
        });
        return new Player(this.name, {...this.atributos}, this.limiteSkillActivas,changedSkill,this.quests,this.exp,this.expLvlUp)
    }
}