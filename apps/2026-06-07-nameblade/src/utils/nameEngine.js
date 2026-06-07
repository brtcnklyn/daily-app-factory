const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

export function computeStats(name) {
  const clean = name.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return null;

  let hp = 0;
  let attack = 0;
  let defense = 0;

  for (const ch of clean) {
    const code = ch.charCodeAt(0) - 96;
    hp += code * 3;
    if (VOWELS.has(ch)) {
      attack += code * 2;
    } else {
      defense += code;
    }
  }

  const speed = Math.max(1, 26 - clean.length);

  return {
    name: name.trim(),
    hp: Math.min(hp, 300),
    maxHp: Math.min(hp, 300),
    attack: Math.max(attack, 10),
    defense: Math.max(defense, 5),
    speed,
  };
}

const ENEMY_NAMES = [
  'Shadow Wraith',
  'Iron Golem',
  'Void Serpent',
  'Flame Drake',
  'Storm Giant',
  'Bone Lich',
  'Frost Troll',
  'Thunder Hawk',
];

export function generateEnemy(playerLevel = 1) {
  const idx = Math.floor(Math.random() * ENEMY_NAMES.length);
  const base = 60 + playerLevel * 15;
  return {
    name: ENEMY_NAMES[idx],
    hp: base + Math.floor(Math.random() * 40),
    maxHp: base + Math.floor(Math.random() * 40),
    attack: 8 + playerLevel * 3 + Math.floor(Math.random() * 10),
    defense: 4 + playerLevel * 2,
    speed: 10 + Math.floor(Math.random() * 8),
    isEnemy: true,
  };
}

export function simulateTurn(attacker, defender) {
  const raw = attacker.attack - Math.floor(defender.defense * 0.4);
  const damage = Math.max(1, raw + Math.floor(Math.random() * 8) - 4);
  return { damage, newHp: Math.max(0, defender.hp - damage) };
}
