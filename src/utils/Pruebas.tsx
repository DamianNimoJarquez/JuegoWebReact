import { useState } from "react";
import { Equipable } from "../components/models/items/equipable";
import { Item } from "../components/models/items/item";
import { ListItems } from "./createDatas";
import { createItem } from "./createItem";
import InventoryModal from "../components/modal/IventoryModal/InventoryModa";
import { Player } from "../components/models/player/player";
import { EquipmentSlots } from "../components/models/player/type";
import { Consumable } from "../components/models/items/consumable";
import { KeyItems } from "../components/models/items/keyitems";

interface PruebasProps{
    onObtainItem: (item: Item, qty: number) => void;
    onEquipeItem: (item: Equipable) => void;
    onUnEquipItem: (item: Equipable) =>void;
    onUseItem: (item: Consumable| KeyItems) => void;
    jugador: Player;
}
const Pruebas = ({onObtainItem,onEquipeItem,jugador, onUnEquipItem, onUseItem}: PruebasProps) => {
    const [showInventory, setShowInventory] = useState(false);
    const openInventory = () => setShowInventory(true);
    //const closeInventory = () => setShowInventory(false);
    // Tutorial
    const tutorialSteps = [
        "Por favor, equipa un arma desde la pestaña \"Weapon\".",
        "¡Perfecto! Ahora cierra el inventario para continuar.",
    ];
    const [tutorialStep, setTutorialStep] = useState<number>(-1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const startTutorial = () => {
        setTutorialStep(0);
        setShowInventory(true);
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };
     const handleEquip = (item: Equipable) => {
        console.log("onEquip callback:", item.id);
        onEquipeItem(item);

        // si estábamos en el paso 0, avanzamos al 1 y abrimos diálogo
        if (tutorialStep === 0) {
        setTutorialStep(1);
        setDialogOpen(true);
        }
    };
    const closeInventory = () => {
        setShowInventory(false);
        // si hemos terminado el paso 1, cerramos tutorial
        if (tutorialStep === 1) {
        setTutorialStep(-1);
        }
    };
    return ( 
        <>
        <div className="panel-central z-0 gap-4">
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
            <InventoryModal
                open={showInventory}
                onClose={closeInventory}
                inventory={jugador.inventory}
                equipment={jugador.equipment as EquipmentSlots}
                onEquip={handleEquip}
                onUnequip={onUnEquipItem}
                onUse={onUseItem}
                tutorialConfig={{lockedTab: "weapon", onItemClick: () => {}, onActionComplete: () => {} }}
            />
        </div>
        </>
     );
}
 
export default Pruebas;