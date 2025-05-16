import { useState } from "react";
import QuestCard from "./QuestCard";
import Modal from "./Modal";
import { Quest } from "../models/quests/quest";
import { InventorySlot } from "../models/player/player";

interface PanelQuestProps{
    quests: Quest[];
    inventory: InventorySlot[];
}

const PanelQuests = ({quests, inventory}: PanelQuestProps) => {

    const [openmodal, setOpenmodal] = useState<boolean>(false);
    const onGoingQuests = quests.filter((q)=> q.completed === false);
    
    return ( 
        <>
        <div className="paneles-laterales">
            <div className="sticky top-0 z-20 w-full shadow-md ">
                <button className="bg-[#0f0f0f] py-3 text-center w-full h-full cursor-pointer" onClick={()=>setOpenmodal(true)}>Misiones:</button>
            </div>
            {quests.length > 0 && (<>
                <Modal open={openmodal} onClose={() => setOpenmodal(false)} quests={quests} inventory={inventory}/>
                {quests.map(mision =>(
                    <QuestCard key={mision.id} quest={mision} />
                ))}
                </>
            )}
            {Array.from({length: 100}).map((_,i)=>(
                <div key={i} className="h-[50px]">elem {i}</div>
            ))}
        </div>
        </>
     );
}
 
export default PanelQuests;