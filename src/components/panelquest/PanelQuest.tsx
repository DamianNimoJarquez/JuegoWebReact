const PanelQuests = () => {
    return ( 
        <>
        <div className="paneles-laterales">
            <div className="flex-none">Misiones:</div>
            {Array.from({length: 100}).map((_,i)=>(
                <div key={i} className="h-[50px]">elem {i}</div>
            ))}
        </div>
        </>
     );
}
 
export default PanelQuests;