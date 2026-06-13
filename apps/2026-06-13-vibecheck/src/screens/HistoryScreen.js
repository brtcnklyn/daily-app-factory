import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MOOD_COLORS = {
  happy: '#FFD93D',
  sad: '#74B9FF',
  anxious: '#FD79A8',
  excited: '#FF7675',
  tired: '#A29BFE',
  calm: '#55EFC4',
};

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  async function loadHistory() {
    try {
      const raw = await AsyncStorage.getItem('vibecheck_history');
      if (raw) setHistory(JSON.parse(raw));
      else setHistory([]);
    } catch (e) {
      console.error('History load error:', e);
    }
  }

  async function clearHistory() {
    Alert.alert('Clear All History', 'This will delete all past vibes. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('vibecheck_history');
          setHistory([]);
        },
      },
    ]);
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📭</Text>
        <Text style={styles.emptyTitle}>No vibes logged yet</Text>
        <Text style={styles.emptyText}>
          Complete your first challenge and it will appear here!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.headerCount}>{history.length} challenges done</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={[
                styles.moodDot,
                { backgroundColor: MOOD_COLORS[item.mood] || '#6C63FF' },
              ]}
            >
              <Text style={styles.moodDotEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.challenge}</Text>
              <Text style={styles.cardMood}>
                {item.mood} · {item.timeSpent}
              </Text>
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0EFFF' },
  list: { padding: 16, paddingBottom: 32 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerCount: { color: '#888', fontSize: 14, fontWeight: '600' },
  clearText: { color: '#FF6B6B', fontSize: 13, fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  moodDot: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  moodDotEmoji: { fontSize: 24 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  cardMood: { fontSize: 13, color: '#888', marginTop: 3, textTransform: 'capitalize' },
  cardDate: { fontSize: 12, color: '#BBB', marginTop: 2 },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F0EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyEmoji: { fontSize: 72 },
  emptyTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A2E', marginTop: 16 },
  emptyText: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
});
