import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SpiritAvatar from '../components/SpiritAvatar';
import StreakBadge from '../components/StreakBadge';
import { getMoodEntries, getTodayEntry, calcAverageMood } from '../utils/storage';

const MOOD_EMOJIS  = ['', '😴', '😔', '😐', '😊', '🤩'];
const MOOD_LABELS  = ['', 'Exhausted', 'Low', 'Okay', 'Good', 'Amazing'];

function calcStreak(entries) {
  if (!entries.length) return 0;
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const entry of entries) {
    const d = new Date(entry.date);
    d.setHours(0, 0, 0, 0);
    const diff = Math.round((cursor - d) / 86400000);
    if (diff === 0 || diff === streak) {
      streak++;
      cursor = new Date(d);
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export default function HomeScreen({ navigation }) {
  const [entries, setEntries]       = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const all   = await getMoodEntries();
        const today = await getTodayEntry();
        setEntries(all);
        setTodayEntry(today);
      })();
    }, [])
  );

  const avgMood = calcAverageMood(entries);
  const streak  = calcStreak(entries);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Spirit Buddy</Text>
      <Text style={styles.date}>
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </Text>

      <View style={styles.avatarSection}>
        <SpiritAvatar avgMood={avgMood} />
      </View>

      {streak > 0 && (
        <View style={styles.streakRow}>
          <StreakBadge streak={streak} />
        </View>
      )}

      {avgMood !== null && (
        <View style={styles.moodCard}>
          <Text style={styles.moodCardLabel}>7-day mood average</Text>
          <Text style={styles.moodCardValue}>{avgMood.toFixed(1)} / 5.0</Text>
        </View>
      )}

      {!todayEntry ? (
        <TouchableOpacity
          style={styles.checkInBtn}
          onPress={() => navigation.navigate('CheckIn')}
          activeOpacity={0.85}
        >
          <Text style={styles.checkInBtnText}>✨  Check in today</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.doneCard}>
          <Text style={styles.doneEmoji}>{MOOD_EMOJIS[todayEntry.mood]}</Text>
          <Text style={styles.doneText}>
            Today logged · {MOOD_LABELS[todayEntry.mood]}
          </Text>
        </View>
      )}

      {entries.length > 0 && (
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.historyBtnText}>View mood history →</Text>
        </TouchableOpacity>
      )}

      {entries.length === 0 && (
        <Text style={styles.hint}>
          Check in each day to feed your spirit and unlock new forms!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8FF' },
  content:   { padding: 24, alignItems: 'center', paddingBottom: 56 },

  title: { fontSize: 28, fontWeight: '800', color: '#2D1B69', marginBottom: 4 },
  date:  { fontSize: 14, color: '#999', marginBottom: 36 },

  avatarSection: { marginBottom: 28 },
  streakRow:     { marginBottom: 22 },

  moodCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6C3CE1',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  moodCardLabel: { color: '#aaa', fontSize: 13 },
  moodCardValue: {
    color: '#6C3CE1',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },

  checkInBtn: {
    backgroundColor: '#6C3CE1',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 8,
  },
  checkInBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },

  doneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 14,
    marginTop: 8,
  },
  doneEmoji: { fontSize: 30, marginRight: 12 },
  doneText:  { color: '#2E7D32', fontSize: 15, fontWeight: '600' },

  historyBtn: { marginTop: 24 },
  historyBtnText: { color: '#6C3CE1', fontSize: 15, fontWeight: '600' },

  hint: {
    marginTop: 28,
    textAlign: 'center',
    color: '#bbb',
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
