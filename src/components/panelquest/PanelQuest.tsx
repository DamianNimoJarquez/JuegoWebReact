import { getmisiones } from "../../utils/createQuestTests";
import QuestCard from "./QuestCard";

const PanelQuests = () => {
    /**
     * Crear misiones de pruebas para 
     */
    const misiones = getmisiones();
    return ( 
        <>
        <div className="paneles-laterales">
            <div className="flex-none">Misiones:</div>
            {misiones.length > 0 && (
                misiones.map(mision =>(
                    <QuestCard key={mision.id} quest={mision} />
                ))
            )}
            {Array.from({length: 100}).map((_,i)=>(
                <div key={i} className="h-[50px]">elem {i}</div>
            ))}
        </div>
        </>
     );
}
 
export default PanelQuests;