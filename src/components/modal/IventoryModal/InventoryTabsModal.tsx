interface InventoryTabsModalProps<T>{
    tabs: T[];
    active: T;
    onChange: (newTab: T) => void;
    locked?: boolean;
    disableTabs?: T[];
}

interface TabsButtonProps{
    label: string;
    active: boolean;
    disabled?: boolean;
    onClick: () =>void;
}

const TabButton: React.FC<TabsButtonProps> = ({ label, active, disabled = false, onClick }: TabsButtonProps) => {
    const base = 'baseBotonIventoryModal';
    const activeCls = 'activeTabIventory';
    const inactiveCls = 'inactiveTabIventory';
    const disabledCls = 'disableTabIventory';
    return ( 
        <>
            <button className={`${base} ${active ? activeCls : inactiveCls} ${disabled ? disabledCls: ''}`}
                onClick={() => !disabled && !active && onClick()}
                disabled={disabled}>{label}</button>
        </>
     );
}
export function InventoryTabsModal<T extends string>({tabs, active, onChange, locked = false, disableTabs=[]}: InventoryTabsModalProps<T>){
    
    return (
        <>
            <div className="panelBotonesOpcionesIventario">
                {tabs.map(tabKey =>(
                    <TabButton key={tabKey}
                        label={String(tabKey).charAt(0).toUpperCase() + String(tabKey).slice(1)}
                        active={tabKey === active}
                        disabled={locked || disableTabs.includes(tabKey)}
                        onClick={() => onChange(tabKey)} />
                ))}
            </div>
        </>
    )
}