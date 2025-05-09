import { useCallback, useState } from "react";
import ReactDOM from "react-dom";

export function useTooltip(){
    const [content, setContent] = useState<React.ReactNode>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });


    const showTooltip = useCallback((newContent: React.ReactNode, event: React.MouseEvent) => {
        setContent(newContent);
        setPosition({ x: event.clientX + 12, y: event.clientY + 12 });
    }, []);

    const hideTooltip = useCallback(() => {
        setContent(null);
    }, []);

    const TooltipPortal = () => {
    const root = document.getElementById("tooltip-root");
        if (!root || !content) return null;
        return ReactDOM.createPortal(
        <div
            className="fixed z-[9999] bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-xl pointer-events-none max-w-xs"
            style={{ left: position.x, top: position.y }}
        >
            {content}
        </div>,
        root
        );
    };

    return {showTooltip, hideTooltip, TooltipPortal};
}