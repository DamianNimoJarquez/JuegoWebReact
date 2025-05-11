import { Item } from "../components/models/items/item";
import { ListItems } from "./createDatas";
import { createItem } from "./createItem";

interface PruebasProps{
    onObtainItem: (item: Item, qty: number) => void;
}
const Pruebas = ({onObtainItem}: PruebasProps) => {
    return ( 
        <>
        <div className="color-panel-ui"></div>
            {/* UI --> */}
            <div className="panel-ui">
                <button 
                className=" cursor-pointer bg-cyan-900 text-white rounded-2xl p-3 hover:bg-cyan-500 hover:font-bold"
                onClick={() =>onObtainItem(createItem(ListItems.consumable.pocion_salud),5)}
                >Agregar items</button>
            </div>
        <div className="color-panel-ui"></div>
        </>
     );
}
 
export default Pruebas;