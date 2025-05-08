import { useCallback, useEffect, useRef, useState } from "react";
import PanelCentral from "../panelcentral/PanelCentral";
import PanelInfo from "../panelinfo/PanelInfo";
import PanelQuests from "../panelquest/PanelQuest";
import PanelSkills from "../panelskills/PanelSkills";
import PanelUi from "../panelui/PanelUI";
import { Skill } from "../models/skills";
import ReactDOM from "react-dom";
import { Player } from "../models/player";
import { usePlayer } from "../../hooks/usePlayer";

const InterfaceJuego = () => {
  const [lugar, setLugar] = useState<string>("");
  const [zonalevel, setZonalevel] = useState<string>("");
  const [playerlevel, setPlayerlevel] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);

  /** Jugador */
  const jugadorInicial = new Player("name",{str:0,agi:0,conc:0,level:1,def:0},3,[],null,0,10);
  /**Crear skills para probar */
  jugadorInicial.skills.push(new Skill("i.toString()","Furigana","Permite ver furigana en los kanjis","Ver Furigana","Pasiva",{agi: 0,conc: 0,def: 0,str: 0,level: 1,},"active"));
  for(let i = 0; i < 2; ++i){
    const skill = new Skill(i.toString(),"Furigana","Permite ver furigana en los kanjis","Ver Furigana","Pasiva",
      {
        agi: 0,
        conc: 0,
        def: 0,
        str: 0,
        level: 1,
      },i%2 === 0 ? "inactive": "bloqued");
      jugadorInicial.skills.push(skill);
  }
  const {jugador, onToggleSkill} = usePlayer(jugadorInicial);

  

  /** Crear Tooltip para las habilidades */
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRoot = useRef(document.createElement('div')); // Crear un div fuera del DOM inicial

  useEffect(() => {
    tooltipRoot.current.id = 'tooltip-root';
    document.body.appendChild(tooltipRoot.current);

    return () => {
      document.body.removeChild(tooltipRoot.current); // Limpieza al desmontar
    };
  }, []);
  
  const showTooltip = useCallback((content: React.ReactNode, event: React.MouseEvent) => {
    setTooltipContent(content);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  },[]);
  const hideTooltip = useCallback(() => {
    console.log("Mostrando en hide")
    setTooltipContent(null);
  },[]);

  
  
  

  return (  
      <>
      <div className="grid grid-cols-5 grid-rows-[10%_1fr_20%] gap-0 h-screen">
        <PanelInfo lugar="??" zonalevel="??" playerlevel={-1}/>
        <PanelSkills skills={jugador.skills}  onShowTooltip={showTooltip} onHideTooltip={hideTooltip} onToggleSkill={onToggleSkill}/>
        <PanelCentral />
        <PanelQuests />
        <PanelUi />
        {tooltipContent && ReactDOM.createPortal(
          <div
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{
              transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`,
            }}
          >
            <div className="bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg">
              {tooltipContent}
            </div>
          </div>,
          tooltipRoot.current
        )}
      </div>
      </>
  );
}
 
export default InterfaceJuego;