import { useCallback, useState } from "react";
import { Player } from "../components/models/player/player";
import { Item } from "../components/models/items/item";
import { Equipable } from "../components/models/items/equipable";


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

    return {jugador, onToggleSkill, obtainItem, equipeItem};
}