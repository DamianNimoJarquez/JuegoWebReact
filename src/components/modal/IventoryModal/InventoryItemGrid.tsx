import { EquipmentSlots, InventorySlot } from "../../models/player/type";
import InventoryItemCard from "./InventoryItemCard";
import { TabKey } from "./types";

interface InventoryItemGridProps{
    inventory: InventorySlot[];
    equipment: EquipmentSlots;
    activeTab: TabKey;
    onSelectItem: (itemId: string) => void;
}

const InventoryItemGrid = ({inventory, equipment, activeTab, onSelectItem}: InventoryItemGridProps) => {
    let slotsToShow: InventorySlot[] = [];
    if(activeTab === 'equipped'){
        slotsToShow = [];
        Object.values(equipment).forEach((slot) =>{if(slot) slotsToShow.push(slot);});
    }
    else
        slotsToShow = inventory.filter(s => s.item.category === activeTab);
    if(slotsToShow.length === 0){
        return (
            <div className="p-4 text-center text-gray-500">No hay items en esta categoría.</div>
        );
    }
    return ( 
        <>
            <div className="flex flex-col divide-y">
                {slotsToShow.map(slot =>(
                    <InventoryItemCard key={slot.item.id} slot={slot} onClick={onSelectItem} />
                ))}
            </div>
        </>
     );
}
 
export default InventoryItemGrid;