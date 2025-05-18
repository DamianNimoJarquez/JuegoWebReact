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
    const selectedSlot = selectedItemId ? inventory.find(slot => slot.item.id == selectedItemId): null;
    return (
        <>
            <ModalGlobal open={open} onClose={onClose} disableClose={locked}>
                <InventoryTabsModal<TabKey> tabs={ALL_TABS} active={activeTab} onChange={changeTab} locked={locked} />
                <div className="mt-4">
                    <InventoryItemGrid inventory={inventory} equipment={equipment} activeTab={activeTab} onSelectItem={selectItem} />
                </div>
                {selectedSlot && (
                    <InventoryActionMenu slot={selectedSlot} activeTab={activeTab} onEquip={onEquip} onUnequip={onUnequip} onUse={onUse} onClose={closeMenu} />
                )}
            </ModalGlobal>
        </>
    )
}
 
export default InventoryModal;