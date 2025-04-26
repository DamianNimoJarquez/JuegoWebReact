import PanelCentral from "./PanelCentral";
import PanelInfo from "./PanelInfo";
import PanelQuests from "./PanelQuest";
import PanelSkills from "./PanelSkills";
import PanelUi from "./PanelUI";

const InterfaceJuego = () => {
    return (  
        <>
        <div className="grid grid-cols-5 grid-rows-[10%_1fr_20%] gap-0 h-screen">
          <PanelInfo />
          <PanelSkills />
          <PanelCentral />
          <PanelQuests />
          <PanelUi />
        </div>
        </>
    );
}
 
export default InterfaceJuego;