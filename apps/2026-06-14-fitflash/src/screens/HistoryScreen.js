import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    try {
      const histRaw = await AsyncStorage.getItem('workout_history');
      if (histRaw) setHistory(JSON.parse(histRaw));
      const streakRaw = await AsyncStorage.getItem('streak');
      if (streakRaw) setStreak(parseInt(streakRaw, 10));
    } catch (_) {}
  }

  const totalExercises = history.reduce((sum, h) => sum + (h.exercises || 0), 0);
  const bestStreak = history.reduce((max, h) => Math.max(max, h.streak || 0), 0);

  function renderItem({ item, index }) {
    const d = new Date(item.date);
    const label = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    return (
      <View style={[styles.item, index === 0 && styles.itemFirst]}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemEmoji}>⚡</Text>
          <View>
            <Text style={styles.itemDate}>{label}</Text>
            <Text style={styles.itemMeta}>{item.exercises} exercises completed</Text>
          </View>
        </View>
        <View style={styles.streakPill}>
          <Text style={styles.streakPillText}>🔥 {item.streak}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Progress</Text>
        <View style={{ width: 64 }} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{streak}</Text>
          <Text style={styles.statLabel}>Current{'\n'}Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{history.length}</Text>
          <Text style={styles.statLabel}>Total{'\n'}Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalExercises}</Text>
          <Text style={styles.statLabel}>Exercises{'\n'}Done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{bestStreak}</Text>
          <Text style={styles.statLabel}>Best{'\n'}Streak</Text>
        </View>
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🏃</Text>
          <Text style={styles.emptyTitle}>No workouts yet.</Text>
          <Text style={styles.emptySub}>Complete today's challenge to start your streak!</Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionLabel}>WORKOUT HISTORY</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.date}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 16,
    marginBottom: 22,
  },
  backBtn: { padding: 8 },
  backText: { color: '#6B7280', fontSize: 15 },
  title: { color: '#F9FAFB', fontSize: 20, fontWeight: '700' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 22, gap: 10, marginBottom: 28 },
  statBox: {
    flex: 1,
    backgroundColor: '#1C1C2E',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D4E',
  },
  statNum: { color: '#FF4500', fontSize: 26, fontWeight: '900' },
  statLabel: { color: '#6B7280', fontSize: 10, marginTop: 4, textAlign: 'center', lineHeight: 14 },
  sectionLabel: { color: '#4B5563', fontSize: 12, letterSpacing: 1.5, paddingHorizontal: 22, marginBottom: 12 },
  list: { paddingHorizontal: 22, paddingBottom: 40 },
  item: {
    backgroundColor: '#1C1C2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2D2D4E',
  },
  itemFirst: { borderColor: '#FF450044' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemEmoji: { fontSize: 28 },
  itemDate: { color: '#F9FAFB', fontSize: 15, fontWeight: '600' },
  itemMeta: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  streakPill: {
    backgroundColor: '#FF450022',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF450055',
  },
  streakPillText: { color: '#FF4500', fontWeight: '700', fontSize: 13 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  emptyEmoji: { fontSize: 72, marginBottom: 20 },
  emptyTitle: { color: '#6B7280', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  emptySub: { color: '#374151', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
