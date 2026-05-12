import AsyncStorage from '@react-native-async-storage/async-storage';

export const MOODS = [
  { key: 'great', emoji: '😊', label: 'Great', color: '#4CAF50' },
  { key: 'good', emoji: '🙂', label: 'Good', color: '#8BC34A' },
  { key: 'okay', emoji: '😐', label: 'Okay', color: '#FFC107' },
  { key: 'low', emoji: '😔', label: 'Low', color: '#FF9800' },
  { key: 'stressed', emoji: '😤', label: 'Stressed', color: '#F44336' },
];

export const getDateKey = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split('T')[0];
};

export const saveCheckIn = async (moodKey, note = '') => {
  const key = getDateKey();
  const data = { mood: moodKey, note, date: key, timestamp: Date.now() };
  await AsyncStorage.setItem(`checkin_${key}`, JSON.stringify(data));
  return data;
};

export const getCheckIn = async (offset = 0) => {
  const key = getDateKey(offset);
  const raw = await AsyncStorage.getItem(`checkin_${key}`);
  return raw ? JSON.parse(raw) : null;
};

export const getLast7Days = async () => {
  const results = [];
  for (let i = 0; i < 7; i++) {
    const date = getDateKey(i);
    const raw = await AsyncStorage.getItem(`checkin_${date}`);
    results.push({ date, data: raw ? JSON.parse(raw) : null });
  }
  return results;
};

export const getStreak = async () => {
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const key = getDateKey(i);
    const raw = await AsyncStorage.getItem(`checkin_${key}`);
    if (raw) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};
