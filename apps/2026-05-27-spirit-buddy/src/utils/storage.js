import AsyncStorage from '@react-native-async-storage/async-storage';

const MOOD_KEY = 'mood_entries';

export async function saveMoodEntry(entry) {
  try {
    const existing = await getMoodEntries();
    const today = new Date().toDateString();
    const filtered = existing.filter(e => e.date !== today);
    filtered.unshift({ ...entry, date: today, timestamp: Date.now() });
    await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Save error:', e);
  }
}

export async function getMoodEntries() {
  try {
    const data = await AsyncStorage.getItem(MOOD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export async function getTodayEntry() {
  const entries = await getMoodEntries();
  const today = new Date().toDateString();
  return entries.find(e => e.date === today) || null;
}

export function calcAverageMood(entries) {
  if (!entries.length) return null;
  const recent = entries.slice(0, 7);
  return recent.reduce((sum, e) => sum + e.mood, 0) / recent.length;
}
