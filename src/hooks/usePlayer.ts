import { useCallback, useState } from "react";
import { Player } from "../components/models/player/player";
import { Item } from "../components/models/items/item";
import { Equipable } from "../components/models/items/equipable";
import { Consumable } from "../components/models/items/consumable";
import { KeyItems } from "../components/models/items/keyitems";


export function usePlayer(inicial: Player){
    const [jugador, setJugador] = useState<Player>(inicial);
    //Callback para alternar las habilidades
    const onToggleSkill = useCallback((skillId: string) =>{
        setJugador(prev => prev.toggleSkills(skillId));
    },[])
    //Callback para obtener objetos
    const obtainItem = useCallback((item: Item, qty: number) =>{
        setJugador(prev => prev.obtainItem(item, qty));
    },[])
    //Calback para equipar item
    const equipeItem = useCallback((item: Equipable)=>{
        setJugador(prev => prev.equipItem(item));
    },[])
    //Callback para desequipar item
    const unEquipItem = useCallback((item: Equipable)=>{
        setJugador(prev => prev.unEquip(item));
    },[])
    const useItem = useCallback((item: Consumable | KeyItems) =>{
        setJugador(prev => prev.useItem(item));
    },[]);

    return {jugador, onToggleSkill, obtainItem, equipeItem, unEquipItem, useItem};
}