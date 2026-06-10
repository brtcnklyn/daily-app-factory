import AsyncStorage from '@react-native-async-storage/async-storage';

const K = {
  HIGH: 'ms_high_score',
  STREAK: 'ms_streak',
  LAST: 'ms_last_played',
  TODAY: 'ms_today_score',
};

export async function getStats() {
  try {
    const [high, streak, last, today] = await AsyncStorage.multiGet([
      K.HIGH, K.STREAK, K.LAST, K.TODAY,
    ]);
    const values = Object.fromEntries([high, streak, last, today]);
    const todayStr = new Date().toDateString();
    const ystStr = new Date(Date.now() - 86400000).toDateString();

    let currentStreak = parseInt(values[K.STREAK]) || 0;
    if (values[K.LAST] !== todayStr && values[K.LAST] !== ystStr) {
      currentStreak = 0;
    }

    return {
      highScore: parseInt(values[K.HIGH]) || 0,
      streak: currentStreak,
      todayScore: values[K.LAST] === todayStr ? parseInt(values[K.TODAY]) || 0 : null,
      hasPlayedToday: values[K.LAST] === todayStr,
    };
  } catch {
    return { highScore: 0, streak: 0, todayScore: null, hasPlayedToday: false };
  }
}

export async function saveScore(score) {
  try {
    const [high, streak, last] = await AsyncStorage.multiGet([K.HIGH, K.STREAK, K.LAST]);
    const values = Object.fromEntries([high, streak, last]);
    const todayStr = new Date().toDateString();
    const ystStr = new Date(Date.now() - 86400000).toDateString();

    const currentHigh = parseInt(values[K.HIGH]) || 0;
    const currentStreak = parseInt(values[K.STREAK]) || 0;

    let newStreak = currentStreak;
    if (values[K.LAST] === todayStr) {
      newStreak = currentStreak;
    } else if (values[K.LAST] === ystStr) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1;
    }

    await AsyncStorage.multiSet([
      [K.HIGH, String(Math.max(currentHigh, score))],
      [K.STREAK, String(newStreak)],
      [K.LAST, todayStr],
      [K.TODAY, String(score)],
    ]);

    return { isNewRecord: score > currentHigh, streak: newStreak };
  } catch {
    return { isNewRecord: false, streak: 1 };
  }
}
