import { useCallback, useState } from "react";
import { Player } from "../components/models/player";


export function usePlayer(inicial: Player){
    const [jugador, setJugador] = useState<Player>(inicial);
    //Callback para alternar las habilidades
    const onToggleSkill = useCallback((skillId: string) =>{
        setJugador(prev => prev.toggleSkills(skillId));
    },[])

    return {jugador, onToggleSkill};
}