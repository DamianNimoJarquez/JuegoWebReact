import { Skill } from "../models/skills";

interface SkillCardProps{
    skill: Skill
    onShowTooltip: (content: React.ReactNode, event: React.MouseEvent) => void;
    onHideTooltip: () => void;
    onClick: () => void;
}
const SkillCard = ({skill, onShowTooltip, onHideTooltip, onClick}: SkillCardProps) => {

    const handleMouseEnter = (event: React.MouseEvent) => {
        onShowTooltip(
          <div className="space-y-2">
            <div className="text-center font-semibold">Descripción</div>
            <div className="text-left">{skill.description}</div>
            <div className="w-full border-t border-gray-600"></div>

            {skill.state === 'bloqued' && (<>
              <div className="text-center font-semibold">Requisitos:</div>
              <div className="space-y-1">
                {Object.entries(skill.requirements).map(([key, value]) => (
                  <div key={key} className="text-center">
                    {key}: {value}
                  </div>
                ))}
              </div>
            </>)}
          </div>,
          event
        );
      };
      const handleMouseLeave = () => {
        onHideTooltip();
      };
      
    return ( 
        <>
        <div key={skill.id} className={ `skill-${skill.state} group relative`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
            <div className="font-bold">{skill.name}</div>
            <div className="w-full border-t border-gray-300 my-2"></div>
            <div className="text-[rgba(255,255,255,0.66)] text-sm">{skill.shortDesc}</div>
            {/* Tooltip */}
            {/* <div
                className=" z-50
                absolute
                bottom-full
                left-0
                w-full
                transform
                origin-top
                scale-y-0
                group-hover:scale-y-100
                transition-transform duration-200
                bg-gray-800 text-white text-sm
                px-2 py-1
                rounded-b-md
                shadow-lg
                pointer-events-none"
                >
                    {/* Contenedor interno con padding extra si quieres 
                    <div className="space-y-2">
                        {/* 1. Título “Descripción”, centrado }
                        <div className="text-center font-semibold">Descripción</div>
                        {/* 2. Texto de la descripción, alineado a la izquierda }
                        <div className="text-left">
                        {skill.description}
                        </div>
                        {/* 3. Separador }
                        <div className="w-full border-t border-gray-600"></div>
                        {/* 4. Título “Requisitos:”, centrado }
                        <div className="text-center font-semibold">Requisitos:</div>
                        {/* 5. Lista de requisitos, cada línea centrada }
                        <div className="space-y-1">
                            {Object.entries(skill.requirements).map(([key, value]) =>(
                                <div key={key} className="text-center">
                                    {key}: {value}
                                </div>
                            ))}
                        </div>
                    </div>
            </div> */}
        </div>
        </>
     );
}
 
export default SkillCard;