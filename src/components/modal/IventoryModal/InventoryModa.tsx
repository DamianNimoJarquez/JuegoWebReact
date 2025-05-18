import { Consumable } from "../../models/items/consumable";
import { Equipable } from "../../models/items/equipable";
import { EquipmentSlots, InventorySlot } from "../../models/player/type";
import ModalGlobal from "../ModalGlobal";
import InventoryActionMenu from "./InventoryActionMenu";
import InventoryItemGrid from "./InventoryItemGrid";
import { InventoryTabsModal } from "./InventoryTabsModal";
import { TabKey } from "./types";
import { useIventoryModal } from "./useIventoryModal";

export interface InventoryModalProps{
    open: boolean;
    onClose: () => void;
    inventory: InventorySlot[];
    equipment: EquipmentSlots;
    onEquip: (item: Equipable) => void;
    onUnequip: (item: Equipable) => void;
    onUse: (item: Consumable) => void;
    tutorialConfig?:{
        lockedTab: TabKey;
        onItemClick: (item: InventorySlot) => void;
        unActionComplete: () =>void;
    }
}
const ALL_TABS: TabKey[] = [
  'equipped',
  'weapon',
  'armor',
  'accessory',
  'consumable',
  'key',
];

const InventoryModal = ({open, onClose, inventory, equipment, onEquip, onUnequip, onUse, tutorialConfig}: InventoryModalProps) =>{
    //Primer estado, pestaña activa y seleccionar un item
    const {activeTab, changeTab, selectedItemId,selectItem, closeMenu} = useIventoryModal('equipped', tutorialConfig?.lockedTab);
    const locked = Boolean(tutorialConfig?.lockedTab);
    // const selectedSlot = selectedItemId ? inventory.find(slot => slot.item.id == selectedItemId)?? Object.values(equipment).find(slot => slot.id == selectedItemId): null;
    let selectedSlot: InventorySlot | null = null;
    if (selectedItemId) {
        if (activeTab === "equipped") {
            // Buscamos directamente en equipment
            for (const raw of Object.values(equipment)) {
                if (!raw) continue;
                // Si ya es InventorySlot
                if ("item" in raw && raw.item.id === selectedItemId) {
                    selectedSlot = raw;
                    break;
                }
                // Si es Equipable
                if (!("item" in raw) && (raw as Equipable).id === selectedItemId) {
                    selectedSlot = { item: raw as Equipable, qty: 1 };
                    break;
                }
            }
        }
        // Si no lo encontramos en equipped (o tab ≠ equipped), lo buscamos en inventory
        if (!selectedSlot) {
            selectedSlot = inventory.find(s => s.item.id === selectedItemId) || null;
        }
    }
    return (
        <>
            <ModalGlobal open={open} onClose={onClose} disableClose={locked}>
                <InventoryTabsModal<TabKey> tabs={ALL_TABS} active={activeTab} onChange={changeTab} locked={locked} />
                <div className="mt-4 h-[300px] overflow-y-auto relative">
                    <InventoryItemGrid inventory={inventory} equipment={equipment} activeTab={activeTab} onSelectItem={selectItem} />
                    {selectedSlot && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
                         onClick={closeMenu} // si clicas fuera, cierra menú
                        >
                            <div onClick={e => e.stopPropagation()}>
                                <InventoryActionMenu slot={selectedSlot} activeTab={activeTab} onEquip={onEquip} onUnequip={onUnequip} onUse={onUse} onClose={closeMenu} />
                            </div>
                        </div>
                    )}

                </div>
                
            </ModalGlobal>
        </>
    )
}
 
export default InventoryModal;