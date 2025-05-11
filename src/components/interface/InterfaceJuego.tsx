import { useState } from "react";
import PanelCentral from "../panelcentral/PanelCentral";
import PanelInfo from "../panelinfo/PanelInfo";
import PanelQuests from "../panelquest/PanelQuest";
import PanelSkills from "../panelskills/PanelSkills";
import PanelUi from "../panelui/PanelUI";
import { Skill } from "../models/skills";
import { Player } from "../models/player";
import { usePlayer } from "../../hooks/usePlayer";
import { useTooltip } from "../../hooks/useTooltip";
import { getmisiones } from "../../utils/createQuestTests";
import { getItems } from "../../utils/createDatas";
import Pruebas from "../../utils/Pruebas";

const InterfaceJuego = () => {
  const [lugar, setLugar] = useState<string>("");
  const [zonalevel, setZonalevel] = useState<string>("");
  const [playerlevel, setPlayerlevel] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);

  /** Jugador */
  const jugadorInicial = new Player("name",{str:0,agi:0,conc:0,level:1,def:0},3,[],getmisiones(),0,10,[]);
  
  /**Crear skills para probar */
  jugadorInicial.skills.push(new Skill("i.toString()","Furigana 0","Permite ver furigana en los kanjis","Ver Furigana","Pasiva",{agi: 0,conc: 0,def: 0,str: 0,level: 1,},"active"));
  for(let i = 0; i < 2; ++i){
    const skill = new Skill(i.toString(),"Furigana " + (i+1).toString(),"Permite ver furigana en los kanjis","Ver Furigana","Pasiva",{agi: 0,conc: 0,def: 0,str: 0,level: 1,},i%2 === 0 ? "inactive": "bloqued");
    jugadorInicial.skills.push(skill);
  }
  const {jugador, onToggleSkill, obtainItem} = usePlayer(jugadorInicial);

  const { showTooltip, hideTooltip, TooltipPortal } = useTooltip();
  return (  
      <>
      <div className="grid grid-cols-5 grid-rows-[10%_1fr_20%] gap-0 h-screen">
        <PanelInfo lugar="??" zonalevel="??" playerlevel={-1}/>
        <PanelSkills skills={jugador.skills}  onShowTooltip={showTooltip} onHideTooltip={hideTooltip} onToggleSkill={onToggleSkill}/>
        <PanelCentral />
        <PanelQuests quests={jugador.quests} inventory={jugador.inventory}/>
        {/* <PanelUi /> */}
        <Pruebas onObtainItem={obtainItem} />
        <TooltipPortal />
      </div>
      </>
  );
}
 
export default InterfaceJuego;