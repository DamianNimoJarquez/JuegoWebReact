import { useState } from "react";
import { Equipable } from "../components/models/items/equipable";
import { Item } from "../components/models/items/item";
import { ListItems } from "./createDatas";
import { createItem } from "./createItem";
import InventoryModal from "../components/modal/IventoryModal/InventoryModa";
import { Player } from "../components/models/player/player";
import { EquipmentSlots } from "../components/models/player/type";
import { Consumable } from "../components/models/items/consumable";

interface PruebasProps{
    onObtainItem: (item: Item, qty: number) => void;
    onEquipeItem: (item: Equipable) => void;
    onUnEquipItem: (item: Equipable) =>void;
    jugador: Player;
}
const Pruebas = ({onObtainItem,onEquipeItem,jugador, onUnEquipItem}: PruebasProps) => {
    const [showInventory, setShowInventory] = useState(false);
    const openInventory = () => setShowInventory(true);
    const closeInventory = () => setShowInventory(false);
    // Dummy callbacks para pruebas
    const handleUse = (item: Consumable) => {
        console.log("Usar dummy:", item);
    };
    return ( 
        <>
        <div className="panel-central z-50 gap-4">
            <button 
            className=" cursor-pointer bg-cyan-900 text-white rounded-2xl p-3 hover:bg-cyan-500 hover:font-bold"
            onClick={() =>onObtainItem(createItem(ListItems.consumable.pocion_salud),5)}
            >Agregar items</button>
            <button
            className=" cursor-pointer bg-cyan-900 text-white rounded-2xl p-3 hover:bg-cyan-500 hover:font-bold"
            onClick={()=>onEquipeItem(createItem(ListItems.weapon.espada_corta) as Equipable)}
            >Add Equipo</button>
            <button
            className=" cursor-pointer bg-cyan-900 text-white rounded-2xl p-3 hover:bg-cyan-500 hover:font-bold"
            onClick={openInventory}
            >Iventario</button>
            <InventoryModal open={showInventory} onClose={closeInventory} inventory={jugador.inventory} equipment={jugador.equipment as EquipmentSlots} onEquip={onEquipeItem} onUnequip={onUnEquipItem} onUse={handleUse} />
        </div>
        </>
     );
}
 
export default Pruebas;