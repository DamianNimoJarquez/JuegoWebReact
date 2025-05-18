import React from "react";
import { Atributos } from "../models/player/type";

interface AttributesProps { 
    atributos: Atributos; 
    modifiers: Record<string, number>; 
}
const AttributesPanel = ({atributos, modifiers}: AttributesProps) => {
    return ( 
        <>
        <div className="p-4 box-border min-w-0">
            <div className="text-center font-bold">Atributos:</div>
            <div className="mt-2 flex justify-center">
                <div className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                    {Object.entries(atributos).map(([key,val])=>{
                        const mod = modifiers[key] || 0;
                        const total = val+mod;
                        const color = mod > 0 ? 'text-green-500 font-semibold': mod < 0 ? 'text-red-500 font-semibold': '';
                        return (
                            <React.Fragment key={key}>
                                <div className="text-right font-semibold capitalize">{key}:</div>
                                <div className={color}>
                                    {total} {mod !== 0 && <small>({mod > 0 ? '+' : ''}{mod})</small>}
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
     );
}
 
export default AttributesPanel;