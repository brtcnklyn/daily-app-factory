const BASE_MONSTERS = [
  { name: 'Slime',    emoji: '🟢', maxHp: 30,  attack: 8  },
  { name: 'Goblin',   emoji: '👺', maxHp: 50,  attack: 12 },
  { name: 'Skeleton', emoji: '💀', maxHp: 65,  attack: 16 },
  { name: 'Orc',      emoji: '👹', maxHp: 85,  attack: 20 },
  { name: 'Vampire',  emoji: '🧛', maxHp: 110, attack: 25 },
  { name: 'Dragon',   emoji: '🐉', maxHp: 150, attack: 30 },
];

export function getMonsterForFloor(floor) {
  if (floor <= BASE_MONSTERS.length) {
    const base = BASE_MONSTERS[floor - 1];
    return { ...base, hp: base.maxHp, floor };
  }
  const extra = floor - BASE_MONSTERS.length;
  const hp = 150 + extra * 35;
  const attack = 30 + extra * 6;
  return { name: 'Demon Lord', emoji: '😈', hp, maxHp: hp, attack, floor };
}
