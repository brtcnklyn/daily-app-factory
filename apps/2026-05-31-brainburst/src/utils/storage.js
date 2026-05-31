import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  HIGH_SCORE: 'bb_high_score',
  STREAK: 'bb_streak',
  LAST_PLAYED: 'bb_last_played',
  TOTAL_GAMES: 'bb_total_games',
};

const todayStr = () => new Date().toISOString().split('T')[0];

export async function getStats() {
  try {
    const [highScore, streak, lastPlayed, totalGames] = await Promise.all([
      AsyncStorage.getItem(KEYS.HIGH_SCORE),
      AsyncStorage.getItem(KEYS.STREAK),
      AsyncStorage.getItem(KEYS.LAST_PLAYED),
      AsyncStorage.getItem(KEYS.TOTAL_GAMES),
    ]);
    return {
      highScore: highScore ? parseInt(highScore, 10) : 0,
      streak: streak ? parseInt(streak, 10) : 0,
      lastPlayed: lastPlayed || null,
      totalGames: totalGames ? parseInt(totalGames, 10) : 0,
    };
  } catch (_) {
    return { highScore: 0, streak: 0, lastPlayed: null, totalGames: 0 };
  }
}

export async function saveResult(score) {
  try {
    const stats = await getStats();
    const today = todayStr();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = stats.streak;
    if (stats.lastPlayed === yesterdayStr) {
      newStreak = stats.streak + 1;
    } else if (stats.lastPlayed !== today) {
      newStreak = 1;
    }

    const newHighScore = Math.max(stats.highScore, score);
    const newTotalGames = stats.totalGames + 1;

    await Promise.all([
      AsyncStorage.setItem(KEYS.HIGH_SCORE, String(newHighScore)),
      AsyncStorage.setItem(KEYS.STREAK, String(newStreak)),
      AsyncStorage.setItem(KEYS.LAST_PLAYED, today),
      AsyncStorage.setItem(KEYS.TOTAL_GAMES, String(newTotalGames)),
    ]);

    return { newHighScore, newStreak, isNewRecord: score > stats.highScore };
  } catch (_) {
    return { newHighScore: score, newStreak: 1, isNewRecord: false };
  }
}
