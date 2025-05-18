import React from "react";
import { Atributos } from "../models/player/type";

interface AttributesProps { 
    atributos: Atributos; 
    modifiers: Record<string, number>; 
}
const atributoLabels: Record<keyof Atributos, string> = {
  str: 'Fuerza',
  def: 'Defensa',
  agi: 'Agilidad',
  conc: 'Con'
};

const AttributesPanel = ({atributos, modifiers}: AttributesProps) => {
    const orderedKeys: (keyof Atributos)[] = ['str', 'def', 'agi', 'conc'];
    return ( 
        <>
        <div className="p-4 box-border min-w-0">
            <div className="text-center font-bold">Atributos:</div>
            <div className="mt-2 flex justify-center">
                <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-1">
                    {orderedKeys.map((key)=>{
                        const val = atributos[key];
                        const mod = modifiers[key] || 0;
                        const total = val+mod;
                        const color = mod > 0 ? 'text-green-500 font-semibold': mod < 0 ? 'text-red-500 font-semibold': 'text-center';
                        return (
                            <React.Fragment key={key}>
                                <div className="text-right font-semibold capitalize">{atributoLabels[key]}:</div>
                                <div className={`${color}`}>
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