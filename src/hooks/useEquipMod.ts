import { useMemo } from "react";
import { EquipmentSlots, InventorySlot } from "../components/models/player/type";
import { Equipable } from "../components/models/items/equipable";

export function useEquipmentModifiers(equipment: EquipmentSlots){
    return useMemo(()=>{
        const mods: Record<string, number> = {};
        Object.values(equipment).forEach(slot => {
            if (!slot) return;// salto si está vacío
            const stats = (slot as Equipable).stats ?? {};
            Object.entries(stats).forEach(([key, val]) => {
                if (typeof val === 'number' && val !== 0) {
                mods[key] = (mods[key] || 0) + val;
                }
            });
        });

        return mods;
    },[equipment]);
}