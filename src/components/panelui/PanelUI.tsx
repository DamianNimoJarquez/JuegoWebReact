import { Player } from "../models/player/player";
import StatusPanel from "./StatusPanel";
import { useEquipmentModifiers } from "../../hooks/useEquipMod";
import AttributesPanel from "./AttributesPanel";
import EquipmentPanel from "./EquipmentPanel";
import Pruebas from "../../utils/Pruebas";
import { Item } from "../models/items/item";
import { Equipable } from "../models/items/equipable";

interface PanelUiProps{
    display: boolean;
    jugador: Player;
    onObtainItem: (item: Item, qty: number) => void;
    onEquipeItem: (item: Equipable) => void;
    onUnEquipItem: (item: Equipable) => void;
}
const PanelUi = ({display, jugador, onObtainItem, onEquipeItem, onUnEquipItem}: PanelUiProps) => {
    const equipmentModifiers = useEquipmentModifiers(jugador.equipment);
    return ( 
        <>
            <div className="color-panel-ui flex justify-center items-center">
                <Pruebas onObtainItem={onObtainItem} onEquipeItem={onEquipeItem} jugador={jugador} onUnEquipItem={onUnEquipItem} />
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
            <div className="color-panel-ui flex items-center">
                {display && (<button className="cursor-pointer bg-amber-200 rounded-full p-2">Inventario</button>)}
            </div>
        </>
     );
}
 
export default PanelUi;