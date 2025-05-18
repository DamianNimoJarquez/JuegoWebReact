import { Fragment } from "react/jsx-runtime";
import { EquipmentSlots } from "../models/player/type";

interface EquipmentPanelProps{
    equipment: EquipmentSlots;
}
const EquipmentPanel = ({equipment}:EquipmentPanelProps) => {
    return ( 
        <>
        <div className="p-4 box-border min-w-0">
            <div className="text-center font-bold">Equipo:</div>
            <div className="mt-2 flex justify-center">
                <div className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                    {Object.entries(equipment)
                    .map(([key, val])=> (
                        <Fragment key={key}>
                            <div className="text-right font-semibold">{key}:</div>
                            <div className={val ? 'text-green-500 font-semibold text-sx' : ''}>
                                {val ? val.name : 'Nada'}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
        </>
     );
}
 
export default EquipmentPanel;