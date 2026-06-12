import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRIES_KEY = '@aura_entries';

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export async function getEntries() {
  try {
    const raw = await AsyncStorage.getItem(ENTRIES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveEntry(entry) {
  try {
    const existing = await getEntries();
    const updated = { ...existing, [entry.date]: entry };
    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save entry:', e);
  }
}

export async function getTodayEntry() {
  const entries = await getEntries();
  return entries[getTodayKey()] || null;
}

export function calculateStreak(entries) {
  const dates = Object.keys(entries).sort().reverse();
  if (dates.length === 0) return 0;

  const today = getTodayKey();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = Math.round((prev - curr) / 86400000);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function calculateLongestStreak(entries) {
  const dates = Object.keys(entries).sort();
  if (dates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = Math.round((curr - prev) / 86400000);
    if (diffDays === 1) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }
  return longest;
}
