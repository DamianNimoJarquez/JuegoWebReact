interface BarProps { 
    label: string; 
    value: number; 
    max: number; 
    color: 'green'|'blue'|'yellow'; 
}

const BarPanel = ({label, value, max, color}: BarProps) => {
    const pct = `${(value/max)*100}%`;
    const bg = { green: 'bg-green-500', blue: 'bg-blue-500', yellow: 'bg-yellow-500' }[color];
    return ( 
        <>
        <div className="flex justify-between items-center gap-1 mt-2">
            <div className="text-right w-1/3">{label}:</div>
            <div className="w-2/3 flex justify-center">
                <div className="relative w-full h-4 bg-gray-600 rounded overflow-hidden">
                <div className={`absolute top-0 left-0 h-full transition-all duration-200 ${bg}`} style={{width: pct}}/>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white pointer-events-none">
                    {value} / {max}
                </span>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default BarPanel;