const DAILY_TEXTS = [
  'The quick brown fox jumps over the lazy dog near the old riverbank.',
  'Pack my box with five dozen liquor jugs for the weekend celebration.',
  'How vexingly quick daft zebras jump across the muddy open plains.',
  'Sphinx of black quartz, judge my vow before the bright morning dawn.',
  'The five boxing wizards jump quickly over the tall wooden hedge.',
  'Crazy Fredrick bought many very exquisite opal jewels for display.',
  'We promptly judged antique ivory buckles for the next grand prize show.',
  'Jackdaws love my big sphinx of quartz built near the ancient ruins.',
  'The job requires extra pluck and zeal from every young brave fighter.',
  'Fix problem quickly with galvanized jets, brave zephyrs blow cold wind.',
  'Sixty zippers were quickly picked from the woven jute bag by a fox.',
  'A large fawn jumped quickly over white zinc boxes with amazed fury.',
  'Blowzy night frumps vex bold Jack Quinn who plays keyboard with zest.',
  'No kidding, Lorenzo called off his trip to Malta just because of us.',
];

const getDailyText = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / 86400000);
  return DAILY_TEXTS[dayOfYear % DAILY_TEXTS.length];
};

const calculateWPM = (charsTyped, elapsedMs) => {
  if (elapsedMs < 500) return 0;
  const minutes = elapsedMs / 60000;
  const words = charsTyped / 5;
  return Math.round(words / minutes);
};

const calculateAccuracy = (typedText, targetText) => {
  if (typedText.length === 0) return 100;
  let correct = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) correct++;
  }
  return Math.round((correct / typedText.length) * 100);
};

const getGrade = (wpm) => {
  if (wpm >= 80) return { grade: 'S', label: 'Speed Demon', color: '#7C3AED' };
  if (wpm >= 60) return { grade: 'A', label: 'Fast Typer', color: '#10B981' };
  if (wpm >= 40) return { grade: 'B', label: 'Above Average', color: '#3B82F6' };
  if (wpm >= 20) return { grade: 'C', label: 'Warming Up', color: '#F59E0B' };
  return { grade: 'D', label: 'Keep Practicing', color: '#EF4444' };
};

export { DAILY_TEXTS, getDailyText, calculateWPM, calculateAccuracy, getGrade };
