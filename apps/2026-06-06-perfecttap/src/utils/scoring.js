export const DIFFICULTIES = {
  easy: {
    label: 'Easy',
    duration: 2000,
    color: '#2ECC71',
    description: 'Slow pulse — great for warm-up',
  },
  medium: {
    label: 'Medium',
    duration: 1200,
    color: '#F39C12',
    description: 'Standard challenge',
  },
  hard: {
    label: 'Hard',
    duration: 650,
    color: '#E74C3C',
    description: 'Lightning reflexes required',
  },
};

export const ROUNDS = 10;

// Pulse ring (200px) matches target ring (90px) when scale = 90/200
export const PERFECT_RATIO = 0.45;

// Timing windows in milliseconds
const PERFECT_WINDOW = 120;
const GOOD_WINDOW = 300;

export function calculateRating(elapsed, duration) {
  const targetTime = duration * PERFECT_RATIO;
  const offset = Math.abs(elapsed - targetTime);

  if (offset < PERFECT_WINDOW) {
    return { rating: 'PERFECT', points: 100, color: '#FFD700' };
  }
  if (offset < GOOD_WINDOW) {
    return { rating: 'GOOD', points: 50, color: '#2ECC71' };
  }
  return { rating: 'MISS', points: 0, color: '#E74C3C' };
}

export function getGrade(score, maxScore) {
  const pct = score / maxScore;
  if (pct >= 0.9) return { grade: 'S', label: 'Legendary', color: '#FFD700' };
  if (pct >= 0.75) return { grade: 'A', label: 'Excellent', color: '#2ECC71' };
  if (pct >= 0.55) return { grade: 'B', label: 'Great', color: '#3498DB' };
  if (pct >= 0.35) return { grade: 'C', label: 'Good', color: '#9B59B6' };
  return { grade: 'D', label: 'Keep Trying', color: '#E74C3C' };
}
