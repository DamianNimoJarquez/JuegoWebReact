import React from "react";
import { Player } from "../models/player/player";
import StatusPanel from "./StatusPanel";

interface PanelUiProps{
    display: boolean;
    jugador: Player;
}
const PanelUi = ({display, jugador}: PanelUiProps) => {
    // Calcular modificaciones de atributos por equipo
    const equipmentModifiers = Object.values(jugador.equipment).reduce(
        (acc: Record<string, number>, item) => {
            if (!item) return acc;
            const stats = (item as any).stats as Record<string, number>;
            Object.entries(stats).forEach(([key, val]) => {
                acc[key] = (acc[key] || 0) + val;
            });
            return acc;
        }, {}
    );
    console.log(equipmentModifiers);
    return ( 
        <>
            <div className="color-panel-ui"></div>
            {/* UI --> */}
            <div className="panel-ui overflow-auto">
                { display && (
                    <>
                        <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-4 w-full h-full">
                            <StatusPanel
                                hp={jugador.hp} maxHp={jugador.maxHp}
                                mp={jugador.mp} maxMp={jugador.maxMp}
                                exp={jugador.exp} expLvlUp={jugador.expLvlUp}
                                Pname={jugador.name} level={jugador.level}
                                />
                            {/* <div className="p-4 box-border min-w-0">
                                <div className="text-center font-bold">Estado:</div>
                                <div className="grid grid-cols-2 gap-0 mb-2">
                                    
                                    <div className="text-center font-semibold">Nombre:</div>
                                    <div className="text-center font-semibold">Nivel:</div>

                                    
                                    <div className="text-center">{jugador.name}</div>
                                    <div className="text-center">{jugador.atributos.level}</div>
                                </div>
                                <div className="flex justify-between items-center gap-1">
                                    <p className="text-right w-1/3">Vida:</p>
                                    <div className="w-2/3 flex justify-center">
                                        <div className="relative w-full h-4 bg-gray-600 rounded overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full bg-green-500 transition-all  duration-200"
                                                style={{
                                                width: `${(jugador.hp / jugador.maxHp) * 100}%`
                                                }}
                                            ></div>
                                        
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold pointer-events-none">
                                                {jugador.hp} / {jugador.maxHp}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-1">
                                    <p className="text-right w-1/3">Mana:</p>
                                    <div className="w-2/3 flex justify-center">
                                        <div className="relative w-full h-4 bg-gray-600 rounded overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full bg-blue-500 transition-all  duration-200"
                                                style={{
                                                width: `${(jugador.mp / jugador.maxMp) * 100}%`
                                                }}
                                            ></div>
                                        
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold pointer-events-none">
                                                {jugador.mp} / {jugador.maxMp}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-1">
                                    <p className="text-right w-1/3">Exp:</p>
                                    <div className="w-2/3 flex justify-center">
                                        <div className="relative w-full h-4 bg-gray-600 rounded overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full bg-yellow-500 transition-all  duration-200"
                                                style={{
                                                width: `${(jugador.exp / jugador.expLvlUp) * 100}%`
                                                }}
                                            ></div>
                                        
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold pointer-events-none">
                                                {jugador.exp} / {jugador.expLvlUp}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="p-4 box-border min-w-0">
                                {/* Título centrado */}
                                <div className="text-center font-bold">Atributos:</div>
                                {/* Wrapper flex que centra el grid */}
                                <div className="mt-2 flex justify-center">
                                    {/* Un solo grid para todas las entradas */}
                                    <div className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                                        {Object.entries(jugador.atributos)
                                            .filter(([key]) => key !== 'level')
                                            .map(([key, val]) => {
                                                const mod = equipmentModifiers[key] || 0;
                                                const total = val + mod;
                                                let colorClass = '';
                                                if(mod > 0) colorClass = 'text-green-500 font-semibold';
                                                else if(mod < 0) colorClass = 'text-red-500 font-semibold';
                                                return (
                                                <React.Fragment key={key}>
                                                    {/* Columna etiqueta, alineada a la derecha */}
                                                    <div className="text-right font-semibold capitalize">{key}:</div>
                                                    {/* Columna valor */}
                                                    <div className={colorClass}>
                                                        {total}
                                                        {mod !== 0 && (<span className="ml-1 text-sx">
                                                            ({mod > 0 ? '+': '-'}{mod})
                                                        </span>)}
                                                    </div>
                                                </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 box-border min-w-0">
                                <div className="text-center font-bold">Equipo:</div>
                                <div className="mt-2 flex justify-center">
                                    <div className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                                        {Object.entries(jugador.equipment)
                                        .map(([key, val])=> (
                                            <React.Fragment key={key}>
                                                <div className="text-right font-semibold">{key}:</div>
                                                <div className={val ? 'text-green-500 font-semibold text-sx' : ''}>
                                                    {val ? val.name : 'Nada'}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 box-border min-w-0">
                                <div className="text-center font-bold">Botones:</div> 
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="color-panel-ui"></div>
        </>
     );
}
 
export default PanelUi;