import { PanelInfoProps } from "./PanelInfo.type";

const PanelInfo = ({lugar, zonalevel, playerlevel}: PanelInfoProps) => {
    return ( 
        <>
        {/* <!-- Elemento 1 (Header) --> */}
        <div className="panel-info">
            {lugar.length > 0 && <div>Zona: {lugar}</div>}
            {zonalevel.length > 0 && <div>Dificultad: {zonalevel}</div>}
            {playerlevel > 0 && <div>Nivel: {playerlevel}</div>}
        </div>
        </>
     );
}
 
export default PanelInfo;