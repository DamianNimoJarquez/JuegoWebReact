import { Skill } from "../models/skills";
import SkillCard from "./SkillCard";

interface PanelSkillsProps{
    skills: Skill[]
    onShowTooltip: (content: React.ReactNode, event: React.MouseEvent) => void;
    onHideTooltip: () => void;
    onToggleSkill: (skillId: string) => void;
}

const PanelSkills = ({skills, onShowTooltip, onHideTooltip, onToggleSkill}:PanelSkillsProps) => {
    return (  
        <>
        <div className="paneles-laterales relative z-50" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }} className="flex flex-col w-full items-center justify-start gap-4 p-1">
                <div className="flex-none">Habilidades:</div>
                {/* <div className="h-[50px]">elem 1</div> */}
                {skills.length === 0 ? (
                    <div className="text-gray-400">No tienes habilidades aún</div>
                    ):(
                        skills.map(skill =>(
                            <SkillCard key={skill.id} skill={skill} onShowTooltip={onShowTooltip} onHideTooltip={onHideTooltip} onClick={() => onToggleSkill(skill.id)}/>
                        ))
                    )}
            {Array.from({length: 100}).map((_,i)=>(
                <div key={i} className="h-[50px]">elem {i}</div>
            ))}
            </div>
        </div>
        </>
    );
}
 
export default PanelSkills;