import AsyncStorage from '@react-native-async-storage/async-storage';

const SCORES_KEY = 'typerush_scores';

const formatDate = (date) => date.toISOString().split('T')[0];

const getScores = async () => {
  try {
    const data = await AsyncStorage.getItem(SCORES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveScore = async (wpm, accuracy, textLength) => {
  const scores = await getScores();
  const today = formatDate(new Date());
  const filtered = scores.filter((s) => s.date !== today);
  const newScore = {
    id: Date.now().toString(),
    date: today,
    wpm,
    accuracy,
    textLength,
    createdAt: new Date().toISOString(),
  };
  const updated = [newScore, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
  await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(updated));
  return newScore;
};

const getTodayScore = async () => {
  const scores = await getScores();
  const today = formatDate(new Date());
  return scores.find((s) => s.date === today) || null;
};

const getStreak = async () => {
  const scores = await getScores();
  if (scores.length === 0) return 0;

  const dateSet = new Set(scores.map((s) => s.date));
  const today = new Date();
  const todayStr = formatDate(today);
  let streak = 0;
  let checkDate = dateSet.has(todayStr) ? today : new Date(today.getTime() - 86400000);

  while (true) {
    const dateStr = formatDate(checkDate);
    if (dateSet.has(dateStr)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
};

const getBestWPM = async () => {
  const scores = await getScores();
  if (scores.length === 0) return 0;
  return Math.max(...scores.map((s) => s.wpm));
};

export { getScores, saveScore, getTodayScore, getStreak, getBestWPM, formatDate };
