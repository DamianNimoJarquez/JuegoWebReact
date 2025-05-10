import { Quest } from "../models/quests/quest";

interface QuestCardPromps{
    quest: Quest
}
const QuestCard = ({quest}: QuestCardPromps ) => {
    
    return ( 
        <>
            <div key={quest.id} className={`quest-${quest.typequest} group relative`}>
                <div className="font-bold">{quest.name}</div>
                <div className="w-full border-t border-gray-300 my-2"></div>
                <div className="text-[rgba(255,255,255,0.66)] text-sm">{quest.steps[quest.currentStepIndex].description}</div>
            </div>
        </>
     );
}
 
export default QuestCard;