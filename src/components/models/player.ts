import { Item } from "./items/item"
import { Quest } from "./quests/quest"
import { UpdateData } from "./quests/types"
import { Skill } from "./skills"

export interface Atributos{
    agi: number
    conc: number
    def: number
    str: number
    level: number
}
export interface InventorySlot{
    item: Item;
    qty: number;
}

export class Player{
    constructor(
        public readonly name: string,
        public atributos: Atributos,
        public limiteSkillActivas: number,
        public skills: Skill[],
        public quests: Quest[],
        public exp: number,
        public expLvlUp: number,
        public inventory: InventorySlot[],
        public gold: number = 0,
    ){}

    toggleSkills(id: string): Player{
        const numSkillActive = this.skills.filter((s)=> s.state === 'active').length;
        const changedSkill = this.skills.map((skill) =>{
            if(skill.id !== id) return skill;
            if(skill.state === 'bloqued') return skill;
            if(skill.state === 'inactive' && numSkillActive >= this.limiteSkillActivas) return skill;
            return new Skill(skill.id,skill.name, skill.description, skill.shortDesc, skill.type, skill.requirements, skill.state === 'active' ? 'inactive' : 'active');
        });
        return new Player(this.name, {...this.atributos}, this.limiteSkillActivas,changedSkill,this.quests,this.exp,this.expLvlUp,this.inventory)
    }

    unLockSkills(): Player{
        const changedSkill = this.skills.map((skill) =>{
            let newState = skill.state;

            if (skill.state === 'bloqued' && skill.unLock(this.atributos))
                newState = 'inactive';
            return new Skill(skill.id,skill.name, skill.description, skill.shortDesc, skill.type, skill.requirements, newState);
        });
        return new Player(this.name, {...this.atributos}, this.limiteSkillActivas,changedSkill,this.quests,this.exp,this.expLvlUp,this.inventory)
    }

    private removeFromInventory(slots: InventorySlot[], itemId: string, qty: number): InventorySlot[]{
        return slots
            .map(s => s.item.id === itemId ? {item: s.item, qty: Math.max(0, s.qty - qty)}: s)
            .filter(s => s.qty > 0);
    }


    public obtainItem(newItem: Item, qty: number = 1):Player{
        //comprobar si ya tenemos uno de este objeto
        const slotIndex = this.inventory.findIndex(s=> s.item.id === newItem.id);
        //Copiar inventario con el nuevo objeto
        let newIventory: InventorySlot[];
        if(slotIndex >= 0)
            newIventory = this.inventory.map((s, idx) => idx === slotIndex ? {...s, qty: s.qty+ qty} : s)
        else
            newIventory = [...this.inventory, {item: newItem, qty}];

        //Construir el update para las misiones
        const data: UpdateData ={
            type: 'collection',
            id: newItem.id,
            amount: qty
        }
        //Actualizar las misiones (inmutablemente)
        const newQuests = this.quests.map(q=> {
            q.updateProgress(data);
            if(q.completed){
                //Lógica de misión completada
            }
            return q;
        })

        //devolver el jugador actualizado
        return new Player
            (this.name,
            {...this.atributos},
            this.limiteSkillActivas,
            this.skills,
            newQuests,
            this.exp,
            this.expLvlUp,
            newIventory);
    }
}