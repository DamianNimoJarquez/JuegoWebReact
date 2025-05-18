import { useState } from "react";
import { TabKey } from "./types";

export function useIventoryModal( initialTab: TabKey, tutorialLockedTab?: TabKey){
    //Pestaña activa o bloqueada si estamos en tutorial
    const [activeTab, setActiveTab] = useState<TabKey>(tutorialLockedTab ?? initialTab);
    //Id del item seleccionado para abrir el menú de acciones
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    //Cambiar pestaña controlando si está bloqueada en el tutorial
    function changeTab(tab: TabKey){
        if(!tutorialLockedTab){
            setActiveTab(tab);
            setSelectedItemId(null);
        }
    }
    //Marcar un item como seleccionado
    function selectItem(itemId: string){setSelectedItemId(itemId);}
    //Cerar el menú de opciones del item
    function closeMenu(){setSelectedItemId(null);}

    return {activeTab, changeTab, selectedItemId, selectItem, closeMenu};
}