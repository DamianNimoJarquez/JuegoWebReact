import { Consumable } from "../../models/items/consumable";
import { Equipable } from "../../models/items/equipable";
import { InventorySlot } from "../../models/player/type";
import { TabKey } from "./types";

interface InventoryActionMenuProps{
    slot: InventorySlot;
    activeTab: TabKey;
    onEquip: (item: Equipable)=>void;
    onUnequip: (item: Equipable)=>void;
    onUse: (item: Consumable)=>void;
    onClose: ()=>void;
}
//Menú de opciones
const InventoryActionMenu = ({slot,activeTab,onEquip,onUnequip,onUse,onClose}: InventoryActionMenuProps) => {
    const {item, } = slot;
    //determinar opciones
    const isEquipeTab = ['weapon', 'armor', 'accessory'].includes(activeTab);
    const isEquipeedTab = activeTab === 'equipped';
    const isUsableTab = ['consumable','key'].includes(activeTab) && (item as any).usable;
    const handleEquip = () =>{
        onEquip(item as Equipable);
        onClose();
    }
    const handleUnequip = ()=>{
        onUnequip(item as Equipable);
        onClose();
    }
    const handleUse = () =>{
        onUse(item as Consumable);
        onClose();
    }
    return ( 
        <>
            <div className="actionInventoryOpciones">
                <div className="mb-2 font-semibold text-center">Acciones:</div>
                <div className="flex flex-col space-y-2">
                    {isEquipeTab && (
                        <button className="botonOpcionesIventario" onClick={handleEquip}>Equipar</button>
                    )}
                    {isEquipeedTab &&(
                        <button className="botonOpcionesIventario bg-red-600" onClick={handleUnequip}>Desequipar</button>
                    )}
                    {isUsableTab &&(
                        <button className="botonOpcionesIventario bg-green-600" onClick={handleUse}>Usar</button>
                    )}
                    <button className="botonOpcionesIventario bg-gray-500" onClick={handleUnequip}>Cancelar</button>
                </div>
            </div>
        </> 
    );
}
 
export default InventoryActionMenu;