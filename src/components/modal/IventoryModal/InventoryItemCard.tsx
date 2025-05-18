import { Equipable } from "../../models/items/equipable";
import { InventorySlot } from "../../models/player/type";

interface ItemCardProps{
    slot: InventorySlot;
    onClick: (itemId: string)=>void;
}
const InventoryItemCard = ({slot, onClick}:ItemCardProps) => {
    const {item, qty} = slot;
    const statsMap = (item as Equipable).stats;
    const filteredStas = statsMap ? Object.entries(statsMap).filter(([,v]) => typeof v === 'number' && v!==0): null;
    const statsDisplay = filteredStas ? filteredStas.map(([k, v]) => `${k.toUpperCase()}: ${v > 0 ? '+' : ''}${v}`).join('  '): '';
    return ( 
        <>
            <div className="gridInventoryCard" onClick={()=>onClick(item.id)}>
                <div>
                    <strong>{item.name}</strong>
                    <div className="text-sm text-gray-600">{item.info}</div>
                </div>
                <div className="flex items-center">{statsDisplay}</div>
                <div className="text-center font-semibold">x{qty}</div>
            </div>
        </>
     );
}
 
export default InventoryItemCard;