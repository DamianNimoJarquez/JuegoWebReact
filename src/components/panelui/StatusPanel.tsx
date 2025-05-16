import BarPanel from "./BarPanel";

// StatusPanel.tsx
interface StatusPanelProps { 
    hp: number; 
    maxHp: number; 
    mp: number; 
    maxMp: number; 
    exp: number; 
    expLvlUp: number;
    Pname: string;
    level: number
}

const StatusPanel = ({hp, maxHp, mp, maxMp, exp, expLvlUp, Pname, level}: StatusPanelProps) => {
    return (
        <>
        <div className="p-4 box-border min-w-0">
            <div className="text-center font-bold">Estado:</div>
            <div className="grid grid-cols-2 gap-0 mb-2">
                <div className="text-center font-semibold">Nombre:</div>
                <div className="text-center font-semibold">Nivel:</div>
                <div className="text-center">{Pname}</div>
                <div className="text-center">{level}</div>
            </div>
            <BarPanel label="Vida" value={hp} max={maxHp} color="green" />
            <BarPanel label="Mana" value={mp} max={maxMp} color="blue" />
            <BarPanel label="Exp"  value={exp} max={expLvlUp} color="yellow" />
        </div>
        </>
      );
}
 
export default StatusPanel;