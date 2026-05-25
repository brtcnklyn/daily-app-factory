const AURAS = [
  {
    name: 'Golden Sun',
    color: '#FFD700',
    description: 'Radiating pure positivity and unstoppable energy. People are drawn to your warmth today.',
    emoji: '☀️',
  },
  {
    name: 'Violet Dream',
    color: '#7c3aed',
    description: 'Deep intuition and creative power flow through you. Trust your inner vision.',
    emoji: '🔮',
  },
  {
    name: 'Ocean Blue',
    color: '#0ea5e9',
    description: 'Calm, composed, and emotionally intelligent. You are a steady force today.',
    emoji: '🌊',
  },
  {
    name: 'Rose Quartz',
    color: '#f472b6',
    description: 'Open-hearted and full of compassion. Love is your superpower right now.',
    emoji: '🌸',
  },
  {
    name: 'Forest Green',
    color: '#22c55e',
    description: 'Grounded and healing. Your presence brings balance to everyone around you.',
    emoji: '🌿',
  },
  {
    name: 'Crimson Flame',
    color: '#ef4444',
    description: 'Passionate and intense. Channel this fire into something meaningful today.',
    emoji: '🔥',
  },
  {
    name: 'Silver Mist',
    color: '#94a3b8',
    description: 'Introspective and reflective. Sometimes the most powerful thing is stillness.',
    emoji: '🌫️',
  },
  {
    name: 'Cosmic Indigo',
    color: '#4338ca',
    description: 'Mysterious and deeply connected to something greater. Tune into your intuition.',
    emoji: '🌌',
  },
];

export function calculateAura([energy, emotion, connection]) {
  let index = 0;

  if (energy >= 3) index = 0;
  else if (energy === 2) index = 3;
  else index = 6;

  const emotionMap = { joy: 0, creative: 1, calm: 2, anxious: 3 };
  index = (index + (emotionMap[emotion] ?? 0)) % AURAS.length;

  const connectionMap = { social: 0, selective: 1, solo: 2, disconnected: 3 };
  index = (index + (connectionMap[connection] ?? 0)) % AURAS.length;

  return AURAS[index];
}

export { AURAS };
