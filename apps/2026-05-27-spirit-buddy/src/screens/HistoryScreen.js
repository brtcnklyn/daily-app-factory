import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMoodEntries, calcAverageMood } from '../utils/storage';

const MOOD_LABELS = ['', 'Exhausted', 'Low', 'Okay', 'Good', 'Amazing'];
const MOOD_EMOJIS = ['', '😴', '😔', '😐', '😊', '🤩'];
const MOOD_COLORS = ['', '#90A4AE', '#7986CB', '#43A047', '#FF9800', '#FF6B9D'];

function MoodDot({ mood }) {
  return (
    <View style={[styles.dot, { backgroundColor: MOOD_COLORS[mood] + '33' }]}>
      <Text style={styles.dotEmoji}>{MOOD_EMOJIS[mood]}</Text>
    </View>
  );
}

function SummaryBar({ entries }) {
  const avg = calcAverageMood(entries);
  if (!avg) return null;

  const counts = [0, 0, 0, 0, 0, 0];
  entries.forEach(e => { if (e.mood >= 1 && e.mood <= 5) counts[e.mood]++; });

  return (
    <View style={styles.summary}>
      <Text style={styles.summaryTitle}>All-time overview</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{entries.length}</Text>
          <Text style={styles.summaryLabel}>Total entries</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{avg.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>Avg mood</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {MOOD_EMOJIS[counts.indexOf(Math.max(...counts.slice(1))) ]}
          </Text>
          <Text style={styles.summaryLabel}>Most common</Text>
        </View>
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getMoodEntries().then(setEntries);
    }, [])
  );

  if (entries.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🌱</Text>
        <Text style={styles.emptyText}>No entries yet</Text>
        <Text style={styles.emptySubtext}>
          Check in daily to start building your mood history
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={entries}
      keyExtractor={(_, i) => String(i)}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Mood History</Text>
          <SummaryBar entries={entries} />
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.entry}>
          <MoodDot mood={item.mood} />
          <View style={styles.entryInfo}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={[styles.entryMood, { color: MOOD_COLORS[item.mood] }]}>
              {MOOD_EMOJIS[item.mood]}  {MOOD_LABELS[item.mood]}
            </Text>
            {item.note ? (
              <Text style={styles.entryNote}>{item.note}</Text>
            ) : null}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8FF' },
  content:   { padding: 24, paddingBottom: 56 },

  title: { fontSize: 26, fontWeight: '800', color: '#2D1B69', marginBottom: 20 },

  summary: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#6C3CE1',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryTitle: { fontSize: 13, color: '#aaa', marginBottom: 12, fontWeight: '600' },
  summaryRow:   { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem:  { alignItems: 'center' },
  summaryValue: { fontSize: 22, fontWeight: '800', color: '#2D1B69' },
  summaryLabel: { fontSize: 11, color: '#aaa', marginTop: 2 },

  entry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  dot:      { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  dotEmoji: { fontSize: 24 },
  entryInfo: { flex: 1 },
  entryDate: { fontSize: 12, color: '#bbb', marginBottom: 3 },
  entryMood: { fontSize: 15, fontWeight: '700' },
  entryNote: { fontSize: 13, color: '#777', marginTop: 5, lineHeight: 18 },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8FF',
    padding: 32,
  },
  emptyEmoji:    { fontSize: 64, marginBottom: 18 },
  emptyText:     { fontSize: 22, fontWeight: '700', color: '#2D1B69' },
  emptySubtext:  { fontSize: 14, color: '#aaa', marginTop: 8, textAlign: 'center', lineHeight: 22 },
});
