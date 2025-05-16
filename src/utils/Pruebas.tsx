import { Equipable } from "../components/models/items/equipable";
import { Item } from "../components/models/items/item";
import { ListItems } from "./createDatas";
import { createItem } from "./createItem";

interface PruebasProps{
    onObtainItem: (item: Item, qty: number) => void;
    onEquipeItem: (item: Equipable) => void;
}
const Pruebas = ({onObtainItem,onEquipeItem}: PruebasProps) => {
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
                
        </div>
        </>
     );
}
 
export default Pruebas;