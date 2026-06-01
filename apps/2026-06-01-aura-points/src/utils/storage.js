import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_PREFIX = '@aura_events_';
const STREAK_KEY = '@aura_streak';

function todayKey() {
  return EVENTS_PREFIX + new Date().toISOString().split('T')[0];
}

export async function getTodayEvents() {
  try {
    const data = await AsyncStorage.getItem(todayKey());
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addEvent(event) {
  try {
    const existing = await getTodayEvents();
    const updated = [
      ...existing,
      { ...event, id: Date.now().toString(), timestamp: new Date().toISOString() },
    ];
    await AsyncStorage.setItem(todayKey(), JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export async function getAllTimePoints() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const eventKeys = keys.filter(k => k.startsWith(EVENTS_PREFIX));
    let total = 0;
    for (const key of eventKeys) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const events = JSON.parse(data);
        total += events.reduce((sum, e) => sum + (e.points || 0), 0);
      }
    }
    return total;
  } catch {
    return 0;
  }
}

export async function getStreak() {
  try {
    const data = await AsyncStorage.getItem(STREAK_KEY);
    return data ? JSON.parse(data) : { count: 0, lastDate: null };
  } catch {
    return { count: 0, lastDate: null };
  }
}

export async function updateStreak() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const streak = await getStreak();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak;
    if (streak.lastDate === today) {
      newStreak = streak;
    } else if (streak.lastDate === yesterdayStr) {
      newStreak = { count: streak.count + 1, lastDate: today };
    } else {
      newStreak = { count: 1, lastDate: today };
    }

    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    return newStreak;
  } catch {
    return { count: 0, lastDate: null };
  }
}
