import { Player } from "../models/player/player";
import StatusPanel from "./StatusPanel";
import { useEquipmentModifiers } from "../../hooks/useEquipMod";
import AttributesPanel from "./AttributesPanel";
import EquipmentPanel from "./EquipmentPanel";
import Pruebas from "../../utils/Pruebas";
import { Item } from "../models/items/item";
import { Equipable } from "../models/items/equipable";
import { Consumable } from "../models/items/consumable";
import { KeyItems } from "../models/items/keyitems";
import { useState } from "react";
import InventoryModal from "../modal/IventoryModal/InventoryModa";
import { EquipmentSlots } from "../models/player/type";

interface PanelUiProps{
    display: boolean;
    jugador: Player;
    onObtainItem: (item: Item, qty: number) => void;
    onEquipeItem: (item: Equipable) => void;
    onUnEquipItem: (item: Equipable) => void;
    onUseItem: (item: Consumable| KeyItems) => void;
}
const PanelUi = ({display, jugador, onObtainItem, onEquipeItem, onUnEquipItem, onUseItem}: PanelUiProps) => {
    const equipmentModifiers = useEquipmentModifiers(jugador.equipment);
    const [showInventory, setShowInventory] = useState(false);
    const openInventory = () => setShowInventory(true);
    const closeInventory = () => setShowInventory(false);
    return ( 
        <>
            <div className="color-panel-ui flex justify-center items-center">
                <Pruebas onObtainItem={onObtainItem} onEquipeItem={onEquipeItem} jugador={jugador} onUnEquipItem={onUnEquipItem} onUseItem={onUseItem} />
            </div>
            <div className="panel-ui overflow-auto">
                { display && (
                    <>
                        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4 w-full h-full">
                            <StatusPanel
                                hp={jugador.hp} maxHp={jugador.maxHp}
                                mp={jugador.mp} maxMp={jugador.maxMp}
                                exp={jugador.exp} expLvlUp={jugador.expLvlUp}
                                Pname={jugador.name} level={jugador.level}
                                />
                            <AttributesPanel atributos={jugador.atributos} modifiers={equipmentModifiers} />
                            <EquipmentPanel equipment={jugador.equipment} />
                        </div>
                    </>
                )}
            </div>
            <div className="color-panel-ui grid grid-cols-1 grid-rows-2 text-white gap-0">
                {display && (<>
                    <div className=" self-center">
                        <p className="font-semibold">Gold: <span className="text-amber-300">{jugador.gold}</span></p>
                    </div>
                    <div className="mt-[-28px]">
                    <button className="cursor-pointer bg-amber-200 rounded-full p-2 text-black place-self-start" onClick={openInventory}>
                        Inventario</button>
                        
                    </div>
                    </>)}
                <InventoryModal open={showInventory} onClose={closeInventory} inventory={jugador.inventory} equipment={jugador.equipment as EquipmentSlots} onEquip={onEquipeItem} onUnequip={onUnEquipItem} onUse={onUseItem} />
            </div>
        </>
     );
}
 
export default PanelUi;