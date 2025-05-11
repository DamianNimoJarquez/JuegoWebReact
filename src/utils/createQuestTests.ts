import { Atributos } from "../components/models/player";
import { CompositeObjective } from "../components/models/quests/compositeObjective";
import { DialogueObjective } from "../components/models/quests/dialogueObjective";
import { Quest } from "../components/models/quests/quest";
import { QuestStep } from "../components/models/quests/questSetp";
import { TargetObjective } from "../components/models/quests/targetObjective";

const requisitosBase: Atributos = { agi:0, conc:0, def:0, str:0, level:1 };

//quest 1 hablar con npc
export const quest1 = new Quest(
    'q1', 'Saludo al Maestro', 'Habla con el Maestro en la plaza', 'Habla con el Maestro',
    'main', requisitosBase,
    [new QuestStep('Habla con el Maestro',new DialogueObjective('maestroID'))],
    {xp: 10, coin: 5}
);
//Quest 2 conseguir objeto
export const quest2 = new Quest(
    'q2', 'Recolectar Pociones Rojas', 'Consigue 5 pociones de salud roja', 'Reúne pociones rojas',
  'side', requisitosBase,
  [new QuestStep('Recolectar 5 pociones', new TargetObjective('pocion_salud',5,'collection'))],
  {xp: 10, coin: 5}
)
//Quest 3 matar objetivo
export const quest3 = new Quest(
    'q3', 'Caza de Slimes', 'Elimina 5 Slimes que rondan el bosque', 'Derrota Slimes',
  'side', requisitosBase,
    [new QuestStep('Matar 5 slime',new TargetObjective('slimeId',5,'kill'))],
  {xp: 10, coin: 5}
)
//Quest 4 conseguir 2 objetos distintos
export const quest4 = new Quest(
    'q4', 'Pociones Variadas', 'Consigue 5 pociones azules y 10 verdes', 'Reúne pociones mixtas',
  'side', requisitosBase,
  [new QuestStep('Reune pociones',new CompositeObjective([
    new TargetObjective('pocionazulID',5,'collection'),
    new TargetObjective('pocionverdeID',10,'collection')
  ]))],
  {xp: 10, coin: 5}
)
//quest 5 recolectar y matar
export const quest5 = new Quest(
    'q5', 'Miscelánea de tareas', 'Recoge 5 pociones rojas y elimina 6 goblins', 'Pociones y goblins',
  'main', requisitosBase,
  [ new QuestStep('Completa ambas tareas', new CompositeObjective([
      new TargetObjective('pocion_salud', 5, 'collection'),
      new TargetObjective('goblin', 6, 'kill')
  ])) ],
  { xp: 50, coin: 25 }
);
//quest 6 mision con 10 pasos
export const quest6 = new Quest(
    'q6', 'Desafío del Aventura', `Tras cruzar el desfiladero de los ecos, el grupo se encuentra con las ruinas de una civilización olvidada, oculta entre la niebla perpetua y los susurros de antiguos espíritus que aún deambulan entre los escombros. Las paredes derruidas cuentan historias de un imperio que desafió a los dioses, y en sus grietas aún laten fragmentos de la magia prohibida que provocó su caída. Tu misión es explorar los restos, descifrar los grabados ocultos y encontrar el artefacto conocido como "El Núcleo Silente", una reliquia capaz de alterar el curso del destino. Sin embargo, los ecos del pasado no descansan, y cada paso entre las ruinas puede despertar la ira de quienes fueron sellados allí hace siglos.  
Ten cuidado: el tiempo se comporta de forma extraña en este lugar. Algunas zonas parecen avanzar en ciclos de luz y oscuridad en cuestión de segundos, mientras que otras permanecen inmóviles como si estuvieran atrapadas en un instante eterno. Deberás resolver acertijos que cambian cada vez que fallas, enfrentarte a criaturas que existen fuera del flujo temporal y tomar decisiones morales con consecuencias imprevisibles.  
Esta misión no solo pondrá a prueba tu fuerza y tu mente, sino también tu capacidad para distinguir entre lo que debe ser recordado y lo que es mejor dejar en el olvido.`
, '10 desafíos',
  'main', requisitosBase,
  [
    new QuestStep('Habla con el anciano', new DialogueObjective('anciano')),
    new QuestStep('Recoge 3 pociones rojas', new TargetObjective('pocion_salud', 3, 'collection')),
    new QuestStep('Derrota 2 slimes', new TargetObjective('slime', 2, 'kill')),
    new QuestStep('Recoge 4 pociones azules', new TargetObjective('pocion_mana', 4, 'collection')),
    new QuestStep('Habla con el herrero', new DialogueObjective('herrero')),
    new QuestStep('Derrota 3 goblins', new TargetObjective('goblin', 3, 'kill')),
    new QuestStep('Recoge 5 pociones verdes', new TargetObjective('pocion_verde', 5, 'collection')),
    new QuestStep('Habla con el curandero', new DialogueObjective('curandero')),
    new QuestStep('Derrota 1 jefe local', new TargetObjective('mini_jefe', 1, 'kill')),
    new QuestStep('Vuelve al anciano', new DialogueObjective('anciano'))
  ],
  { xp: 200, coin: 100 }
);

export function getmisiones(): Quest[]{
    return [quest1, quest2, quest3, quest4,quest5,quest6];
}