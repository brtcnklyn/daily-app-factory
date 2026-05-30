const CLASSES = ['Warrior', 'Mage', 'Rogue', 'Paladin', 'Ranger', 'Necromancer'];

const CLASS_COLORS = {
  Warrior: '#E74C3C',
  Mage: '#9B59B6',
  Rogue: '#2ECC71',
  Paladin: '#F39C12',
  Ranger: '#27AE60',
  Necromancer: '#16A085',
};

const CLASS_ICONS = {
  Warrior: '⚔️',
  Mage: '🔮',
  Rogue: '🗡️',
  Paladin: '🛡️',
  Ranger: '🏹',
  Necromancer: '💀',
};

const ABILITIES = {
  A: 'Arcane Surge',
  B: 'Battle Cry',
  C: 'Chain Lightning',
  D: 'Death Mark',
  E: 'Eagle Eye',
  F: 'Flame Strike',
  G: 'Guardian Shield',
  H: 'Holy Smite',
  I: 'Ice Storm',
  J: 'Judgement',
  K: 'Kinetic Slash',
  L: 'Lunar Blessing',
  M: 'Mind Blast',
  N: "Nature's Wrath",
  O: 'Omega Blast',
  P: 'Phantom Step',
  Q: 'Quake',
  R: 'Rapid Fire',
  S: 'Shadow Strike',
  T: 'Thunder Clap',
  U: 'Undying Will',
  V: 'Void Pulse',
  W: 'Whirlwind',
  X: 'Xenomorph Shift',
  Y: 'Yggdrasil Root',
  Z: 'Zero Hour',
};

function hashName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateHero(name) {
  const trimmed = name.trim();
  const upper = trimmed.toUpperCase();
  const hash = hashName(upper);
  const charSum = upper.split('').reduce((s, c) => s + c.charCodeAt(0), 0);

  const classIndex = charSum % CLASSES.length;
  const heroClass = CLASSES[classIndex];

  const letters = upper.replace(/[^A-Z]/g, '');
  const len = letters.length || 1;

  let strScore = 0;
  let intScore = 0;
  let dexScore = 0;
  let vitScore = 0;

  for (let i = 0; i < letters.length; i++) {
    const v = letters.charCodeAt(i) - 64;
    if (i % 4 === 0) strScore += v;
    else if (i % 4 === 1) intScore += v;
    else if (i % 4 === 2) dexScore += v;
    else vitScore += v;
  }

  const normalize = (val) => {
    const buckets = Math.ceil(len / 4);
    const base = Math.round((val / (buckets * 13)) * 100);
    return Math.min(100, Math.max(15, base));
  };

  const stats = {
    STR: normalize(strScore),
    INT: normalize(intScore),
    DEX: normalize(dexScore),
    VIT: normalize(vitScore),
  };

  const firstLetter = letters[0] || 'A';
  const ability = ABILITIES[firstLetter] || 'Arcane Surge';
  const level = Math.min(99, Math.max(1, len * 3 + (hash % 20)));
  const powerRating = Math.round((stats.STR + stats.INT + stats.DEX + stats.VIT) / 4);

  return {
    name: trimmed,
    heroClass,
    color: CLASS_COLORS[heroClass],
    icon: CLASS_ICONS[heroClass],
    ability,
    level,
    powerRating,
    stats,
    id: `${upper.replace(/\s+/g, '_')}-${hash}`,
    createdAt: new Date().toISOString(),
  };
}
