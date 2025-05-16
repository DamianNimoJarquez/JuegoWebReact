import { useEffect, useState } from "react";
import { Quest } from "../models/quests/quest";
import { CompositeObjective } from "../models/quests/compositeObjective";
import { getItems } from "../../utils/createDatas";
import { InventorySlot } from "../models/player/type";

interface ModalProps{
    open: boolean;
    onClose: () => void;
    quests: Quest[];
    inventory: InventorySlot[]
    disableClose?: boolean
}
const Modal = ({open, onClose, quests, disableClose = false, inventory}: ModalProps) => {
    
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const selectedQuest = quests[selectedIndex];
    const currentStep = selectedQuest.steps[selectedQuest.currentStepIndex]
    const obj = currentStep.objective;
    const required = obj.required ?? 0;
    let amountInv = 0;
    if(obj.type === 'collection')
        amountInv = inventory.find(slot => slot.item.id === (obj as any).targetId)?.qty ?? 0;
    
    useEffect(()=>{
        if (!open || disableClose) return;
        const onKey = (e: globalThis.KeyboardEvent)=>{
            if(e.key === "Escape" && open && !disableClose) onClose();
        };
        document.addEventListener('keydown',onKey);
        return () => document.removeEventListener('keydown',onKey);
    },[open, disableClose, onClose]);
    
    const handleCloseModal = () =>{
        if(!disableClose) onClose();
    }
    if (!open) return null;
    return ( 
        <>
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50"
            onClick={handleCloseModal}
            >
            <div
                className="relative flex flex-col bg-white dark:bg-[#1E1E2F] w-[80%] max-w-5xl h-[80vh] p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
                >
                <button className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer" onClick={handleCloseModal}>X</button>
                <div className="flex flex-1 overflow-hidden">
                    <div className=" bg-[rgba(101,179,142,0.6)] w-[30%] p-4 border-t border-l border-b text-right overflow-auto text-xs sm:text-sm md:text-base" style={{maxHeight: `calc(80vh - 2rem)`}}>
                        <h2 className="text-center text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Misiones:</h2>
                        <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3 border-b-4"></div>
                        <ul>
                            {quests.length > 0 && (
                                quests.map((q, idx) =>(
                                    <li
                                        key={q.id}
                                        className={`cursor-pointer py-2 px-2 mb-1 rounded-bl-full ${idx === selectedIndex ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
                                        onClick={() => setSelectedIndex(idx)}
                                        >
                                            {q.name}
                                        </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="w-2 bg-[rgb(255,255,255,0.6)] mx-0"></div>
                    <div className="bg-[rgba(83,131,175,0.6)] w-[70%] p-4 border-t border-r border-b overflow-auto text-xs sm:text-sm md:text-base" style={{maxHeight: `calc(80vh - 2rem)`}}>
                        <h1 className="text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center">Descripción:</h1>
                        <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3 border-b-4"></div>
                        <p className="mb-4">{selectedQuest.description}</p>
                        <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3"></div>
                        <div className="mb-4">
                            <h3 className="font-semibold">Estado:</h3>
                            <p className="mb-4">{selectedQuest.completed ? "Completada": "En curso"}</p>
                            <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3"></div>
                            <h3 className="font-semibold">Tipo de misión:</h3>
                            <p className="">
                                {selectedQuest.typequest === 'main' ? "Principal" : "Secundaria"}
                            </p>
                            <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3"></div>
                            
                            <h3 className="font-semibold">Paso Actual:</h3>
                            {obj.type === 'collection' ? (
                                <p>
                                    {selectedQuest.steps[selectedQuest.currentStepIndex].description} - {amountInv} / {required}
                                </p>
                            ): obj.type === 'composite' ? (
                                (obj as CompositeObjective).objectives.map((sub, i) =>{
                                    const req = sub.required;
                                    const haveSub = inventory.find(s => s.item.id === (sub as any).targetId)?.qty ?? 0;
                                    const itemName = getItems().find(s => s.id === (sub as any).targetId)?.name ?? ""
                                    return (
                                        <p key={i}>
                                            {itemName !== '' ? itemName : sub.type} {sub.required} - {haveSub} / {req}
                                        </p>
                                    );
                                })
                            ): (
                                <p>{currentStep.description}</p>
                            )}
                            <div className="w-full border-t border-[rgb(255,255,255,0.6)] my-3"></div>
                            <div>
                                <h3 className="font-semibold">Recompnesas:</h3>
                                <ul className="list-disc list-inside">
                                    {Object.entries(selectedQuest.reward).map(([key, val]) =>(
                                        <li key={key}>
                                            {key}: {val}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Modal;