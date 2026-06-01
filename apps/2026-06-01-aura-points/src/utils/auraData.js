export const AURA_EVENTS = [
  { id: '1',  emoji: '💪', label: 'Worked out',                points:  150, category: 'health' },
  { id: '2',  emoji: '😴', label: 'Slept 8 hours',             points:  100, category: 'health' },
  { id: '3',  emoji: '🍕', label: 'Late night pizza run',       points:  200, category: 'vibe'   },
  { id: '4',  emoji: '📚', label: 'Read a book',                points:   80, category: 'growth' },
  { id: '5',  emoji: '🎵', label: 'Discovered new music',       points:  120, category: 'vibe'   },
  { id: '6',  emoji: '🧘', label: 'Meditated',                  points:   90, category: 'health' },
  { id: '7',  emoji: '🚿', label: 'Took a cold shower',         points:  180, category: 'health' },
  { id: '8',  emoji: '💔', label: 'Shot my shot (got rejected)',points:  250, category: 'vibe'   },
  { id: '9',  emoji: '🦋', label: 'Helped a stranger',          points:  130, category: 'social' },
  { id: '10', emoji: '🎨', label: 'Made something creative',    points:  110, category: 'growth' },
  { id: '11', emoji: '☕', label: 'Made perfect coffee',        points:   60, category: 'vibe'   },
  { id: '12', emoji: '🌅', label: 'Watched the sunrise',        points:  170, category: 'vibe'   },
  { id: '13', emoji: '🌮', label: 'Cooked a meal',              points:  140, category: 'health' },
  { id: '14', emoji: '🤝', label: 'Made a new friend',          points:  160, category: 'social' },
  { id: '15', emoji: '😤', label: 'Got road rage',              points: -100, category: 'drain'  },
  { id: '16', emoji: '🛌', label: 'Skipped the gym',            points:  -80, category: 'drain'  },
  { id: '17', emoji: '📱', label: 'Doomscrolled for 2h',        points: -120, category: 'drain'  },
  { id: '18', emoji: '🙄', label: 'Complained without fixing',  points:  -60, category: 'drain'  },
];

export const AURA_LEVELS = [
  { min: 0,    max: 499,      label: 'Aura Padawan',   color: '#6b7280' },
  { min: 500,  max: 999,      label: 'Aura Awakening', color: '#3b82f6' },
  { min: 1000, max: 1999,     label: 'Aura Rising',    color: '#8b5cf6' },
  { min: 2000, max: 3499,     label: 'Aura Legend',    color: '#f59e0b' },
  { min: 3500, max: Infinity, label: 'Aura God',       color: '#ef4444' },
];

export function getAuraLevel(points) {
  const clamped = Math.max(0, points);
  return AURA_LEVELS.find(l => clamped >= l.min && clamped <= l.max) || AURA_LEVELS[0];
}

export function formatPoints(points) {
  if (Math.abs(points) >= 1000) return `${(points / 1000).toFixed(1)}K`;
  return points.toString();
}
