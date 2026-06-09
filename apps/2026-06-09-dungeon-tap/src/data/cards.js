export const ALL_CARDS = [
  { id: 'strike',       name: 'Strike',       type: 'attack',  value: 15,            emoji: '⚔️',  description: '15 damage' },
  { id: 'heavy_strike', name: 'Heavy Strike', type: 'attack',  value: 25,            emoji: '🗡️',  description: '25 damage' },
  { id: 'fireball',     name: 'Fireball',     type: 'attack',  value: 30,            emoji: '🔥',  description: '30 damage' },
  { id: 'poison_dart',  name: 'Poison Dart',  type: 'attack',  value: 18,            emoji: '☠️',  description: '18 damage' },
  { id: 'arrow',        name: 'Arrow Shot',   type: 'attack',  value: 12,            emoji: '🏹',  description: '12 damage' },
  { id: 'whirlwind',    name: 'Whirlwind',    type: 'attack',  value: 22,            emoji: '🌪️',  description: '22 damage' },
  { id: 'defend',       name: 'Defend',       type: 'defend',  value: 10,            emoji: '🛡️',  description: '10 shield' },
  { id: 'fortify',      name: 'Fortify',      type: 'defend',  value: 18,            emoji: '🏰',  description: '18 shield' },
  { id: 'block',        name: 'Block',        type: 'defend',  value: 14,            emoji: '🪨',  description: '14 shield' },
  { id: 'heal',         name: 'Heal',         type: 'heal',    value: 12,            emoji: '💚',  description: '+12 HP' },
  { id: 'potion',       name: 'Potion',       type: 'heal',    value: 20,            emoji: '🧪',  description: '+20 HP' },
  { id: 'counter',      name: 'Counter',      type: 'special', attackValue: 8, shieldValue: 8, emoji: '🔄', description: '8 dmg + 8 shield' },
];

export function getRandomCards(count = 3) {
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
