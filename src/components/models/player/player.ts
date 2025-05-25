import { Consumable } from "../items/consumable"
import { Equipable } from "../items/equipable"
import { Item } from "../items/item"
import { KeyItems } from "../items/keyitems"
import { Quest } from "../quests/quest"
import { UpdateData } from "../quests/types"
import { Skill } from "../skills"
import { Atributos, EquipmentSlots, InventorySlot } from "./type"



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
        public equipment: EquipmentSlots = {
            weapon: null,
            armor: null,
            accessory: null,
        },
        public hp: number = 10,
        public maxHp: number = 100,
        public mp: number = 20,
        public maxMp: number = 50,
        public level: number = 1,
    ){}

    toggleSkills(id: string): Player{
        const numSkillActive = this.skills.filter((s)=> s.state === 'active').length;
        const changedSkill = this.skills.map((skill) =>{
            if(skill.id !== id) return skill;
            if(skill.state === 'bloqued') return skill;
            if(skill.state === 'inactive' && numSkillActive >= this.limiteSkillActivas) return skill;
            return new Skill(skill.id,skill.name, skill.description, skill.shortDesc, skill.type, skill.requirements, skill.state === 'active' ? 'inactive' : 'active');
        });
        return new Player(this.name, {...this.atributos}, this.limiteSkillActivas,changedSkill,this.quests,this.exp,this.expLvlUp,this.inventory,this.gold,this.equipment,this.hp,this.maxHp,this.mp,this.maxMp,this.level)
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

    public equipItem(item: Equipable): Player{
        //Desequipar
        //asignar por categoría
        const slot = item.category as keyof EquipmentSlots;
        //clonar inventario y slots
        const newIventory = [...this.inventory];
        const newEquipament = {...this.equipment};
        //Si ya había algo devolverlo al inventario
        const prev = newEquipament[slot];
        if(prev){
            prev.equipped = false;
            const idx = newIventory.findIndex(s => s.item.id == prev.id);
            if(idx >= 0)
                newIventory[idx].qty++;
            else
                newIventory.push({item: prev, qty: 1});
        }
        //Equipar
        //quitar 1 unidad del item del inventario.
        const idx = newIventory.findIndex(s => s.item.id == item.id);
        if(idx >= 0){
            newIventory[idx].qty--;
            if(newIventory[idx].qty<=0)
                newIventory.splice(idx,1);
        }
        //Equipar el item
        item.equipped = true;
        newEquipament[slot] = item;

        return new Player(
            this.name,this.atributos,this.limiteSkillActivas,this.skills,this.quests,this.exp,
            this.expLvlUp,newIventory,this.gold,newEquipament,this.hp,this.maxHp,this.mp,this.maxMp,this.level
        );
    }

    public unEquip(item: Equipable): Player{
        const slot = item.category as keyof EquipmentSlots;
        const newIventory = [...this.inventory];
        const newEquipament = {...this.equipment};
        const prev = newEquipament[slot];
        if(prev){
            prev.equipped = false;
            const idx = newIventory.findIndex(s => s.item.id == prev.id);
            if(idx >= 0)
                newIventory[idx].qty++;
            else
                newIventory.push({item: prev, qty: 1});
        }
        newEquipament[slot] = null;
        return new Player(
            this.name,this.atributos,this.limiteSkillActivas,this.skills,this.quests,this.exp,
            this.expLvlUp,newIventory,this.gold,newEquipament,this.hp,this.maxHp,this.mp,this.maxMp,this.level
        );
    }
    public useItem(item: Consumable | KeyItems): Player{
        const newIventory = [...this.inventory];
        const idx = newIventory.findIndex(s => s.item.id == item.id);
        if(item.category=='consumable'){
            if(idx >=0 && --newIventory[idx].qty <= 0)
                newIventory.splice(idx,1);
            this.hp = Math.min(this.maxHp, this.hp + ((item as Consumable).hpRecovered || 0));
            this.mp = Math.min(this.maxMp, this.mp + ((item as Consumable).mpRecovered || 0));
        }
        if(item.action){
            item.usable=false;
            return item.action(this);
        }
        return new Player(
            this.name,this.atributos,this.limiteSkillActivas,this.skills,this.quests,this.exp,
            this.expLvlUp,newIventory,this.gold,this.equipment,this.hp,this.maxHp,this.mp,this.maxMp,this.level
        );
    }

    public addSkill(skill: Skill): Player{
        this.skills = [...this.skills, skill];
        return this.unLockSkills()
    }
    
}


