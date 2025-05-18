import { ReactNode, useEffect } from "react";

interface ModalGlobalProps{
    open: boolean; //Para controlar si el modal está abierto ya
    onClose: () => void; //Callback para cerrar el modal click en fondo o esc
    disableClose?: boolean; //Para deshabilitar el cierra del modal, caso del tutoral
    children: ReactNode; //Contenido del modal
}

const ModalGlobal = ({open, onClose, disableClose = false, children}: ModalGlobalProps) => {
    //Gestionar el escape
    useEffect(()=>{
        const handleKey = (e: globalThis.KeyboardEvent)=>{
            if(e.key ==='Escape' && open && !disableClose)
                onClose();
        };
        document.addEventListener('keydown', handleKey);
        return ()=> document.removeEventListener('keydown', handleKey);
    },[open, disableClose, onClose]);
    if(!open) return null;
    return ( 
        <>
        <div className="fixed inset-0 z-50, flex items-center justify-center bg-black/60"
            onClick={()=>{if(!disableClose) onClose();}}>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full p-4"
                    onClick={e => e.stopPropagation()}> {/*para no quitarlo cuando se hace click en el*/}
                        {children}
                </div>
        </div>
        </>
     );
}
 
export default ModalGlobal;