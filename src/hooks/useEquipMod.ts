import { useMemo } from "react";
import { EquipmentSlots } from "../components/models/player/type";

export function useEquipmentModifiers(equipment: EquipmentSlots){
    return useMemo(()=>{
        return Object.values(equipment).reduce((acc,item) =>{
            if(!item) return acc;
            for(let [k,v] of Object.entries(item.stats || {}))
                acc[k] = (acc[k] || 0) + v;
            return acc;
        }, {} as Record<string,number>)
    },[equipment]);
}