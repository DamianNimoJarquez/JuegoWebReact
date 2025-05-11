import { useCallback, useState } from "react";
import { Player } from "../components/models/player";
import { Item } from "../components/models/items/item";


export function usePlayer(inicial: Player){
    const [jugador, setJugador] = useState<Player>(inicial);
    //Callback para alternar las habilidades
    const onToggleSkill = useCallback((skillId: string) =>{
        setJugador(prev => prev.toggleSkills(skillId));
    },[])

    const obtainItem = useCallback((item: Item, qty: number) =>{
        setJugador(prev => prev.obtainItem(item, qty));
    },[])

    return {jugador, onToggleSkill, obtainItem};
}