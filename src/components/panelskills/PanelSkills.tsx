import { Skill } from "../models/skills";
import SkillCard from "./SkillCard";

interface PanelSkillsProps{
    skills: Skill[]
    onShowTooltip: (content: React.ReactNode, event: React.MouseEvent) => void;
    onHideTooltip: () => void;
    onToggleSkill: (skillId: string) => void;
}

const PanelSkills = ({skills, onShowTooltip, onHideTooltip, onToggleSkill}:PanelSkillsProps) => {
    const activeSkills = skills.filter(skill => skill.state === 'active');
    const otherSkills = skills.filter(skill => skill.state !== 'active');
    return (  
        <>
        <div className="paneles-laterales relative z-50" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }} className="flex flex-col w-full items-center justify-start gap-4 p-1">
                <div className="sticky top-0 z-20 w-full shadow-md ">
                    <div className="bg-[#0f0f0f] py-3 text-center w-full h-full">Habilidades:</div>
                </div>    
                {activeSkills.length > 0 && (
                    <div className="sticky top-[48px] z-10 bg-[#0f0f0f] w-full py-2 shadow-md flex flex-col gap-4">
                        {activeSkills.map(skill =>(
                            <SkillCard key={skill.id} skill={skill} onShowTooltip={onShowTooltip} onHideTooltip={onHideTooltip} onClick={()=> onToggleSkill(skill.id)} />
                        ))}
                    </div>
                )}
                {otherSkills.map(skill=>(
                    <SkillCard key={skill.id} skill={skill} onShowTooltip={onShowTooltip} onHideTooltip={onHideTooltip} onClick={()=> onToggleSkill(skill.id)} />
                ))}

            {Array.from({length: 100}).map((_,i)=>(
                <div key={i} className="h-[50px]">elem {i}</div>
            ))}
            </div>
        </div>
        </>
    );
}
 
export default PanelSkills;