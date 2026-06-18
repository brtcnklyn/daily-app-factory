const WORD_LIST = [
  'APPLE', 'BRAVE', 'CRANE', 'DRIVE', 'EAGLE',
  'FLAME', 'GRACE', 'HEART', 'IMAGE', 'JUICE',
  'KNIFE', 'LIGHT', 'MAGIC', 'NIGHT', 'OCEAN',
  'PIANO', 'QUEEN', 'RIVER', 'STONE', 'TRAIL',
  'BLAST', 'CLOCK', 'DANCE', 'ELITE', 'FROST',
  'GLOOM', 'HAPPY', 'JOKER', 'KNEEL', 'LEMON',
  'MEDAL', 'NICHE', 'ORBIT', 'PEARL', 'QUIET',
  'REBEL', 'SWAMP', 'TIGER', 'ULTRA', 'VALID',
  'WITCH', 'YOUTH', 'ZONES', 'BLAZE', 'CORAL',
  'DAISY', 'EMBER', 'FABLE', 'GLIDE', 'HASTE',
];

export function getDailyWord() {
  const start = new Date('2026-01-01T00:00:00');
  const now = new Date();
  const dayIndex = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return WORD_LIST[dayIndex % WORD_LIST.length];
}

export function evaluateGuess(guess, target) {
  const result = Array(5).fill('absent');
  const targetArr = target.split('');
  const guessArr = guess.split('');
  const used = Array(5).fill(false);

  guessArr.forEach((letter, i) => {
    if (letter === targetArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  });

  guessArr.forEach((letter, i) => {
    if (result[i] === 'correct') return;
    const idx = targetArr.findIndex((t, j) => t === letter && !used[j]);
    if (idx !== -1) {
      result[i] = 'present';
      used[idx] = true;
    }
  });

  return result;
}
